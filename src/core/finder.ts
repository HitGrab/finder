import {
    FinderRule,
    MatchesSnapshot,
    FinderConstructorOptions,
    FinderResultGroup,
    FinderSnapshot,
    FinderChangeEvent,
    FinderTouchEvent,
    FinderEventName,
    FinderInitEvent,
    FinderFirstUserInteractionEvent,
    FinderReadyEvent,
} from "../types";
import { isValidRuleset } from "./utils/rule-utils";
import { FiltersMixin } from "./filters/filters";
import { filtersInterface, readonlyFiltersInterface } from "./filters/filters-interface";
import { GroupByMixin } from "./group-by/group-by";
import { groupByInterface, readonlyGroupByInterface } from "./group-by/group-by-interface";
import { MetaMixin } from "./meta/meta";
import { metaInterface, readonlyMetaInterface } from "./meta/meta-interface";
import { PaginationMixin } from "./pagination/pagination";
import { paginationInterface } from "./pagination/pagination-interface";
import { PluginMediator } from "./plugins/plugin-mediator";
import { SearchMixin } from "./search/search";
import { readonlySearchInterface, searchInterface } from "./search/search-interface";
import { SelectedItemsMixin } from "./selected-items/selected-items";
import { readonlySelectedItemsInterface, selectedItemsInterface } from "./selected-items/selected-items-interface";
import { SortByMixin } from "./sort-by/sort-by";
import { readonlySortByInterface, sortByInterface } from "./sort-by/sort-by-interface";
import { EventEmitter } from "./events/event-emitter";
import { EventCallback } from "./types/internal-types";
import { DebounceCallbackRegistry } from "./debounce-callback-registry/debounce-callback-registry";
import { isEqual } from "lodash";
import { LayoutMixin } from "./layout/layout";
import { layoutInterface, readonlyLayoutInterface } from "./layout/layout-interface";

class Finder<FItem> {
    #items: FItem[] | null | undefined;

    // static rule definitions
    #rules: FinderRule<FItem>[];

    #snapshot?: MatchesSnapshot<FItem> = undefined;

    isReady: boolean = false;

    isLoading: boolean;

    disabled: boolean;

    updatedAt?: number;

    #hasEmittedFirstUserInteraction = false;

    // If true, the next call to findMatches() will force a render.
    #isTouched = false;

    #eventEmitter: EventEmitter<FinderEventName>;

