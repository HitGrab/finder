/**
 * Public types that are necessary to use the library.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { readonlyFiltersInterface } from "./core/filters/filters-interface";
import { Finder as FinderCore } from "./core/finder";
import { readonlyGroupByInterface } from "./core/group-by/group-by-interface";
import { metaInterface, readonlyMetaInterface } from "./core/meta/meta-interface";
import { readonlySearchInterface } from "./core/search/search-interface";
import { readonlySelectedItemsInterface } from "./core/selected-items/selected-items-interface";
import { readonlySortByInterface } from "./core/sort-by/sort-by-interface";

export type MetaInterface = ReturnType<typeof metaInterface>;
export interface FinderConstructorOptions<FItem> {
    // Stateless rules
    rules?: FinderRule<FItem>[];

    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: SortDirection;
    initialGroupBy?: string;
    initialFilters?: Record<string, any>;
    initialMeta?: Record<string, any>;
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

    // A valid items array was received
    onReady?: FinderOnReadyCallback;

    // Triggered the first time a user interacts with the component.
    onFirstUserInteraction?: FinderOnFirstUserInteractCallback;

    // When values are changed, a snapshot is emitted to listeners
    onChange?: FinderOnChangeCallback;
}

export interface FinderResultGroup<FItem> {
    id: string;
    items: FItem[];
}

export type FinderRule<FItem = any> = SearchRule<FItem> | FilterRule<FItem> | HydratedFilterRule<FItem> | SortByRule<FItem> | GroupByRule<FItem>;

export interface SearchRule<FItem = any> {
    id?: string;
    searchFn: (item: FItem, searchTerm: string, meta: MetaInterface) => boolean;
    label?: string;
    hidden?: boolean;
    debounceDelay?: number;
}

interface FilterRuleBase<FItem, FValue> {
    id: string;
    options?: FilterOption<FValue>[] | ((items: FItem[], meta: MetaInterface) => FilterOption<FValue>[]);
    required?: boolean;
    isBoolean?: boolean;
    label?: string;
    hidden?: boolean;
    debounceDelay?: number;
}
interface FilterRuleWithSingleValue<FItem, FValue> extends FilterRuleBase<FItem, FValue> {
    multiple?: false;
    filterFn: (item: FItem, value: FValue, meta: MetaInterface) => boolean;
    defaultValue?: FValue;
}

interface FilterRuleWithMultipleValues<FItem, FValue> extends FilterRuleBase<FItem, FValue> {
    multiple: true;
    filterFn: (item: FItem, value: FValue[], meta: MetaInterface) => boolean;
    defaultValue?: FValue[];
}

export type FilterRule<FItem = any, FValue = any> = FilterRuleWithSingleValue<FItem, FValue> | FilterRuleWithMultipleValues<FItem, FValue>;

/**
 * A hydrated filter has rendered any option generator functions, and narrowed uncertain properties from FilterRule.
 */
export type HydratedFilterRule<FItem = any, FValue = any> = {
    options?: FilterOption<FValue>[];
    required: boolean;
    isBoolean: boolean;
    hidden: boolean;
    _isHydrated: true;
} & Omit<FilterRule<FItem, FValue>, "options" | "required" | "isBoolean" | "hidden">;

export interface GroupByRule<FItem = any> {
    id: string;
    groupFn: FinderPropertySelector<FItem>;
    sortGroupIdFn?: FinderPropertySelector<FinderResultGroup<FItem>>;
    groupIdSortDirection?: SortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
    label?: string;
    hidden?: boolean;
}

export interface SortByRule<FItem = any> {
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultSortDirection?: SortDirection;
    label?: string;
    hidden?: boolean;
}

/**
 * Select a property from the item to sort by.
 */
export type FinderPropertySelector<FItem> = (item: FItem, meta: MetaInterface) => string | number;

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
    meta?: MetaInterface;
    isAdditive?: boolean;
}

export interface FilterTestRuleOptions {
    rule: string | FilterRule | HydratedFilterRule;
    value: any;
    meta?: MetaInterface;
    isAdditive?: boolean;
}

// TODO: Maybe rename this
export interface FilterTestRuleOptionsOptions {
    rule: string | FilterRule | HydratedFilterRule;
    meta?: MetaInterface;
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

export type FinderEvent = FinderInitEvent | FinderFirstUserInteractionEvent | FinderReadyEvent | FinderChangeEvent;

type FinderBaseEvent = {
    source: string;
    event: FinderEventName;
    snapshot: FinderSnapshot<any>;
    timestamp: number;
};
export type FinderOnInitCallback = (event: FinderInitEvent) => void;
export type FinderOnReadyCallback = (event: FinderReadyEvent) => void;
export type FinderOnFirstUserInteractCallback = (event: FinderFirstUserInteractionEvent) => void;

export interface FinderInitEvent extends FinderBaseEvent {
    source: "core";
    event: "init";
}
export interface FinderFirstUserInteractionEvent extends FinderBaseEvent {
    source: "core";
    event: "firstUserInteraction";
}
export interface FinderReadyEvent extends FinderBaseEvent {
    source: "core";
    event: "ready";
}

export type FinderTouchSource = "core" | "filters" | "groupBy" | "meta" | "pagination" | "plugin" | "search" | "selectedItems" | "sortBy";

export type FinderTouchCallback = (event: FinderTouchEvent) => void;
/**
 * Internal communication between mixins and core
 */
export interface FinderTouchEvent {
    source: FinderTouchSource;
    event: FinderEventName;
    current: any;
    initial: any;
}

/**
 * External type that consumers will receive
 */
export type FinderChangeEvent = FinderTouchEvent & FinderBaseEvent;

export type FinderEventName =
    | "init"
    | "firstUserInteraction"
    | "ready"
    | "change"
    | "change.core"
    | "change.core.setIsLoading"
    | "change.core.setIsDisabled"
    | "change.core.setItems"
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
    | `change.plugin.${string}`;

export type FinderOnChangeCallback = (event: FinderChangeEvent) => void;

export type FinderPluginFn<T extends FinderPluginInterface> = (...args: any[]) => T;

export interface FinderPluginInterface<FItem = any> {
    id: string;
    register: (finder: FinderCore<FItem>, touch: FinderTouchCallback) => void;
    [k: string]: any;
}

export type SortDirection = "asc" | "desc" | ("asc" | "desc")[];
