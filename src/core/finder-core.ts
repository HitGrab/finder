import { FiltersMixin } from "./filters/filters";
import { filtersInterface, readonlyFiltersInterface } from "./filters/filters-interface";
import { GroupByMixin } from "./group-by/group-by";
import { groupByInterface, readonlyGroupByInterface } from "./group-by/group-by-interface";
import { PaginationMixin } from "./pagination/pagination";
import { paginationInterface } from "./pagination/pagination-interface";
import { SearchMixin } from "./search/search";
import { readonlySearchInterface, searchInterface } from "./search/search-interface";
import { SortByMixin } from "./sort-by/sort-by";
import { readonlySortByInterface, sortByInterface } from "./sort-by/sort-by-interface";
import { EventEmitter } from "./events/event-emitter";
import { DebounceCallbackRegistry } from "./debounce-callback-registry/debounce-callback-registry";
import { isEqual } from "lodash";
import { RuleBook } from "./rule-book/rule-book";
import { FinderChangeEvent, FinderEventName, FinderInitEvent, FinderTouchEvent } from "./types/event-types";
import { Tester } from "./tester/tester";
import { hasCharacterIndexMatches } from "./search/result-segments/search-result-segments";
import { FinderRule } from "./types/rule-types";
import { EventCallback, FinderConstructorOptions, FinderSnapshot, MixinInjectedDependencies, SnapshotSerializedMixins } from "./types/core-types";
import { EffectBook } from "./effect-book/effect-book";

class FinderCore<FItem, FContext = any> {
    #items: FItem[] | null | undefined;

    isReady: boolean = false;

    isLoading: boolean;

    disabled: boolean;

    updatedAt?: number;

    #hasEmittedFirstUserInteraction = false;

    #ignoreSortByRulesWhileSearchRuleIsActive;

    #eventEmitter: EventEmitter<FinderEventName>;

