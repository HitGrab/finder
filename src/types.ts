/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, RefObject } from "react";
import { Finder } from "./classes/finder";
import { searchInterface } from "./classes/mixins/search/search-interface";
import { filtersInterface } from "./classes/mixins/filters/filters-interface";
import { sortByInterface } from "./classes/mixins/sort-by/sort-by-interface";
import { groupByInterface } from "./classes/mixins/group-by/group-by-interface";
import { selectedItemsInterface } from "./classes/mixins/selected-items/selected-items-interface";
import { metaInterface } from "./classes/mixins/meta/meta-interface";
import { paginationInterface } from "./classes/mixins/pagination/pagination-interface";

export interface FinderInstance<FItem> {
    items: FItem[];
    isEmpty: boolean;
    isLoading: boolean;
    disabled: boolean;
    updatedAt?: number;
    matches: MatchesSnapshot<FItem>;
    pagination: ReturnType<typeof paginationInterface<FItem>>;
    search: ReturnType<typeof searchInterface<FItem>>;
    filters: ReturnType<typeof filtersInterface<FItem>>;
    sortBy: ReturnType<typeof sortByInterface<FItem>>;
    groupBy: ReturnType<typeof groupByInterface<FItem>>;
    selectedItems: ReturnType<typeof selectedItemsInterface<FItem>>;
    meta: ReturnType<typeof metaInterface<FItem>>;
}

export type FinderOnChangeCallback<FItem = any> = (diff: FinderDiff, snapshot: FinderSnapshot<FItem>) => void;

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

export interface FinderItemsComponentProps<FItem> {
    items: FItem[];
    pagination?: ReturnType<typeof paginationInterface>;
    meta?: FinderMeta;
}
export interface FinderGroupsComponentProps<FItem> {
    groups: FinderResultGroup<FItem>[];
    pagination?: ReturnType<typeof paginationInterface>;
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
    emit: (event: FinderEventNames, payload: any) => void;
    getMeta: () => FinderMeta | undefined;
    getItems: () => FItem[];
};

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

export interface FinderProps<FItem> extends FinderConstructorOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderInstance<FItem> | null>;
}

export type FinderEventNames = "init" | "change" | "setSearchTerm" | "setFilter" | "setSortBy" | "setGroupBy" | "toggleSelectedItem" | "setMeta";

export type EventPayloads<FItem> =
    | { event: "init"; payload: undefined }
    | { event: "change"; payload: { diff: FinderDiff; snapshot: FinderSnapshot<FItem> } }
    | { event: "setSearchTerm"; payload: { rule: SearchRule; searchTerm: string; snapshot: FinderSnapshot<FItem> } }
    | { event: "setFilter"; payload: { rule: HydratedFilterRule; value: any; snapshot: FinderSnapshot<FItem> } }
    | { event: "setSortBy"; payload: { rule: SortByRule; sortDirection: string; snapshot: FinderSnapshot<FItem> } }
    | { event: "setGroupBy"; payload: { rule: GroupByRule; groupIdSortDirection: string; snapshot: FinderSnapshot<FItem> } }
    | { event: "toggleSelectedItem"; payload: { item: FItem; isSelected: boolean } }
    | { event: "setMeta"; payload: { id: any; value: any } };

export interface FinderSnapshot<FItem> {
    searchTerm?: string;
    filters?: Record<string, any>;
    sortBy?: SortByRule<FItem>;
    groupBy?: GroupByRule<FItem>;
    selectedItems?: FItem[];
    meta?: FinderMeta;
}

export type FinderPluginFn<T extends FinderPluginInterface> = (...args: any[]) => T;

export interface FinderPluginInterface {
    id: string;
    register: (finder: Finder<any>) => void;
    [k: string]: any;
}
