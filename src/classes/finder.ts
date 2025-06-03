import { isEqual } from "lodash";
import { FinderRule, MatchesSnapshot, FinderOnChangeCallback, FinderConstructorOptions, FinderInjectedHandlers, FinderDiff, FinderResultGroup } from "../types";
import { isSearchRule, getRuleType } from "../utils/finder-utils";
import { FiltersMixin } from "./mixins/filters/filters";
import { GroupByMixin } from "./mixins/group-by/group-by";
import { MetaMixin } from "./mixins/meta/meta";
import { PaginationMixin } from "./mixins/pagination/pagination";
import { SearchMixin } from "./mixins/search/search";
import { SelectedItemsMixin } from "./mixins/selected-items/selected-items";
import { SortByMixin } from "./mixins/sort-by/sort-by";
import { searchInterface } from "./mixins/search/search-interface";
import { filtersInterface } from "./mixins/filters/filters-interface";
import { sortByInterface } from "./mixins/sort-by/sort-by-interface";
import { groupByInterface } from "./mixins/group-by/group-by-interface";
import { metaInterface } from "./mixins/meta/meta-interface";
import { paginationInterface } from "./mixins/pagination/pagination-interface";
import { selectedItemsInterface } from "./mixins/selected-items/selected-items-interface";

class Finder<FItem> {
    #items: FItem[] | null | undefined;

    // static rule definitions
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
            onInit,
            onChange = () => {},
        }: FinderConstructorOptions<FItem>,
    ) {
        this.#rules = this.#isValidRuleset(rules) ? rules : [];
        this.#items = items;
        this.disabled = !!disabled;
        this.isLoading = !!isLoading;
        this.#onInit = onInit;
        this.#onChange = onChange;

        // to maintain a single source of truth, the parent class jealously guards it's state and doles it out to the various mixins.
        const handlers: FinderInjectedHandlers<FItem> = {
            getItems: () => this.items,
            getRules: () => this.#rules,
            getMeta: () => this.#mixins.meta.meta,
            isDisabled: () => this.disabled,
            onChange: (diff: FinderDiff) => this.#onChangeEvent(diff),
            onInit: () => this.initializeOnce(),
        };

        // initialize all mixins with their default values.
        this.#mixins = {
            search: new SearchMixin(initialSearchTerm, handlers),
            filters: new FiltersMixin(initialFilters, handlers),
            sortBy: new SortByMixin(initialSortBy, initialSortDirection, handlers),
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

            paginatedItemSlice = this.#mixins.pagination.process(itemsToProcess, itemsToProcess.length);

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

    #onChangeEvent(diff: FinderDiff) {
        this.#isTouched = true;
        this.updatedAt = Date.now();

        if (this.#onChange) {
            this.#onChange(diff, this);
        }
    }

    #isValidRuleset(rules?: FinderRule[]): rules is FinderRule[] {
        if (!rules || rules.length === 0) {
            return false;
        }

        const filterIds: string[] = [];
        rules.forEach((rule) => {
            if (rule.id === undefined && !isSearchRule(rule)) {
                throw new Error("Finder is missing a unique rule id for rule.");
            }

            const uniqueName = [getRuleType(rule), rule.id].join(".");
            if (filterIds.includes(uniqueName)) {
                throw new Error(`Duplicate rule id: ${uniqueName}`);
            }
            filterIds.push(uniqueName);
        });

        return true;
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
