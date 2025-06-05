import { isEqual } from "lodash";
import { FinderRule, MatchesSnapshot, FinderConstructorOptions, FinderResultGroup, FinderSnapshot, FinderOnChangeCallback, FinderDiff } from "../types";
import { isValidRuleset } from "./utils/rule-utils";
import { FINDER_EVENTS } from "./events/event-constants";
import { FiltersMixin } from "./filters/filters";
import { filtersInterface } from "./filters/filters-interface";
import { GroupByMixin } from "./group-by/group-by";
import { groupByInterface } from "./group-by/group-by-interface";
import { MetaMixin } from "./meta/meta";
import { metaInterface } from "./meta/meta-interface";
import { PaginationMixin } from "./pagination/pagination";
import { paginationInterface } from "./pagination/pagination-interface";
import { PluginMediator } from "./plugins/plugin-mediator";
import { SearchMixin } from "./search/search";
import { searchInterface } from "./search/search-interface";
import { SelectedItemsMixin } from "./selected-items/selected-items";
import { selectedItemsInterface } from "./selected-items/selected-items-interface";
import { SortByMixin } from "./sort-by/sort-by";
import { sortByInterface } from "./sort-by/sort-by-interface";
import { EventEmitter } from "./events/event-emitter";
import { FinderEventNames, EventPayloads, FinderEventEmitter, EventCallback } from "./types/core-types";

import { DebounceCallbackRegistry } from "./utils/debounce-callback-registry";

class Finder<FItem> {
    #items: FItem[] | null | undefined;

    // static rule definitions
    #rules: FinderRule<FItem>[];

    #snapshot?: MatchesSnapshot<FItem> = undefined;

    isLoading: boolean;

    disabled: boolean;

    updatedAt?: number;

    #onInit?: () => void;

    #onChange?: FinderOnChangeCallback;

    #isInitialized: boolean = false;

    // If true, the next call to findMatches() will force a render.
    #isTouched = false;

    #eventEmitter: FinderEventEmitter<FItem>;

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
            onChange,
        }: FinderConstructorOptions<FItem>,
    ) {
        this.#rules = isValidRuleset(rules) ? rules : [];
        this.#items = items;
        this.disabled = !!disabled;
        this.isLoading = !!isLoading;
        this.#onInit = onInit;
        this.#onChange = onChange;
        this.#eventEmitter = new EventEmitter<FinderEventNames, EventPayloads<FItem>>();

        // to maintain a single source of truth, the parent class jealously guards it's state and doles it out to the various mixins.
        const mixinDeps = {
            getItems: () => this.items,
            getRules: () => this.#rules,
            getMeta: () => this.#mixins.meta.meta,
            isDisabled: () => this.disabled,
            touch: (diff: FinderDiff) => this.#touch(diff),
            eventEmitter: this.#eventEmitter,
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

        // must be initialized after all mixins have been instantiated
        this.plugins = new PluginMediator(
            plugins || [],
            () => this,
            (diff: FinderDiff) => this.#touch(diff),
        );
    }

    #touch(diff: FinderDiff) {
        this.initializeOnce();

        this.#isTouched = true;
        this.#snapshot = undefined;
        this.updatedAt = Date.now();

        const stateSnapshot = this.#takeStateSnapshot();

        // emit the public-facing change event
        this.#eventEmitter.emit(FINDER_EVENTS.CHANGE, { diff, snapshot: stateSnapshot });

        if (this.#onChange) {
            this.#onChange(diff, stateSnapshot);
        }
    }

    initializeOnce() {
        if (this.#isInitialized === false) {
            this.#isInitialized = true;

            this.#eventEmitter.emit(FINDER_EVENTS.INIT);

            if (this.#onInit) {
                this.#onInit();
            }
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
            searchTerm: this.#mixins.search.searchTerm,
            filters: this.#mixins.filters.getFilters(),
            sortBy: this.#mixins.sortBy.activeRule,
            groupBy: this.#mixins.groupBy.activeRule,
            selectedItems: this.#mixins.selectedItems.selectedItems,
            meta: this.#mixins.meta.meta,
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
        return this.items.length === 0;
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
            on: (event: FinderEventNames, callback: EventCallback) => this.#eventEmitter.on(event, callback),
            off: (event: FinderEventNames, callback: EventCallback) => this.#eventEmitter.off(event, callback),
            batch: (callback: CallableFunction) => this.#eventEmitter.batch(callback),
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
            this.isLoading = !!value;
            this.#isTouched = true;
        }
    }
    setDisabled(value?: boolean) {
        if (!!value !== this.disabled) {
            this.disabled = !!value;
            this.#isTouched = true;
        }
    }
}

export { Finder };
