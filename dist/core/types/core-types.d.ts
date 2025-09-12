import { DebounceCallbackRegistry } from "../debounce-callback-registry/debounce-callback-registry";
import { readonlyFiltersInterface } from "../filters/filters-interface";
import { readonlyGroupByInterface } from "../group-by/group-by-interface";
import { RuleBook } from "../rule-book/rule-book";
import { readonlySearchInterface } from "../search/search-interface";
import { readonlySortByInterface } from "../sort-by/sort-by-interface";
import { RuleEffect, SearchEffect } from "./effect-types";
import { FinderOnChangeCallback, FinderOnFirstUserInteractCallback, FinderOnInitCallback, FinderOnReadyCallback, FinderTouchCallback } from "./event-types";
import { FinderRule, GroupByRule, HydratedFilterRule, SearchRule, SortByRule } from "./rule-types";
export interface FinderConstructorOptions<FItem, FContext = any> {
    rules: FinderRule<FItem>[];
    effects?: (RuleEffect | SearchEffect)[];
    context?: FContext;
    isLoading?: boolean;
    disabled?: boolean;
    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: SortDirection;
    initialGroupBy?: string;
    initialFilters?: Record<string, any>;
    ignoreSortByRulesWhileSearchRuleIsActive?: boolean;
    requireGroup?: boolean;
    page?: number;
    numItemsPerPage?: number;
    onInit?: FinderOnInitCallback;
    onReady?: FinderOnReadyCallback;
    onFirstUserInteraction?: FinderOnFirstUserInteractCallback;
    onChange?: FinderOnChangeCallback;
}
export interface FinderResultGroup<FItem> {
    id: string;
    items: FItem[];
}
export type SortDirection = "asc" | "desc" | ("asc" | "desc")[];
export interface ResultSnapshot<FItem> {
    items?: FItem[];
    groups?: FinderResultGroup<FItem>[];
    numMatchedItems: number;
    numTotalItems: number;
    hasGroupByRule: boolean;
}
export interface FinderSnapshot<FItem, FContext = any> {
    search: ReturnType<typeof readonlySearchInterface<FItem>>;
    filters: ReturnType<typeof readonlyFiltersInterface>;
    sortBy: ReturnType<typeof readonlySortByInterface<FItem>>;
    groupBy: ReturnType<typeof readonlyGroupByInterface<FItem, FContext>>;
    context?: FContext;
    updatedAt?: number;
}
export interface MixinInjectedDependencies<FItem = any, FContext = any> {
    isLoading: () => boolean;
    isDisabled: () => boolean;
    getRuleBook: () => RuleBook<FItem, FContext>;
    touch: FinderTouchCallback;
    getItems: () => FItem[];
    test: (serializedMixins: SnapshotSerializedMixins, isAdditive?: boolean) => FItem[];
    debouncer: DebounceCallbackRegistry;
}
export type EventCallback = (payload?: any) => void;
export interface SnapshotOptions<FItem, FContext> {
    items: FItem[];
    context: FContext;
    mixins: SnapshotSerializedMixins;
}
export interface SnapshotSerializedMixins {
    search?: SerializedSearchMixin;
    filters?: SerializedFiltersMixin;
    sortBy?: SerializedSortByMixin;
    pagination?: SerializedPaginationMixin;
    groupBy?: SerializedGroupByMixin;
}
export interface SerializedSearchMixin {
    searchTerm: string;
    rule?: SearchRule;
}
export interface SerializedFiltersMixin {
    rules: HydratedFilterRule[];
    values: Record<string, any>;
}
export interface SerializedSortByMixin {
    rule?: SortByRule;
    sortDirection?: SortDirection;
}
export interface SerializedPaginationMixin {
    page: number;
    numItemsPerPage?: number;
}
export interface SerializedGroupByMixin {
    rule?: GroupByRule;
    sortDirection?: SortDirection;
}
export interface SearchScore {
    percentOfHaystackMatched: number;
    longestSequentialSequence: number;
}