    // Subclasses that extend functionality
    #mixins: {
        search: SearchMixin<FItem>;
        filters: FiltersMixin;
        sortBy: SortByMixin<FItem>;
        groupBy: GroupByMixin<FItem, FContext>;
        pagination: PaginationMixin<FItem>;
    };

    #matches: Tester<FItem, FContext>;

    context: FContext;

    #ruleBook: RuleBook<FItem, FContext>;
    #effectBook: EffectBook<FItem, FContext>;

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
    ) {
        this.#items = items;
        this.disabled = !!disabled;
        this.isLoading = !!isLoading;
        this.#eventEmitter = new EventEmitter();

        this.#ruleBook = new RuleBook(rules ?? [], items ?? [], context);
        this.#effectBook = new EffectBook(effects ?? [], items ?? [], context);

        // to maintain a single source of truth, the parent class jealously guards it's state and doles it out to the various mixins.
        const mixinDeps: MixinInjectedDependencies<FItem, FContext> = {
            getItems: () => this.items,
            getRuleBook: () => this.#ruleBook,
            getContext: () => this.context,
            isLoading: () => this.isLoading,
            isDisabled: () => this.disabled,
            test: (serializedMixins: SnapshotSerializedMixins, isAdditive?: boolean) => this.test(serializedMixins, isAdditive),
            touch: (event: FinderTouchEvent) => this.#touch(event),
            debouncer: new DebounceCallbackRegistry(),
        };

        // initialize all mixins with their default values.
        this.#mixins = {
            search: new SearchMixin({ initialSearchTerm }, mixinDeps),
            filters: new FiltersMixin({ initialFilters }, mixinDeps),
            sortBy: new SortByMixin({ initialSortBy, initialSortDirection }, mixinDeps),
            groupBy: new GroupByMixin({ initialGroupBy, requireGroup: !!requireGroup }, mixinDeps),
            pagination: new PaginationMixin({ page, numItemsPerPage }, mixinDeps),
        };

        this.#matches = new Tester();

        // hack: revise this later
        this.context = context as FContext;

        this.#ignoreSortByRulesWhileSearchRuleIsActive = ignoreSortByRulesWhileSearchRuleIsActive;

        // Don't trigger any events while onInit methods trigger
        this.#eventEmitter.silently(() => {
            const initPayload: FinderInitEvent = {
                source: "core",
                event: "init",
                snapshot: this.#takeStateSnapshot(),
                timestamp: Date.now(),
            };

            // As the event emitter is freshly-created and cannot have had events tied to it yet, we directly trigger the onInit event.
            if (onInit) {
                onInit(initPayload);
            }
        });

        if (onChange) {
            this.#eventEmitter.on("change", onChange);
        }

        if (onFirstUserInteraction) {
            this.#eventEmitter.on("firstUserInteraction", onFirstUserInteraction);
        }

        this.isReady = !!isLoading === false && Array.isArray(items) && items.length > 0;
        if (onReady) {
            // As the event emitter is freshly-created and cannot have had events tied to it yet, we directly trigger the onReady event.
            if (this.isReady) {
                onReady({
                    source: "core",
                    event: "ready",
                    snapshot: this.#takeStateSnapshot(),
                    timestamp: Date.now(),
                });
            }
        }

        if (this.isReady === false && onReady) {
            this.#eventEmitter.on("ready", onReady);
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
        this.#eventEmitter.emit("change", { ...touchEvent, snapshot: this.#takeStateSnapshot(), timestamp: Date.now() });

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
                        effect.onChange(this);
                    });
                }
            });

            this.#effectBook.searchEffects.forEach((effect) => {
                const isEffectTriggered = hasCharacterIndexMatches(effect.haystack, this.search.searchTerm, effect.exact);
                if (isEffectTriggered) {
                    this.#eventEmitter.silently(() => {
                        effect.onChange(this);
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
        const changeEvent: FinderChangeEvent = { ...touchEvent, snapshot: this.#takeStateSnapshot(), timestamp: Date.now() };
        this.#eventEmitter.emit(touchEvent.event, changeEvent);
    }

    emitFirstUserInteraction() {
        if (this.#hasEmittedFirstUserInteraction === false) {
            this.#hasEmittedFirstUserInteraction = true;

            // emit the public-facing change event
            this.#eventEmitter.emit("firstUserInteraction", {
                source: "core",
                event: "firstUserInteraction",
                snapshot: this.#takeStateSnapshot(),
                timestamp: Date.now(),
            });
        }
    }

    #emitReady() {
        if (this.isReady === false) {
            this.isReady = true;
            this.#eventEmitter.emit("ready", {
                source: "core",
                event: "ready",
                snapshot: this.#takeStateSnapshot(),
                timestamp: Date.now(),
            });
        }
    }

    /**
     * Return the current state values for each mixin. Only used for onChange events.
     */
    #takeStateSnapshot(): FinderSnapshot<FItem> {
        return {
            search: readonlySearchInterface(this.#mixins.search),
            filters: readonlyFiltersInterface(this.#mixins.filters),
            sortBy: readonlySortByInterface(this.#mixins.sortBy),
            groupBy: readonlyGroupByInterface(this.#mixins.groupBy),
            context: { ...this.context },
            updatedAt: this.updatedAt,
        };
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
        const hasActiveSearch = this.#mixins.search.hasSearchRule && this.#mixins.search.hasSearchTerm;
        const ignoreSortByRule = hasActiveSearch && this.#ignoreSortByRulesWhileSearchRuleIsActive;
        const serializedMixins: SnapshotSerializedMixins = {};
        if (hasActiveSearch) {
            serializedMixins.search = this.#mixins.search.serialize();
        }
        if (this.#mixins.filters.activeRules.length > 0) {
            serializedMixins.filters = this.#mixins.filters.serialize();
        }
        if (this.#mixins.pagination.numItemsPerPage) {
            serializedMixins.pagination = this.#mixins.pagination.serialize();
        }
        if (ignoreSortByRule === false) {
            serializedMixins.sortBy = this.#mixins.sortBy.serialize();
        }
        if (this.#mixins.groupBy.activeRule !== undefined) {
            serializedMixins.groupBy = this.#mixins.groupBy.serialize();
        }
        return serializedMixins;
    }

    get isEmpty() {
        return this.isLoading === false && this.items.length === 0;
    }

    get search() {
        return searchInterface(this.#mixins.search);
    }

    get filters() {
        return filtersInterface(this.#mixins.filters);
    }

    get sortBy() {
        return sortByInterface(this.#mixins.sortBy);
    }

    get groupBy() {
        return groupByInterface(this.#mixins.groupBy);
    }

    get pagination() {
        return paginationInterface(this.#mixins.pagination);
    }

    get events() {
        return {
            on: (event: FinderEventName, callback: EventCallback) => this.#eventEmitter.on(event, callback),
            off: (event: FinderEventName, callback: EventCallback) => this.#eventEmitter.off(event, callback),
            silently: (callback: EventCallback) => this.#eventEmitter.silently(callback),
            isSilent: () => this.#eventEmitter.isSilent(),
        };
    }

    getRule<Rule>(identifier: string | FinderRule<FItem>): Rule {
        const rule = this.#ruleBook.getRule<Rule>(identifier);
        if (rule === undefined) {
            throw new Error("Finder could not locate rule");
        }
        return rule;
    }

    get state() {
        if (this.isLoading) {
            return "loading";
        }
        if (this.items && this.items.length === 0) {
            return "empty";
        }
        const hasGroupByRule = this.#mixins.groupBy.activeRule !== undefined;
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
            this.#systemTouch({ source: "core", event: "change.core.setItems", current: items, initial: previousValue });
        }
    }

    setIsLoading(value?: boolean) {
        if (!!value !== this.isLoading) {
            const previousValue = !!this.isLoading;
            this.isLoading = !!value;
            this.#systemTouch({ source: "core", event: "change.core.setIsLoading", current: !!value, initial: previousValue });
            if (this.isLoading === false) {
                this.#emitReady();
            }
        }
    }

    setIsDisabled(value?: boolean) {
        if (!!value !== this.disabled) {
            const previousValue = this.disabled;
            this.disabled = !!value;
            this.#systemTouch({ source: "core", event: "change.core.setIsDisabled", current: !!value, initial: previousValue });
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
            this.#systemTouch({ source: "core", event: "change.core.syncContext", current: context, initial: previousValue });
        }
    }
}

export { FinderCore };