    // Subclasses that extend functionality
    #mixins: {
        search: SearchMixin<FItem>;
        filters: FiltersMixin;
        sortBy: SortByMixin<FItem>;
        groupBy: GroupByMixin<FItem>;
        meta: MetaMixin<FItem>;
        selectedItems: SelectedItemsMixin<FItem>;
        pagination: PaginationMixin<FItem>;
        layout: LayoutMixin;
    };

    plugins: PluginMediator<FItem>;

    constructor(
        items: FItem[] | null | undefined,
        {
            rules,
            initialSearchTerm,
            initialSortBy,
            initialSortDirection,
            initialGroupBy,
            initialFilters,
            initialSelectedItems,
            initialMeta,
            page,
            numItemsPerPage,
            isLoading,
            disabled,
            requireGroup,
            maxSelectedItems,
            layoutVariants,
            initialLayout,
            plugins,
            onInit,
            onReady,
            onFirstUserInteraction,
            onChange,
        }: FinderConstructorOptions<FItem>,
    ) {
        this.#rules = isValidRuleset(rules) ? rules : [];
        this.#items = items;
        this.disabled = !!disabled;
        this.isLoading = !!isLoading;
        this.#eventEmitter = new EventEmitter();

        // to maintain a single source of truth, the parent class jealously guards it's state and doles it out to the various mixins.
        const mixinDeps = {
            getItems: () => this.items,
            getRules: () => this.#rules,
            getMeta: () => metaInterface(this.#mixins.meta),
            isLoading: () => this.isLoading,
            isDisabled: () => this.disabled,
            touch: (event: FinderTouchEvent) => this.#touch(event),
            debouncer: new DebounceCallbackRegistry(),
        };

        // initialize all mixins with their default values.
        this.#mixins = {
            search: new SearchMixin({ initialSearchTerm }, mixinDeps),
            filters: new FiltersMixin({ initialFilters }, mixinDeps),
            sortBy: new SortByMixin({ initialSortBy, initialSortDirection }, mixinDeps),
            groupBy: new GroupByMixin({ initialGroupBy, requireGroup: !!requireGroup }, mixinDeps),
            meta: new MetaMixin({ initialMeta }, mixinDeps),
            selectedItems: new SelectedItemsMixin({ initialSelectedItems, maxSelectedItems }, mixinDeps),
            pagination: new PaginationMixin({ page, numItemsPerPage }, mixinDeps),
            layout: new LayoutMixin({ layoutVariants, initialLayout }, mixinDeps),
        };

        // The plugin mediator must be initialized after all mixins have been instantiated
        this.plugins = new PluginMediator(
            plugins || [],
            () => this,
            (event: FinderTouchEvent) => this.#touch(event),
        );

        // Don't trigger any events while onInit methods trigger
        this.#eventEmitter.silently(() => {
            const initPayload: FinderInitEvent = {
                source: "core",
                event: "init",
                snapshot: this.#takeStateSnapshot(),
                timestamp: Date.now(),
            };

            // init all plugins
            this.plugins.onInit(initPayload);

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
                const readyPayload: FinderReadyEvent = {
                    source: "core",
                    event: "ready",
                    snapshot: this.#takeStateSnapshot(),
                    timestamp: Date.now(),
                };
                onReady(readyPayload);
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
        this.emitFirstUserInteraction();

        this.#isTouched = true;
        this.#snapshot = undefined;
        this.updatedAt = Date.now();

        // if a meta value changed, updated any option generators
        if (touchEvent.source === "meta") {
            this.#mixins.filters.clearHydratedRules();
        }

        // transform the internal touch event to a public change event
        const changeEvent: FinderChangeEvent = { ...touchEvent, snapshot: this.#takeStateSnapshot(), timestamp: Date.now() };

        // emit the change event for the specific mixin action
        // e.g: 'change.filters.set'
        this.#eventEmitter.emit(touchEvent.event, changeEvent);

        // emit the change event for the whole mixin
        // e.g: 'change.filters'
        this.#eventEmitter.emit(`change.${touchEvent.source}`, changeEvent);

        // emit the broadest change event
        // e.g: 'change'
        this.#eventEmitter.emit("change", changeEvent);
    }

    /** Internal events not triggered by a user action  */
    #systemTouch(touchEvent: FinderTouchEvent) {
        this.#isTouched = true;
        this.#snapshot = undefined;
        this.updatedAt = Date.now();

        // transform the internal touch event to a public change event
        const changeEvent: FinderChangeEvent = { ...touchEvent, snapshot: this.#takeStateSnapshot(), timestamp: Date.now() };
        this.#eventEmitter.emit(touchEvent.event, changeEvent);
    }

    emitFirstUserInteraction() {
        if (this.#hasEmittedFirstUserInteraction === false) {
            this.#hasEmittedFirstUserInteraction = true;

            const payload: FinderFirstUserInteractionEvent = {
                source: "core",
                event: "firstUserInteraction",
                snapshot: this.#takeStateSnapshot(),
                timestamp: Date.now(),
            };

            // emit the public-facing change event
            this.#eventEmitter.emit("firstUserInteraction", payload);
        }
    }

    #emitReady() {
        if (this.isReady === false) {
            this.isReady = true;
            const readyPayload: FinderReadyEvent = {
                source: "core",
                event: "ready",
                snapshot: this.#takeStateSnapshot(),
                timestamp: Date.now(),
            };
            this.#eventEmitter.emit("ready", readyPayload);
        }
    }

    #takeMatchesSnapshot() {
        let itemsToProcess: FItem[] = [];
        let groups: FinderResultGroup<FItem>[] = [];

        const hasGroupByRule = this.#mixins.groupBy.activeRule !== undefined;
        let paginatedItemSlice: FItem[] = [];
        if (Array.isArray(this.#items)) {
            const meta = metaInterface(this.#mixins.meta);

            itemsToProcess = [...this.#items];
            itemsToProcess = this.#mixins.search.process(itemsToProcess, meta);
            itemsToProcess = this.#mixins.filters.process(itemsToProcess, meta);
            itemsToProcess = this.#mixins.sortBy.process(itemsToProcess);

            paginatedItemSlice = this.#mixins.pagination.process(itemsToProcess);

            if (hasGroupByRule) {
                groups = this.#mixins.groupBy.process(paginatedItemSlice, meta);
            }
        }

        return {
            items: !hasGroupByRule ? paginatedItemSlice : undefined,
            groups: hasGroupByRule ? groups : undefined,
            numMatchedItems: itemsToProcess.length,
            numTotalItems: this.items.length,
            hasGroupByRule,
        };
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
            selectedItems: readonlySelectedItemsInterface(this.#mixins.selectedItems),
            layout: readonlyLayoutInterface(this.#mixins.layout),
            meta: readonlyMetaInterface(this.#mixins.meta),
            updatedAt: this.updatedAt,
        };
    }

    get items() {
        return Array.isArray(this.#items) ? this.#items : [];
    }

    get matches() {
        if (this.#snapshot === undefined || this.#isTouched) {
            this.#snapshot = this.#takeMatchesSnapshot();
            this.#isTouched = false;
        }
        return this.#snapshot;
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

    get meta() {
        return metaInterface(this.#mixins.meta);
    }

    get pagination() {
        return paginationInterface(this.#mixins.pagination);
    }

    get selectedItems() {
        return selectedItemsInterface(this.#mixins.selectedItems);
    }

    get layout() {
        return layoutInterface(this.#mixins.layout);
    }

    get events() {
        return {
            on: (event: FinderEventName, callback: EventCallback) => this.#eventEmitter.on(event, callback),
            off: (event: FinderEventName, callback: EventCallback) => this.#eventEmitter.off(event, callback),
        };
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

            // filter option generators will need to be recalculated
            this.#mixins.filters.clearHydratedRules();

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
}

export { Finder };
