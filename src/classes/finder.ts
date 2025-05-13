import { isEqual } from "lodash";
import {
    FinderConstructorOptions,
    FinderCore,
    FinderInjectedHandlers,
    FinderOnChangeCallback,
    FinderPagination,
    FinderRule,
    FinderSnapshot,
    MatchesSnapshot,
} from "../types";
import { only } from "../utils/finder-utils";
import { findMatches } from "../utils/matcher";
import { FinderFilters } from "./finder-filters";
import { FinderGroupBy } from "./finder-group-by";
import { FinderMeta } from "./finder-meta";
import { FinderSearch } from "./finder-search";
import { FinderSelectedItems } from "./finder-selected-items";
import { FinderSortBy } from "./finder-sort-by";

class Finder<FItem> {
    #items: FItem[] | null | undefined;

    #rules: FinderRule<FItem>[];

    #snapshot?: MatchesSnapshot<FItem> = undefined;

    #page?: number;

    #numItemsPerPage?: number;

    #maxSelectedItems?: number;

    #isLoading: boolean;

    #disabled: boolean;

    #onChange?: FinderOnChangeCallback;

    #onInit?: () => void;

    #isInitialized: boolean = false;

    // If true, the next call to findMatches() will force a render.
    #isTouched = false;

    // Subclasses that extend functionality
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
        }: FinderConstructorOptions<FItem>,
    ) {
        this.#rules = rules || [];

        // to maintain a single source of truth, the parent class jealously guards this state and dole it out to the hooks.
        const handlers: FinderInjectedHandlers<FItem> = {
            isDisabled: () => this.#disabled,
            getRules: () => this.#rules,
            onChange: (diff: FinderSnapshot) => this.onChangeEvent(diff),
            onInit: () => this.initializeOnce(),
            getItems: () => {
                return Array.isArray(this.#items) ? this.#items : [];
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
        this.#disabled = !!disabled;
        this.#isLoading = !!isLoading;
        this.#maxSelectedItems = maxSelectedItems;
        this.#onInit = onInit;
        this.#onChange = onChange;
    }

    initializeOnce() {
        if (this.#isInitialized === false) {
            if (this.#onInit) {
                this.#onInit();
            }
            this.#isInitialized = true;
        }
    }

    findMatches() {
        if (this.#snapshot === undefined || this.#isTouched) {
            this.#snapshot = this.takeSnapshot();
            this.#isTouched = false;
        }
        return this.#snapshot;
    }

    takeSnapshot() {
        const hookValues: FinderSnapshot = {
            filters: this.#hooks.filters.value,
            sortBy: this.#hooks.sortBy.value,
            sortDirection: this.#hooks.sortBy.sortDirection,
            groupBy: this.#hooks.groupBy.value,
            searchTerm: this.#hooks.search.value,
            meta: this.#hooks.meta.value,
        };
        const matches = findMatches(this.#items, this.#rules, hookValues, this.#page, this.#numItemsPerPage);

        let pagination: FinderPagination | undefined;
        if (this.#page && this.#numItemsPerPage && matches.numTotalItems && Array.isArray(this.#items)) {
            pagination = {
                page: this.#page,
                lastPage: Math.ceil(matches.numTotalItems / this.#numItemsPerPage),
                numItemsPerPage: this.#numItemsPerPage,
                numTotalItems: matches.numTotalItems,
                disabled: false,
            };
        }
        return {
            ...matches,
            pagination,
        };
    }

    onChangeEvent(diff: FinderSnapshot) {
        this.#isTouched = true;

        if (this.#onChange) {
            this.#onChange(diff, this.toReadOnlyObject());
        }
    }

    toObject(): FinderCore<FItem> {
        const { pagination, ...results } = this.findMatches();

        return {
            results: { ...results },
            pagination,
            isEmpty: this.isEmpty,
            isLoading: this.isLoading,
            disabled: this.disabled,
            filters: this.#hooks.filters,
            search: this.#hooks.search,
            groupBy: this.#hooks.groupBy,
            sortBy: this.#hooks.sortBy,
            meta: this.#hooks.meta,
            selectedItems: this.#hooks.selectedItems,
        };
    }

    toReadOnlyObject(): FinderCore<FItem> {
        const { pagination, ...results } = this.findMatches();

        return {
            results: { ...results },
            pagination,
            isEmpty: this.isEmpty,
            isLoading: this.isLoading,
            disabled: this.disabled,
            search: only(this.#hooks.search, ["value", "hasSearchRule"]),
            filters: only(this.#hooks.filters, ["value", "get", "rules"]),
            sortBy: only(this.#hooks.sortBy, ["value", "sortDirection", "rules"]),
            groupBy: only(this.#hooks.groupBy, ["value", "rules", "requireGroup"]),
            selectedItems: only(this.#hooks.selectedItems, ["value", "isSelected", "maxSelectedItems"]),
            meta: only(this.#hooks.meta, ["value"]),
        };
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

    setPage(value?: number) {
        if (value !== this.#page) {
            this.#page = value;
            this.#isTouched = true;
        }
    }

    setItems(items: FItem[] | null | undefined) {
        if (isEqual(items, this.#items) === false) {
            this.#items = items;
            this.#isTouched = true;
        }
    }

    setNumItemsPerPage(value?: number) {
        if (value !== this.#numItemsPerPage) {
            this.#numItemsPerPage = value;
            this.#isTouched = true;
        }
    }

    setIsLoading(value?: boolean) {
        if (!!value !== this.#isLoading) {
            this.#isLoading = !!value;
            this.#isTouched = true;
        }
    }
    setDisabled(value?: boolean) {
        if (!!value !== this.#disabled) {
            this.#disabled = !!value;
            this.#isTouched = true;
        }
    }

    setMaxSelectedItems(value?: number) {
        if (value !== this.#maxSelectedItems) {
            this.#maxSelectedItems = value;
            this.#isTouched = true;
        }
    }
}

export { Finder };
