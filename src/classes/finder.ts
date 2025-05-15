import { isEqual } from "lodash";
import { FinderConstructorOptions, FinderInjectedHandlers, FinderOnChangeCallback, FinderResultGroup, FinderRule, FinderDiff, MatchesSnapshot } from "../types";
import { FiltersMixin } from "./mixins/filters";
import { SortByMixin } from "./mixins/sort-by";
import { GroupByMixin } from "./mixins/group-by";
import { MetaMixin } from "./mixins/meta";
import { SelectedItemsMixin } from "./mixins/selected-items";
import { PaginationMixin } from "./mixins/pagination";
import { SearchMixin } from "./mixins/search";
import { filtersAPI } from "./mixins/filters-api";
import { groupByAPI } from "./mixins/group-by-api";
import { metaAPI } from "./mixins/meta-api";
import { paginationAPI } from "./mixins/pagination-api";
import { selectedItemsAPI } from "./mixins/selected-items-api";
import { sortByAPI } from "./mixins/sort-by-api";
import { searchAPI } from "./mixins/search-api";

class Finder<FItem> {
    #items: FItem[] | null | undefined;

    #rules: FinderRule<FItem>[];

    #snapshot?: MatchesSnapshot<FItem> = undefined;

    isLoading: boolean;

    disabled: boolean;

    updatedAt?: number;

    #onChange?: FinderOnChangeCallback;

    #onInit?: () => void;

    #isInitialized: boolean = false;

    // If true, the next call to findMatches() will force a render.
    #isTouched = false;

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
        this.#items = items;
        this.disabled = !!disabled;
        this.isLoading = !!isLoading;
        this.#onInit = onInit;
        this.#onChange = onChange;

        // to maintain a single source of truth, the parent class jealously guards this state and dole it out to the hooks.
        const handlers: FinderInjectedHandlers<FItem> = {
            getRules: () => this.#rules,
            isDisabled: () => this.disabled,
            onChange: (diff: FinderDiff) => this.#onChangeEvent(diff),
            onInit: () => this.initializeOnce(),
            getItems: () => {
                return Array.isArray(this.#items) ? this.#items : [];
            },
            getMeta: () => {
                return this.#mixins.meta.meta;
            },
        };

        // initialize all mixins with their default values.
        this.#mixins = {
            search: new SearchMixin(initialSearchTerm, handlers),
            filters: new FiltersMixin(initialFilters, handlers),
            sortBy: new SortByMixin(initialSortby, initialSortDirection, handlers),
            groupBy: new GroupByMixin(initialGroupBy, !!requireGroup, handlers),
            meta: new MetaMixin(initialMeta, handlers),
            selectedItems: new SelectedItemsMixin(initialSelectedItems, maxSelectedItems, handlers),
            pagination: new PaginationMixin(page, numItemsPerPage, handlers),
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

    #takeMatchesSnapshot() {
        let items: FItem[] = [];
        let groups: FinderResultGroup<FItem>[] = [];

        const hasGroupByRule = this.#mixins.groupBy.activeRule !== undefined;

        if (Array.isArray(this.#items)) {
            const meta = this.#mixins.meta.meta;

            items = [...this.#items];
            items = this.#mixins.search.process(items, meta);
            items = this.#mixins.filters.process(items, meta);
            items = this.#mixins.sortBy.process(items, meta);
            items = this.#mixins.pagination.process(items);

            if (hasGroupByRule) {
                groups = this.#mixins.groupBy.process(items);
            }
        }

        return {
            items: !hasGroupByRule ? items : undefined,
            groups: hasGroupByRule ? groups : undefined,
            numTotalItems: items.length,
        };
    }

    #onChangeEvent(diff: FinderDiff) {
        this.#isTouched = true;
        this.updatedAt = Date.now();

        if (this.#onChange) {
            this.#onChange(diff, this);
        }
    }

    get matches() {
        if (this.#snapshot === undefined || this.#isTouched) {
            this.#snapshot = this.#takeMatchesSnapshot();
            this.#isTouched = false;
        }
        return this.#snapshot;
    }

    get isEmpty() {
        return Array.isArray(this.#items) && this.#items.length === 0;
    }

    get search() {
        return searchAPI(this.#mixins.search);
    }

    get filters() {
        return filtersAPI(this.#mixins.filters);
    }

    get sortBy() {
        return sortByAPI(this.#mixins.sortBy);
    }

    get groupBy() {
        return groupByAPI(this.#mixins.groupBy);
    }

    get meta() {
        return metaAPI(this.#mixins.meta);
    }

    get pagination() {
        return paginationAPI(this.#mixins.pagination);
    }

    get selectedItems() {
        return selectedItemsAPI(this.#mixins.selectedItems);
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
