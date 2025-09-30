import { SearchMixin } from "./search";
import { EventEmitter } from "./events/event-emitter";
import { DebounceCallbackRegistry } from "./debounce-callback-registry/debounce-callback-registry";
import { isEqual } from "lodash";
import { RuleBook } from "./rule-book/rule-book";
import { FinderChangeEvent, FinderEventName, FinderFirstUserInteractionEvent, FinderInitEvent, FinderTouchEvent } from "./types/event-types";
import { Tester } from "./tester/tester";
import { FinderRule } from "./types/rule-types";
import { EventCallback, FinderConstructorOptions, MixinInjectedDependencies, SnapshotSerializedMixins } from "./types/core-types";
import { EffectBook } from "./effect-book/effect-book";
import { hasCharacterIndexMatches } from "./search/string-matches/calculate-string-match-segments";
import { EVENT_SOURCE, EVENTS } from "./core-constants";
import { FiltersMixin } from "./filters";
import { SortByMixin } from "./sort-by";
import { GroupByMixin } from "./group-by";
import { PaginationMixin } from "./pagination";
import { FinderCore } from "./finder-core";

class FinderCoreImplementation<FItem, FContext> {
    #items: FItem[] | null | undefined;

    isReady = false;

    isLoading: boolean;

    disabled: boolean;

    updatedAt: number;

    #hasEmittedFirstUserInteraction = false;

    #ignoreSortByRulesWhileSearchRuleIsActive;

    #eventEmitter: EventEmitter<FinderEventName>;

    // Subclasses that extend functionality

    search: SearchMixin<FItem>;
    filters: FiltersMixin;
    sortBy: SortByMixin<FItem>;
    groupBy: GroupByMixin<FItem, FContext>;
    pagination: PaginationMixin<FItem>;

    #matches: Tester<FItem, FContext>;

    context: FContext;

    #ruleBook: RuleBook<FItem, FContext>;
    #effectBook: EffectBook<FItem, FContext>;

    getInstanceFn;

