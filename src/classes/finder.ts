import { isEqual } from "lodash";
import { FinderCore, FinderInjectedHandlers, FinderOnChangeCallback, FinderPagination, FinderRule, FinderSnapshot, useFinderFactoryOptions } from "../types";
import { only } from "../utils/finder-utils";
import { findResults } from "../utils/matcher";
import { FinderFilters } from "./finder-filters";
import { FinderGroupBy } from "./finder-group-by";
import { FinderMeta } from "./finder-meta";
import { FinderSearch } from "./finder-search";
import { FinderSelectedItems } from "./finder-selected-items";
import { FinderSortBy } from "./finder-sort-by";

interface FinderSyncOptions<FItem> {
    items: FItem[] | null | undefined;
    page?: number;
    isLoading?: boolean;
    numItemsPerPage?: number;
    disabled?: boolean;
    maxSelectedItems?: number;
}

class Finder<FItem> {
    #listeners: CallableFunction[] = [];

    #items: FItem[] | null | undefined;

    #rules: FinderRule<FItem>[];

    #snapshot?: FinderCore<FItem>;

    #page?: number;

    #numItemsPerPage?: number;

    #maxSelectedItems?: number;

    #isLoading: boolean;

    #disabled: boolean;

    #onChange?: FinderOnChangeCallback;

    #onInit?: () => void;

    #isInitialized: boolean = false;

    // If true, the next call to getSnapshot() will force a render.
    #isTouched = false;

