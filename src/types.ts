/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, ReactNode } from "react";

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
        rules: HydratedFilterRule<FItem>[];
        activeRules: HydratedFilterRule<FItem>[];
        activeRuleIds: string[];
        isActive: (identifier: FilterRule | HydratedFilterRule | string, value?: any) => boolean;
        set: (identifier: FilterRule | HydratedFilterRule | string, value?: any) => void;
        get: (identifier: FilterRule | HydratedFilterRule | string) => any;
        delete: (identifier: FilterRule | HydratedFilterRule | string) => void;
        toggle: (identifier: FilterRule | HydratedFilterRule | string) => void;
        toggleOption: (identifier: FilterRule | HydratedFilterRule | string, optionValue: FinderOption | any) => void;
        test: (identifier: FilterRule | HydratedFilterRule | string, filterValue: any, meta?: FinderMeta) => FItem[];
        testOptions: (identifier: FilterRule | HydratedFilterRule | string, meta?: FinderMeta) => Map<FinderOption | boolean, FItem[] | undefined>;
    };
    sortBy: {
        activeRule?: HydratedSortByRule<FItem>;
        activeRuleId?: string;
        rules: HydratedSortByRule<FItem>[];
        sortDirection?: string;
        set: (identifier?: string | SortByRule | HydratedSortByRule, sortDirection?: string) => void;
        setSortDirection: (sortDirection?: string) => void;
        cycleSortDirection: () => void;
        toggleSortDirection: () => void;
    };
    groupBy: {
        activeRule?: GroupByRule<FItem>;
        activeRuleId?: string;
        rules: GroupByRule<FItem>[];
        requireGroup: boolean;
        groupIdSortDirection?: string;
        set: (identifier?: GroupByRule | string, value?: string) => void;
        toggle: (identifier: GroupByRule | string) => void;
        setGroupIdSortDirection: (direction?: string) => void;
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

export type FinderOnChangeCallback<FItem = any> = (diff: FinderDiff, ref: FinderInstance<FItem>) => void;

export interface FinderConstructorOptions<FItem> {
    // Stateless rules
    rules?: FinderRule<FItem>[];

    initialSearchTerm?: string;
    initialSortby?: string;
    initialSortDirection?: "asc" | "desc";
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
    sortDirection?: string;
    groupBy?: string;
    selectedItems?: FItem[];
    meta?: FinderMeta;
    page?: number;
    numItemsPerPage?: number;
    maxSelectedItems?: number;
    groupIdSortDirection?: string;
}

export interface FinderResultGroup<FItem> {
    id: string;
    items: FItem[];
}
export type FinderMeta = Map<any, any>;

export type FinderRule<FItem = any> = SearchRule<FItem> | FilterRule<FItem> | HydratedFilterRule<FItem> | SortByRule<FItem> | GroupByRule<FItem>;

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

export interface HydratedFilterRule<FItem = any, FValue = any> extends Omit<FilterRule<FItem, FValue>, "options"> {
    options?: FinderOption<FValue>[];
}

export interface HydratedSortByRule<FItem = any, FValue = any> extends Omit<SortByRule<FItem>, "options"> {
    options?: FinderOption<FValue>[];
}

export interface GroupByRule<FItem = any> extends Record<string, any> {
    id: string;
    groupFn: FinderPropertySelector<FItem>;
    sortGroupIdFn?: FinderPropertySelector<FinderResultGroup<FItem>>;
    groupIdSortDirection?: "asc" | "desc";
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
}

export interface SortByRule<FItem = any> extends Record<string, any> {
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultSortDirection?: "asc" | "desc";
    options?: FinderOption;
}

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
    getHydratedRules: () => FinderRule[];
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
