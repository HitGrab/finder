/**
 * Public types that are necessary to use the library.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { readonlyFiltersInterface } from "./core/filters/filters-interface";
import { Finder as FinderCore } from "./core/finder";
import { readonlyGroupByInterface } from "./core/group-by/group-by-interface";
import { readonlyMetaInterface } from "./core/meta/meta-interface";
import { readonlySearchInterface } from "./core/search/search-interface";
import { readonlySelectedItemsInterface } from "./core/selected-items/selected-items-interface";
import { readonlySortByInterface } from "./core/sort-by/sort-by-interface";

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

    // Triggered after Finder initializes for the first time.
    onInit?: FinderOnInitCallback;

    // Triggered the first time a user interacts with the component.
    onFirstUserInteraction?: FinderOnFirstUserInteractCallback;

    // When values are changed, a snapshot is emitted to listeners
    onChange?: FinderOnChangeCallback;
}

export interface FinderResultGroup<FItem> {
    id: string;
    items: FItem[];
}
export type FinderMeta = Record<string, any>;

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
    options?: FilterOption<FValue>[] | ((items: FItem[], meta?: FinderMeta) => FilterOption<FValue>[]);
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
    options?: FilterOption<FValue>[];
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
export interface FilterOption<FValue = any> {
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
    search: ReturnType<typeof readonlySearchInterface<FItem>>;
    filters: ReturnType<typeof readonlyFiltersInterface<FItem>>;
    sortBy: ReturnType<typeof readonlySortByInterface<FItem>>;
    groupBy: ReturnType<typeof readonlyGroupByInterface<FItem>>;
    selectedItems: ReturnType<typeof readonlySelectedItemsInterface<FItem>>;
    meta: ReturnType<typeof readonlyMetaInterface<FItem>>;
    updatedAt: number | undefined;
}

export type FinderEvent = FinderInitEvent | FinderFirstUserInteractionEvent | FinderChangeEvent;

type FinderBaseEvent = {
    source: string;
    event: string;
    snapshot: FinderSnapshot<any>;
    timestamp: number;
};
export type FinderOnInitCallback = (event: FinderInitEvent) => void;
export type FinderOnFirstUserInteractCallback = (event: FinderFirstUserInteractionEvent) => void;

export interface FinderInitEvent extends FinderBaseEvent {
    source: "core";
    event: "finder.core.init";
}
export interface FinderFirstUserInteractionEvent extends FinderBaseEvent {
    source: "core";
    event: "finder.core.firstUserInteraction";
}

export type FinderTouchSource = "core" | "finder" | "filters" | "groupBy" | "meta" | "pagination" | "plugin" | "search" | "selectedItems" | "sortBy";

export type FinderTouchCallback = (event: FinderTouchEvent) => void;
/**
 * Internal communication between mixins and core
 */
export interface FinderTouchEvent {
    source: FinderTouchSource;
    event: FinderChangeEventName;
    current: any;
    initial: any;
}

/**
 * External type that consumers will receive
 */
export type FinderChangeEvent = FinderTouchEvent & FinderBaseEvent;

export type FinderChangeEventName =
    | "change"
    | `change.filters`
    | "change.filters.set"
    | `change.groupBy`
    | "change.groupBy.set"
    | "change.groupBy.setGroupIdSortDirection"
    | "change.meta"
    | "change.meta.set"
    | "change.meta.delete"
    | "change.meta.reset"
    | "change.pagination"
    | "change.pagination.setPage"
    | "change.pagination.setNumItemsPerPage"
    | "change.search"
    | "change.search.setSearchTerm"
    | "change.search.reset"
    | "change.selectedItems"
    | "change.selectedItems.setMaxSelectedItems"
    | "change.selectedItems.set"
    | "change.selectedItems.select"
    | "change.selectedItems.toggle"
    | "change.selectedItems.delete"
    | "change.selectedItems.reset"
    | "change.sortBy"
    | "change.sortBy.set"
    | "change.sortBy.setSortDirection"
    | `change.plugin`
    | `change.plugin.${string}`
    | "change.core.setIsLoading"
    | "change.core.setIsDisabled";

export type FinderOnChangeCallback = (event: FinderChangeEvent) => void;

export type FinderPluginFn<T extends FinderPluginInterface> = (...args: any[]) => T;

export interface FinderPluginInterface<FItem = any> {
    id: string;
    register: (finder: FinderCore<FItem>, touch: FinderTouchCallback) => void;
    onInit?: FinderOnInitCallback;
    onFirstUserInteraction?: FinderOnFirstUserInteractCallback;
    [k: string]: any;
}
