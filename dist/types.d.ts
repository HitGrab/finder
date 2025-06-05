/**
 * Public types that are necessary to use the library.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Finder as FinderCore } from "./core/finder";

export interface FinderConstructorOptions<FItem> {
    // Stateless rules
    rules?: FinderRule<FItem>[];

    initialSearchTerm?: string;
    initialSortBy?: string;
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

    plugins?: (FinderPluginInterface | FinderPluginFn<FinderPluginInterface>)[];

    // Triggered a single time after Finder first processes a rule.
    onInit?: () => void;

    // When values are changed, a snapshot is emitted to listeners
    onChange?: FinderOnChangeCallback<FItem>;
}

/**
 * Passed to the onChange event, indicating which mixin was just mutated.
 */
export interface FinderDiff<FItem = any> {
    filter?: Record<string, any>;
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

export type FinderOnChangeCallback<FItem = any> = (diff: FinderDiff, snapshot: FinderSnapshot<FItem>) => void;

export interface FinderResultGroup<FItem> {
    id: string;
    items: FItem[];
}
export type FinderMeta = Map<any, any>;

export type FinderRule<FItem = any> = SearchRule<FItem> | FilterRule<FItem> | HydratedFilterRule<FItem> | SortByRule<FItem> | GroupByRule<FItem>;

export interface SearchRule<FItem = any> extends Record<string, any> {
    id?: string;
    searchFn: (item: FItem, searchTerm: string, meta?: FinderMeta) => boolean;
    label?: string;
    hidden?: boolean;
    debounceDelay?: number;
}

export interface FilterRule<FItem = any, FValue = any> extends Record<string, any> {
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: FinderMeta) => boolean;
    options?: FinderOption<FValue>[] | ((items: FItem[], meta?: FinderMeta) => FinderOption<FValue>[]);
    multiple?: boolean;
    required?: boolean;
    isBoolean?: boolean;
    defaultValue?: FValue;
    label?: string;
    hidden?: boolean;
    debounceDelay?: number;
}

export interface HydratedFilterRule<FItem = any, FValue = any> {
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: FinderMeta) => boolean;
    options?: FinderOption<FValue>[];
    multiple: boolean;
    required: boolean;
    isBoolean: boolean;
    defaultValue?: FValue;
    label?: string;
    hidden: boolean;
    debounceDelay?: number;
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
    label?: string;
    hidden?: boolean;
}

export interface SortByRule<FItem = any> extends Record<string, any> {
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultSortDirection?: "asc" | "desc";
    label?: string;
    hidden?: boolean;
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

export interface MatchesSnapshot<FItem> {
    items?: FItem[];
    groups?: FinderResultGroup<FItem>[];
    numMatchedItems: number;
    numTotalItems: number;
    hasGroupByRule: boolean;
}

export interface FilterTestOptions {
    rules?: HydratedFilterRule[];
    values?: any;
    meta?: FinderMeta;
    isAdditive?: boolean;
}

export interface FilterTestRuleOptions {
    rule: string | FilterRule | HydratedFilterRule;
    value: any;
    meta?: FinderMeta;
    isAdditive?: boolean;
}

// TODO: Maybe rename this
export interface FilterTestRuleOptionsOptions {
    rule: string | FilterRule | HydratedFilterRule;
    meta?: FinderMeta;
    isAdditive?: boolean;
    mergeExistingValue?: boolean;
}

export interface FinderSnapshot<FItem> {
    searchTerm?: string;
    filters?: Record<string, any>;
    sortBy?: SortByRule<FItem>;
    groupBy?: GroupByRule<FItem>;
    selectedItems?: FItem[];
    meta?: FinderMeta;
    updatedAt?: number;
}

export type FinderPluginFn<T extends FinderPluginInterface> = (...args: any[]) => T;

export interface FinderPluginInterface<FItem = any> {
    id: string;
    register: (finder: FinderCore<FItem>, touch: (diff: FinderDiff) => void) => void;
    [k: string]: any;
}