    constructor(
        items: FItem[] | null | undefined,
        {
            rules,
            effects,
            initialSearchTerm,
            initialSortBy,
            initialSortDirection,
            initialGroupBy,
            initialFilters,
            context,
            page,
            numItemsPerPage,
            isLoading,
            disabled,
            requireGroup,
            ignoreSortByRulesWhileSearchRuleIsActive,
            onInit,
            onReady,
            onFirstUserInteraction,
            onChange,
        }: FinderConstructorOptions<FItem, FContext>,
        getInstanceFn: () => FinderCore,
    ) {
        this.#items = items;
        this.disabled = !!disabled;
        this.isLoading = !!isLoading;
        this.#eventEmitter = new EventEmitter();
        this.getInstanceFn = getInstanceFn;

        this.#ruleBook = new RuleBook(rules, items ?? [], context);
        this.#effectBook = new EffectBook(effects ?? [], items ?? [], context);

        // to maintain a single source of truth, the parent class jealously guards it's state and doles it out to the various mixins.
        const mixinDeps: MixinInjectedDependencies<FItem, FContext> = {
            getItems: () => this.items,
            getRuleBook: () => this.#ruleBook,
            isLoading: () => this.isLoading,
            isDisabled: () => this.disabled,
            test: (serializedMixins: SnapshotSerializedMixins, isAdditive?: boolean) => this.test(serializedMixins, isAdditive),
            touch: (event: FinderTouchEvent) => this.#touch(event),
            debouncer: new DebounceCallbackRegistry(),
        };

        // initialize all mixins with their default values.
        this.search = new SearchMixin({ initialSearchTerm }, mixinDeps);
        this.filters = new FiltersMixin({ initialFilters }, mixinDeps);
        this.sortBy = new SortByMixin({ initialSortBy, initialSortDirection }, mixinDeps);
        this.groupBy = new GroupByMixin({ initialGroupBy, requireGroup: !!requireGroup }, mixinDeps);
        this.pagination = new PaginationMixin({ page, numItemsPerPage }, mixinDeps);
        this.updatedAt = Date.now();

        this.#matches = new Tester();

        // type hack: revise this later
        this.context = context as FContext;

        this.#ignoreSortByRulesWhileSearchRuleIsActive = ignoreSortByRulesWhileSearchRuleIsActive;

        // Don't trigger any events while onInit methods trigger
        this.#eventEmitter.silently(() => {
            const initPayload: FinderInitEvent = {
                source: EVENT_SOURCE.CORE,
                event: EVENTS.INIT,
                timestamp: Date.now(),
                instance: this.getInstanceFn(),
            };

            // As the event emitter is freshly-created and cannot have had events tied to it yet, we directly trigger the onInit event.
            if (onInit) {
                onInit(initPayload);
            }
        });

        if (onChange) {
            this.#eventEmitter.on(EVENTS.CHANGE, onChange);
        }

        if (onFirstUserInteraction) {
            this.#eventEmitter.on(EVENTS.FIRST_USER_INTERACTION, onFirstUserInteraction);
        }

        this.isReady = !!isLoading === false && Array.isArray(items) && items.length > 0;
        if (onReady) {
            // As the event emitter is freshly-created and cannot have had events tied to it yet, we directly trigger the onReady event.
            if (this.isReady) {
                onReady({
                    source: EVENT_SOURCE.CORE,
                    event: EVENTS.READY,
                    timestamp: Date.now(),
                    instance: this.getInstanceFn(),
                });
            }
        }

        if (this.isReady === false && onReady) {
            this.#eventEmitter.on(EVENTS.READY, onReady);
        }
    }

    /**
     * Events that reflect a user interaction.
     * e.g: entering a search term or selecting a filter.
     */
    #touch(touchEvent: FinderTouchEvent) {
        // if we're processing effects, don't trigger an endless touch loop.
        if (this.#eventEmitter.isSilent()) {
            return;
        }

        this.emitFirstUserInteraction();

        this.updatedAt = Date.now();
        this.#matches.setIsStale(true);

        // transform the internal touch event to a public change event
        const payload: FinderChangeEvent = {
            ...touchEvent,
            timestamp: Date.now(),
            instance: this.getInstanceFn(),
        };
        this.#eventEmitter.emit(EVENTS.CHANGE, payload);

        // trigger any effects that may be affected by the change to this rule
        if (touchEvent.rule) {
            this.#effectBook.ruleEffects.forEach((effect) => {
                const isEffectTriggered = effect.rules.some((identifier) => {
                    if (typeof identifier === "string" && touchEvent.rule?.id === identifier) {
                        return true;
                    }

                    if (typeof identifier === "object" && touchEvent.rule?.id === identifier.id) {
                        return true;
                    }

                    return false;
                });

                if (isEffectTriggered) {
                    this.#eventEmitter.silently(() => {
                        effect.onChange(this.getInstanceFn());
                    });
                }
            });

            this.#effectBook.searchEffects.forEach((effect) => {
                const isEffectTriggered = hasCharacterIndexMatches(effect.haystack, this.search.searchTerm, effect.exact);
                if (isEffectTriggered) {
                    this.#eventEmitter.silently(() => {
                        effect.onChange(this.getInstanceFn());
                    });
                }
            });
        }
    }

    /** Internal events not triggered by a user action  */
    #systemTouch(touchEvent: FinderTouchEvent) {
        this.#matches.setIsStale(true);
        this.updatedAt = Date.now();

        // transform the internal touch event to a public change event
        const changeEvent: FinderChangeEvent = {
            ...touchEvent,
            timestamp: Date.now(),
            instance: this.getInstanceFn(),
        };
        this.#eventEmitter.emit(touchEvent.event, changeEvent);
    }

    emitFirstUserInteraction() {
        if (this.#hasEmittedFirstUserInteraction === false) {
            this.#hasEmittedFirstUserInteraction = true;

            const payload: FinderFirstUserInteractionEvent = {
                source: EVENT_SOURCE.CORE,
                event: EVENTS.FIRST_USER_INTERACTION,
                timestamp: Date.now(),
                instance: this.getInstanceFn(),
            };
            // emit the public-facing change event
            this.#eventEmitter.emit(EVENTS.FIRST_USER_INTERACTION, payload);
        }
    }

    #emitReady() {
        if (this.isReady === false) {
            this.isReady = true;
            this.#eventEmitter.emit(EVENTS.READY, {
                source: EVENT_SOURCE.CORE,
                event: EVENTS.READY,
                timestamp: Date.now(),
            });
        }
    }

    get items() {
        return Array.isArray(this.#items) ? this.#items : [];
    }

    get matches() {
        if (this.#matches.isStale) {
            this.#matches.takeSnapshot({
                items: this.items,
                context: this.context,
                mixins: this.#serializeMixins(),
            });
            this.#matches.setIsStale(false);
        }
        return this.#matches.snapshot;
    }

    test(mixins: SnapshotSerializedMixins, isAdditive = false) {
        if (isAdditive) {
            const serializedMixins = { ...this.#serializeMixins(), ...mixins };
            return Tester.test({ mixins: serializedMixins, items: this.items, context: this.context });
        }
        return Tester.test({ mixins, items: this.items, context: this.context });
    }

    #serializeMixins() {
        const hasActiveSearch = this.search.hasSearchRule && this.search.hasSearchTerm;
        const ignoreSortByRule = hasActiveSearch && this.#ignoreSortByRulesWhileSearchRuleIsActive;
        const serializedMixins: SnapshotSerializedMixins = {};
        if (hasActiveSearch) {
            serializedMixins.search = this.search.serialize();
        }
        if (this.filters.activeRules.length > 0) {
            serializedMixins.filters = this.filters.serialize();
        }
        if (this.pagination.numItemsPerPage) {
            serializedMixins.pagination = this.pagination.serialize();
        }
        if (ignoreSortByRule === false) {
            serializedMixins.sortBy = this.sortBy.serialize();
        }
        if (this.groupBy.activeRule !== undefined) {
            serializedMixins.groupBy = this.groupBy.serialize();
        }
        return serializedMixins;
    }

    get isEmpty() {
        return this.isLoading === false && this.items.length === 0;
    }

    get hasMatches() {
        const hasItemMatches = Array.isArray(this.matches.items) && this.matches.items.length > 0;
        const hasGroupMatches = Array.isArray(this.matches.groups) && this.matches.groups.length > 0;
        return hasItemMatches || hasGroupMatches;
    }

    get events() {
        return {
            on: (event: FinderEventName, callback: EventCallback) => this.#eventEmitter.on(event, callback),
            off: (event: FinderEventName, callback: EventCallback) => this.#eventEmitter.off(event, callback),
            silently: (callback: EventCallback) => this.#eventEmitter.silently(callback),
            isSilent: () => this.#eventEmitter.isSilent(),
        };
    }

    getRule(identifier: string | FinderRule<FItem>) {
        return this.#ruleBook.getRule(identifier);
    }

    get state() {
        if (this.isLoading) {
            return "loading";
        }
        if (this.isEmpty) {
            return "empty";
        }
        const hasGroupByRule = this.groupBy.activeRule !== undefined;
        if (hasGroupByRule && Array.isArray(this.matches.groups) && this.matches.groups.length > 0) {
            return "groups";
        }

        if (hasGroupByRule === false && Array.isArray(this.matches.items) && this.matches.items.length > 0) {
            return "items";
        }

        return "noMatches";
    }

    setItems(items: FItem[] | null | undefined) {
        if (isEqual(items, this.#items) === false) {
            const previousValue = this.#items;
            this.#items = items;
            this.#ruleBook.hydrateDefinitions(this.items, this.context);
            this.#effectBook.hydrateDefinitions(this.items, this.context);
            this.#systemTouch({ source: EVENT_SOURCE.CORE, event: EVENTS.SET_ITEMS, current: items, initial: previousValue });
        }
    }

    setIsLoading(value?: boolean) {
        if (!!value !== this.isLoading) {
            const previousValue = this.isLoading;
            this.isLoading = !!value;
            this.#systemTouch({ source: EVENT_SOURCE.CORE, event: EVENTS.SET_IS_LOADING, current: !!value, initial: previousValue });
            if (this.isLoading === false) {
                this.#emitReady();
            }
        }
    }

    setIsDisabled(value?: boolean) {
        if (!!value !== this.disabled) {
            const previousValue = this.disabled;
            this.disabled = !!value;
            this.#systemTouch({ source: EVENT_SOURCE.CORE, event: EVENTS.SET_IS_DISABLED, current: !!value, initial: previousValue });
        }
    }

    setRules(definitions: FinderRule<FItem, FContext>[]) {
        if (isEqual(definitions, this.#ruleBook.getDefinitions()) === false) {
            this.#ruleBook.setRules(definitions);
            this.#ruleBook.hydrateDefinitions(this.items, this.context);
        }
    }

    setContext(context: FContext) {
        const previousValue = this.context;
        if (isEqual(context, previousValue) === false) {
            this.context = context;
            this.#ruleBook.hydrateDefinitions(this.items, this.context);
            this.#effectBook.hydrateDefinitions(this.items, this.context);
            this.#systemTouch({ source: EVENT_SOURCE.CORE, event: EVENTS.SET_CONTEXT, current: context, initial: previousValue });
        }
    }
}

export { FinderCoreImplementation };
