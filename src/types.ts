/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, ReactNode } from "react";

export type FinderOnChangeCallback<FItem = any> = (diff: FinderDiff, ref: FinderInstance<FItem>) => void;

export interface FinderConstructorOptions<FItem> {
    // Stateless rules
    rules?: FinderRule<FItem>[];

    initialSearchTerm?: string;
    initialSortby?: string;
    initialSortDirection?: FinderSortDirection;
    initialGroupBy?: string;
    initialFilters?: Record<string, any>;
    initialMeta?: FinderMeta;
    initialSelectedItems?: FItem[];

    // determine how many items can be selected
    maxSelectedItems?: number;

    isLoading?: boolean;
    disabled?: boolean;

    // Pagination properties
    page?: number;
    numItemsPerPage?: number;

    // Force items to use a group rule.
    // If no groupBy is set, the first valid group rule will be used.
    requireGroup?: boolean;

    // Triggered a single time after Finder first processes a rule.
    onInit?: () => void;

    // When values are changed, a snapshot is emitted to listeners
    onChange?: FinderOnChangeCallback<FItem>;
}

/**
 * Passed to the onChange event, indicating which mixin was just mutated.
 */
export interface FinderDiff<FItem = any> {
    filters?: Record<string, any>;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: FinderSortDirection;
    groupBy?: string;
    selectedItems?: FItem[];
    meta?: FinderMeta;
    page?: number;
    numItemsPerPage?: number;
    maxSelectedItems?: number;
}

export interface FinderInstance<FItem> {
    items: FItem[];
    matches: MatchesSnapshot<FItem>;
    pagination: FinderPagination;
    isEmpty: boolean;
    isLoading: boolean;
    disabled: boolean;
    updatedAt?: number;
    search: {
        searchTerm: string;
        activeRule?: SearchRule<FItem>;
        hasSearchTerm: boolean;
        setSearchTerm: (value: string) => void;
        reset: () => void;
    };
    filters: {
        value?: Record<string, any>;
        rules: FilterRule<FItem>[];
        activeRules: FilterRule<FItem>[];
        activeRuleIds: string[];
        isActive: (identifier: FilterRule | string, value?: any) => boolean;
        set: (identifier: FilterRule | string, value?: any) => void;
        get: (identifier: FilterRule | string) => any;
        delete: (identifier: FilterRule | string) => void;
        toggle: (identifier: FilterRule | string) => void;
        toggleOption: (identifier: FilterRule | string, optionValue: FinderOption | any) => void;
        test: (identifier: FilterRule | string, filterValue: any, meta?: FinderMeta) => FItem[];
        testOptions: (identifier: FilterRule | string, meta?: FinderMeta) => Map<FinderOption | boolean, FItem[] | undefined>;
    };
    sortBy: {
        activeRule?: SortByRule<FItem>;
        activeRuleId?: string;
        rules: SortByRule<FItem>[];
        sortDirection?: FinderSortDirection;
        set: (identifier: SortByRule | string, sortDirection?: FinderSortDirection) => void;
        setSortDirection: (sortDirection: string | string[] | undefined) => void;
        cycleSortDirection: () => void;
    };
    groupBy: {
        activeRule?: GroupByRule<FItem>;
        activeRuleId?: string;
        rules: GroupByRule<FItem>[];
        requireGroup: boolean;
        set: (identifier?: GroupByRule | string, value?: string) => void;
        toggle: (identifier: GroupByRule | string) => void;
        reset: () => void;
    };
    selectedItems: {
        items?: FItem[];
        select: (item: FItem) => void;
        delete: (item: FItem) => void;
        toggle: (item: FItem) => void;
        isSelected: (item: FItem) => boolean;
        reset: () => void;
    };
    meta: {
        value?: FinderMeta;
        set: (metaIdentifier: any, metaValue: any) => void;
        get: (metaIdentifier: any) => any;
        delete: (metaIdentifier: any) => void;
        reset: () => void;
    };
}

export interface FinderResultGroup<FItems> {
    id: string;
    items: FItems[];
}
export type FinderMeta = Map<any, any>;

export type FinderRule<FItem = any> = SearchRule<FItem> | FilterRule<FItem> | SortByRule<FItem> | GroupByRule<FItem>;

export interface SearchRule<FItem = any> extends Record<string, any> {
    id?: string;
    searchFn: (item: FItem, searchTerm: string, meta?: FinderMeta) => boolean;
    debounceDelay?: number;
}

export interface FilterRule<FItem = any, FValue = any> extends Record<string, any> {
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: FinderMeta) => boolean;
    options?: FinderOption<FValue>[] | ((items: FItem[], meta?: FinderMeta) => FinderOption<FValue>[]);
    multiple?: boolean;
    required?: boolean;
    is_boolean?: boolean;
    debounceDelay?: number;
}

export interface GroupByRule<FItem = any> extends Record<string, any> {
    id: string;
    groupFn: FinderPropertySelector<FItem>;
    sortGroupIdFn?: FinderPropertySelector<FinderResultGroup<FItem[]>>;
    direction?: FinderSortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
}

export interface SortByRule<FItem = any> extends Record<string, any> {
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultDirection?: "asc" | "desc" | ("asc" | "desc")[];
    options?: FinderOption;
}

export type FinderSortDirection = null | undefined | "asc" | "desc" | ("asc" | "desc")[];

export interface FinderPagination {
    page?: number;
    lastPage?: number;
    numTotalItems: number;
    numItemsPerPage?: number;
    isPaginated: boolean;
}

export interface FinderItemsComponentProps<FItem> {
    items: FItem[];
    pagination?: FinderPagination;
    meta?: FinderMeta;
}
export interface FinderGroupsComponentProps<FItem> {
    groups: FinderResultGroup<FItem>[];
    pagination?: FinderPagination;
    meta?: FinderMeta;
    rule?: GroupByRule;
}

/**
 * Select a property from the item to sort by.
 */
export type FinderPropertySelector<FItem> = (item: FItem, meta?: FinderMeta) => string | number;

/**
 * Describes the display of a filter or sort option.
 */
export interface FinderOption<FValue = any> {
    label: string;
    value: FValue;
    disabled?: boolean;
}

// Provides accessors for state owned by the parent.
export type FinderInjectedHandlers<FItem> = {
    isDisabled: () => boolean;
    getRules: () => FinderRule[];
    onInit: () => void;
    onChange: (diff: FinderDiff) => void;
    getMeta: () => FinderMeta | undefined;
    getItems: () => FItem[];
};

export interface MatchesSnapshot<FItem> {
    items?: FItem[];
    groups?: FinderResultGroup<FItem>[];
    numTotalItems?: number;
}
