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
    matches: MatchesSnapshot<FItem>;
    pagination: FinderPagination;
    isEmpty: boolean;
    isLoading: boolean;
    disabled: boolean;
    search: {
        searchTerm: string;
        hasSearchRule: boolean;
        setSearchTerm: (value: string) => void;
    };
    filters: {
        value?: Record<string, any>;
        rules: FinderFilterRule<FItem>[];
        set: (identifier: FinderFilterRule | string, value?: any) => void;
        get: (identifier: FinderFilterRule | string) => any;
        delete: (identifier: FinderFilterRule | string) => void;
        toggle: (identifier: FinderFilterRule | string) => void;
        toggleOption: (identifier: FinderFilterRule | string, optionValue: FinderOption | any) => void;
        test: (identifier: FinderFilterRule | string, filterValue: any, meta?: FinderMeta) => FItem[];
        testOptions: (identifier: FinderFilterRule | string, meta?: FinderMeta) => Map<FinderOption | boolean, FItem[] | undefined>;
    };
    sortBy: {
        activeRule?: FinderSortByRule<FItem>;
        activeRuleId?: string;
        rules: FinderSortByRule<FItem>[];
        sortDirection?: FinderSortDirection;
        set: (identifier: FinderSortByRule | string, sortDirection?: FinderSortDirection) => void;
        setSortDirection: (sortDirection: FinderSortDirection) => void;
        cycleSortDirection: () => void;
    };
    groupBy: {
        activeRule?: FinderGroupByRule<FItem>;
        activeRuleId?: string;
        rules: FinderGroupByRule<FItem>[];
        requireGroup: boolean;
        set: (identifier?: FinderGroupByRule | string, value?: string) => void;
        toggle: (identifier: FinderGroupByRule | string) => void;
        reset: () => void;
    };
    selectedItems: {
        items?: FItem[];
        select: (item: FItem) => void;
        delete: (item: FItem) => void;
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

export type FinderRule<FItem = any> = FinderSearchRule<FItem> | FinderFilterRule<FItem> | FinderSortByRule<FItem> | FinderGroupByRule<FItem>;

export interface FinderSearchRule<FItem = any> {
    id?: string;
    searchFn: (item: FItem, searchTerm: string, meta?: FinderMeta) => boolean;
    debounceDelay?: number;
}

export interface FinderFilterRule<FItem = any, FValue = any> {
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: FinderMeta) => boolean;
    options?: FinderOption<FValue>[] | ((meta?: FinderMeta) => FinderOption<FValue>[]);
    multiple?: boolean;
    required?: boolean;
    is_boolean?: boolean;
    debounceDelay?: number;
}

export interface FinderGroupByRule<FItem = any> {
    id: string;
    groupFn: FinderPropertySelector<FItem>;
    sortGroupIdFn?: FinderPropertySelector<FinderResultGroup<FItem[]>>;
    direction?: FinderSortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
}

export interface FinderSortByRule<FItem = any> {
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
