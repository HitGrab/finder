import { isEqual, random } from "lodash";
import {
    FinderRule,
    MatchesSnapshot,
    FinderConstructorOptions,
    FinderResultGroup,
    FinderSnapshot,
    FinderChangeEvent,
    FinderTouchEvent,
    FinderChangeEventName,
    FinderInitEvent,
    FinderFirstUserInteractionEvent,
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
import { DebounceCallbackRegistry } from "./utils/debounce-callback-registry";
import { EventCallback } from "./types/internal-types";

class Finder<FItem> {
    #items: FItem[] | null | undefined;

    // static rule definitions
    #rules: FinderRule<FItem>[];

    #snapshot?: MatchesSnapshot<FItem> = undefined;

    isLoading: boolean;

    disabled: boolean;

    updatedAt?: number;

    #hasEmittedFirstUserInteraction = false;

    // If true, the next call to findMatches() will force a render.
    #isTouched = false;

    #eventEmitter: EventEmitter;

    id = Symbol(`uniqe identifier${random(0, 99)}`);

    // Subclasses that extend functionality
    #mixins: {
        search: SearchMixin<FItem>;
        filters: FiltersMixin<FItem>;
        sortBy: SortByMixin<FItem>;
        groupBy: GroupByMixin<FItem>;
        meta: MetaMixin<FItem>;
        selectedItems: SelectedItemsMixin<FItem>;
        pagination: PaginationMixin<FItem>;
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
            plugins,
            onInit,
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
            getMeta: () => this.#mixins.meta.meta,
            isDisabled: () => this.disabled,
            touch: (event: FinderTouchEvent) => this.#touch(event, true),
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
        };

        // The plugin mediator must be initialized after all mixins have been instantiated
        this.plugins = new PluginMediator(
            plugins || [],
            () => this,
            (event: FinderTouchEvent) => this.#touch(event, true),
        );

        const initPayload: FinderInitEvent = {
            source: "core",
            snapshot: this.#takeStateSnapshot(),
            event: "finder.core.init",
            timestamp: Date.now(),
        };

        // Don't trigger any events while any plugin methods trigger
        this.#eventEmitter.silently(() => {
            this.plugins.onInit(initPayload);
        });

        if (onInit) {
            this.#eventEmitter.on("init", onInit);
        }
        if (onChange) {
            this.#eventEmitter.on("change", onChange);
        }

        if (onFirstUserInteraction) {
            this.#eventEmitter.on("first_user_interaction", onFirstUserInteraction);
        }

        // notify external listeners
        this.#eventEmitter.emit("init", initPayload);
    }

    #touch(touchEvent: FinderTouchEvent, canTriggerUserInteractEvent: boolean) {
        // some events, like 'loading' or 'disabled', do not count as user interactions.
        if (canTriggerUserInteractEvent) {
            this.emitFirstUserInteraction();
        }

        this.#isTouched = true;
        this.#snapshot = undefined;
        this.updatedAt = Date.now();

        const stateSnapshot = this.#takeStateSnapshot();

        const changeEvent: FinderChangeEvent = { ...touchEvent, snapshot: stateSnapshot, timestamp: Date.now() };

        // emit the change event for the specific mixin action
        // e.g: 'change.filters.set'
        this.#eventEmitter.emit(`change.${touchEvent.event}`, changeEvent);

        // emit the change event for the whole mixin
        // e.g: 'change.filters'
        this.#eventEmitter.emit(`change.${touchEvent.source}`, changeEvent);

        // emit the broadest change event
        // e.g: 'change'
        this.#eventEmitter.emit("change", changeEvent);
    }

    emitFirstUserInteraction() {
        if (this.#hasEmittedFirstUserInteraction === false) {
            this.#hasEmittedFirstUserInteraction = true;

            const payload: FinderFirstUserInteractionEvent = {
                source: "core",
                event: "finder.core.first-user-interaction",
                snapshot: this.#takeStateSnapshot(),
                timestamp: Date.now(),
            };

            // trigger all plugins
            this.plugins.onFirstUserInteraction(payload);

            // emit the public-facing change event
            this.#eventEmitter.emit("first_user_interaction", payload);
        }
    }

    #takeMatchesSnapshot() {
        let itemsToProcess: FItem[] = [];
        let groups: FinderResultGroup<FItem>[] = [];

        const hasGroupByRule = this.#mixins.groupBy.activeRule !== undefined;
        let paginatedItemSlice: FItem[] = [];
        if (Array.isArray(this.#items)) {
            const meta = this.#mixins.meta.meta;

            itemsToProcess = [...this.#items];
            itemsToProcess = this.#mixins.search.process(itemsToProcess, meta);
            itemsToProcess = this.#mixins.filters.process(itemsToProcess, meta);
            itemsToProcess = this.#mixins.sortBy.process(itemsToProcess);

            paginatedItemSlice = this.#mixins.pagination.process(itemsToProcess);

            if (hasGroupByRule) {
                groups = this.#mixins.groupBy.process(paginatedItemSlice);
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

    get events() {
        return {
            on: (event: FinderChangeEventName, callback: EventCallback) => this.#eventEmitter.on(event, callback),
            off: (event: FinderChangeEventName, callback: EventCallback) => this.#eventEmitter.off(event, callback),
        };
    }

    setItems(items: FItem[] | null | undefined) {
        if (isEqual(items, this.#items) === false) {
            this.#items = items;
            this.#isTouched = true;
        }
    }

    setIsLoading(value?: boolean) {
        if (!!value !== this.isLoading) {
            const previousValue = this.isLoading;
            this.isLoading = !!value;
            this.#isTouched = true;
            this.#touch({ source: "finder", event: "change.core.setIsLoading", current: !!value, initial: previousValue }, false);
        }
    }
    setIsDisabled(value?: boolean) {
        if (!!value !== this.disabled) {
            const previousValue = this.disabled;
            this.disabled = !!value;
            this.#isTouched = true;
            this.#touch({ source: "finder", event: "change.core.setIsDisabled", current: !!value, initial: previousValue }, false);
        }
    }
}

export { Finder };