    #hooks: {
        search: FinderSearch<FItem>;
        filters: FinderFilters<FItem>;
        sortBy: FinderSortBy<FItem>;
        groupBy: FinderGroupBy<FItem>;
        meta: FinderMeta<FItem>;
        selectedItems: FinderSelectedItems<FItem>;
    };

    constructor(
        items: FItem[] | null | undefined,
        {
            rules,
            initialSearchTerm,
            initialSortby,
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
            onInit,
            onChange = () => {},
        }: useFinderFactoryOptions<FItem>,
    ) {
        this.#rules = rules || [];

        // to maintain a single source of truth, the parent class jealously guards this state
        const handlers: FinderInjectedHandlers<FItem> = {
            isDisabled: () => this.#disabled,
            getRules: () => this.#getRules(),
            onChange: (diff: FinderSnapshot) => this.onChangeEvent(diff),
            onInit: () => this.initializeOnce(),
            getItems: () => {
                if (this.#items) {
                    return this.#items;
                }
                return [];
            },
            getMeta: () => {
                return this.meta.value;
            },
            getMaxSelectedItems: () => this.#maxSelectedItems,
        };

        this.#hooks = {
            search: new FinderSearch(initialSearchTerm, handlers),
            filters: new FinderFilters(initialFilters, handlers),
            sortBy: new FinderSortBy(initialSortby, initialSortDirection, handlers),
            groupBy: new FinderGroupBy(initialGroupBy, !!requireGroup, handlers),
            meta: new FinderMeta(initialMeta, handlers),
            selectedItems: new FinderSelectedItems(initialSelectedItems, handlers),
        };

        this.#items = items;
        this.#page = page;
        this.#numItemsPerPage = numItemsPerPage;
        this.#onChange = onChange;
        this.#disabled = !!disabled;
        this.#maxSelectedItems = maxSelectedItems;
        this.#onInit = onInit;
        this.#isLoading = !!isLoading;
    }

    sync({ items, page, numItemsPerPage, isLoading, disabled, maxSelectedItems }: FinderSyncOptions<FItem>) {
        if (items !== undefined && isEqual(items, this.#items) === false) {
            this.#items = items;
            this.#isTouched = true;
        }
        if (page !== undefined && page !== this.#page) {
            this.#page = page;
            this.#isTouched = true;
        }
        if (numItemsPerPage !== undefined && numItemsPerPage !== this.#numItemsPerPage) {
            this.#numItemsPerPage = numItemsPerPage;
            this.#isTouched = true;
        }
        if (disabled !== undefined && disabled !== this.#disabled) {
            this.#disabled = !!disabled;
            this.#isTouched = true;
        }
        if (isLoading !== undefined && isLoading !== this.isLoading) {
            this.#isLoading = !!isLoading;
            this.#isTouched = true;
        }
        if (maxSelectedItems && maxSelectedItems !== this.#maxSelectedItems) {
            this.#maxSelectedItems = maxSelectedItems;
            this.#isTouched = true;
        }
    }

    #getRules() {
        return this.#rules;
    }

    subscribe(listener: CallableFunction) {
        this.#listeners = [...this.#listeners, listener];
        return () => {
            this.#listeners = this.#listeners.filter((l) => l !== listener);
        };
    }

    initializeOnce() {
        if (this.#isInitialized === false) {
            if (this.#onInit) {
                this.#onInit();
            }
            this.#isInitialized = true;
        }
    }

    setItems(items: FItem[]) {
        this.#items = items;
    }

    #takeSnapshot(): FinderCore<FItem> {
        const hookValues: FinderSnapshot = {
            filters: this.#hooks.filters.value,
            sortBy: this.#hooks.sortBy.value,
            sortDirection: this.#hooks.sortBy.sortDirection,
            groupBy: this.#hooks.groupBy.value,
            searchTerm: this.#hooks.search.value,
            meta: this.#hooks.meta.value,
        };
        const results = findResults(this.#items, this.#rules, hookValues, this.#page, this.#numItemsPerPage);

        let pagination: FinderPagination | undefined;
        if (this.#page && this.#numItemsPerPage && results.numTotalItems && Array.isArray(this.#items)) {
            pagination = {
                page: this.#page,
                lastPage: Math.ceil(results.numTotalItems / this.#numItemsPerPage),
                numItemsPerPage: this.#numItemsPerPage,
                numTotalItems: results.numTotalItems,
                disabled: false,
            };
        }

        return {
            isEmpty: this.isEmpty,
            isLoading: this.isLoading,
            disabled: this.disabled,
            results,
            pagination,
            filters: this.#hooks.filters,
            search: this.#hooks.search,
            groupBy: this.#hooks.groupBy,
            sortBy: this.#hooks.sortBy,
            meta: this.#hooks.meta,
            selectedItems: this.#hooks.selectedItems,
        };
    }

    findMatches() {
        return this.getSnapshot().results;
    }

    get isLoading() {
        return this.#isLoading;
    }

    get isEmpty() {
        return Array.isArray(this.#items) && this.#items.length === 0;
    }

    get disabled() {
        return this.#disabled;
    }

    get search() {
        return this.#hooks.search;
    }

    get filters() {
        return this.#hooks.filters;
    }

    get sortBy() {
        return this.#hooks.sortBy;
    }

    get groupBy() {
        return this.#hooks.groupBy;
    }

    get meta() {
        return this.#hooks.meta;
    }

    get selectedItems() {
        return this.#hooks.selectedItems;
    }

    get page() {
        return this.#page;
    }
    setPage(value: number) {
        this.#page = value;
        this.#isTouched = true;
    }

    get pagination() {
        return this.getSnapshot().pagination;
    }

    getSnapshot() {
        if (this.#isTouched || this.#snapshot === undefined) {
            this.#snapshot = this.#takeSnapshot();
            this.#isTouched = false;
        }
        return this.#snapshot;
    }

    onChangeEvent(diff: FinderSnapshot) {
        this.#isTouched = true;

        if (this.#onChange) {
            const snapshot = this.getSnapshot();

            const readonlySnapshot = {
                results: snapshot.results,
                isEmpty: this.isEmpty,
                isLoading: this.isLoading,
                disabled: this.disabled,
                pagination: snapshot.pagination,
                search: only(this.#hooks.search, ["value", "hasSearchRule"]),
                filters: only(this.#hooks.filters, ["value", "get", "rules"]),
                sortBy: only(this.#hooks.sortBy, ["value", "sortDirection", "rules"]),
                groupBy: only(this.#hooks.groupBy, ["value", "rules", "requireGroup"]),
                selectedItems: only(this.#hooks.selectedItems, ["value", "isSelected", "maxSelectedItems"]),
                meta: only(this.#hooks.meta, ["value"]),
            };
            this.#onChange(diff, readonlySnapshot);
        }

        this.#emitChange();
    }

    #emitChange() {
        for (let listener of this.#listeners) {
            listener();
        }
    }
}

export { Finder };
