/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, ReactNode } from "react";

export type FinderOnChangeCallback<FItem = any> = (diff: FinderSnapshot, data: FinderCoreSnapshot<FItem>) => void;

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

// Values are the initial stateful variables
export interface FinderSnapshot<FItem = any> {
    filters?: Record<string, any>;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: FinderSortDirection;
    groupBy?: string;
    selectedItems?: FItem[];
    meta?: FinderMeta;
}

export interface FinderCore<FItem> {
    pagination?: FinderPagination;
    results: {
        items?: FItem[];
        groups?: FinderResultGroup<FItem>[];
        numTotalItems?: number;
    };
    isEmpty: boolean;
    isLoading: boolean;
    disabled: boolean;
    search: {
        value: string;
        hasSearchRule: boolean;
        set: (value: string) => void;
    };
    filters: {
        value?: Record<string, any>;
        rules: FinderFilterRule<FItem>[];
        set: (identifier: FinderFilterRule | string, value?: any) => void;
        get: (identifier: FinderFilterRule | string) => any;
        delete: (identifier: FinderFilterRule | string) => void;
        toggle: (identifier: FinderFilterRule | string) => void;
        toggleOption: (identifier: FinderFilterRule | string, optionValue: FinderOption | any) => void;
        test: (identifier: FinderFilterRule | string, filterState: any, meta?: FinderMeta) => FItem[];
        testOptions: (identifier: FinderFilterRule | string, meta?: FinderMeta) => Map<FinderOption | boolean, FItem[] | undefined>;
    };
    sortBy: {
        value?: string;
        rules: FinderSortByRule<FItem>[];
        sortDirection?: FinderSortDirection;
        set: (identifier: FinderSortByRule | string, sortDirection?: FinderSortDirection) => void;
        cycleDirection: () => void;
    };
    groupBy: {
        value?: string;
        rules: FinderGroupByRule<FItem>[];
        requireGroup: boolean;
        set: (identifier?: FinderGroupByRule | string, value?: string) => void;
        toggle: (identifier: FinderGroupByRule | string) => void;
        reset: () => void;
    };
    selectedItems: {
        value?: FItem[];
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

/**
 * A readonly copy of FinderCore provided to the onChange event.
 */
export interface FinderCoreSnapshot<FItem> {
    pagination?: FinderPagination;
    isEmpty: boolean;
    isLoading: boolean;
    disabled: boolean;
    search: {
        value: string;
        hasSearchRule: boolean;
    };
    filters: {
        value?: FinderSnapshot;
        rules: FinderFilterRule<FItem>[];
        get: (identifier: FinderFilterRule | string) => any;
    };
    sortBy: {
        value?: string;
        rules: FinderSortByRule<FItem>[];
        direction?: FinderSortDirection;
    };
    groupBy: {
        value?: string;
        rules: FinderGroupByRule<FItem>[];
        requireGroup?: boolean;
    };
    selectedItems: {
        value?: FItem[];
        maxSelectedItems?: number;
        isSelected: (item: FItem) => boolean;
    };
    meta: {
        value?: FinderMeta;
    };
}

export interface FinderResultGroup<FItems> {
    id: string;
    items: FItems[];
}
export type FinderMeta = Map<any, any>;

export type FinderRule<FItem = any> = FinderSearchRule<FItem> | FinderFilterRule<FItem> | FinderSortByRule<FItem> | FinderGroupByRule<FItem>;
export type FinderRuleFilterFunction = typeof isSearchRule | typeof isGroupByRule | typeof isSortByRule | typeof isFilterRule;

export interface FinderSearchRule<FItem = any> {
    id?: string;
    searchFn: (item: FItem, searchTerm: string) => boolean;
    debounceDelay?: number;
}
export function isSearchRule<FItem>(rule: unknown): rule is FinderSearchRule<FItem> {
    return typeof rule === "object" && rule !== null && "searchFn" in rule;
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

export function isFilterRule<FItem>(rule: unknown): rule is FinderFilterRule<FItem> {
    return typeof rule === "object" && rule !== null && "filterFn" in rule;
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
export function isGroupByRule<FItem>(rule: unknown): rule is FinderGroupByRule<FItem> {
    return typeof rule === "object" && rule !== null && "groupFn" in rule;
}

export interface FinderSortByRule<FItem = any> {
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultDirection?: "asc" | "desc" | ("asc" | "desc")[];
    options?: FinderOption;
}
export function isSortByRule<FItem>(rule: unknown): rule is FinderSortByRule<FItem> {
    return typeof rule === "object" && rule !== null && "sortFn" in rule;
}

export type FinderSortDirection = null | undefined | "asc" | "desc" | ("asc" | "desc")[];

export interface FinderPagination {
    page: number;
    lastPage: number;
    numTotalItems: number;
    numItemsPerPage: number;
    disabled: boolean;
}

export interface FinderContentComponentProps<FItem = any> {
    children: {
        loading?: ElementType | ReactNode;
        empty?: ElementType | ReactNode;
        items?: ElementType<FinderItemsComponentProps<FItem>>;
        groups?: ElementType<FinderGroupsComponentProps<FItem>>;
    };
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
export type FinderPropertySelector<FItem> = (item: FItem) => string | number;

/**
 * Describes the display of a filter or sort option.
 */
export interface FinderOption<FValue = any> {
    label: string;
    value: FValue;
    disabled?: boolean;
}

export function isFinderOption(data: unknown): data is FinderOption {
    return typeof data === "object" && data !== null && "label" in data && "value" in data;
}
// Provides accessors for state owned by the parent.
export type FinderInjectedHandlers<FItem> = {
    isDisabled: () => boolean;
    getRules: () => FinderRule[];
    onInit: () => void;
    onChange: (diff: FinderSnapshot) => void;
    getMeta: () => FinderMeta | undefined;
    getItems: () => FItem[];
    getMaxSelectedItems: () => number | undefined;
};

export interface MatchesSnapshot<FItem> {
    items?: FItem[];
    groups?: FinderResultGroup<FItem>[];
    numTotalItems?: number;
    pagination?: FinderPagination;
}
