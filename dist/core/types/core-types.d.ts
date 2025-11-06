import { DebounceCallbackRegistry } from "../debounce-callback-registry";
import { RuleBook } from "../rule-book/rule-book";
import { RuleEffect, SearchEffect } from "./effect-types";
import { FinderOnChangeCallback, FinderOnFirstUserInteractCallback, FinderOnInitCallback, FinderOnReadyCallback, FinderTouchCallback } from "./event-types";
import { FilterRuleUnionDefinition, FinderRuleDefinition, GroupByRuleDefinition, SearchRuleDefinition, SortByRuleDefinition } from "./rule-types";
export interface FinderConstructorOptions<FItem, FContext = any> {
    rules: FinderRuleDefinition<FItem>[];
    effects?: (RuleEffect | SearchEffect)[];
    context?: FContext;
    isLoading?: boolean;
    disabled?: boolean;
    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: SortDirection;
    initialGroupBy?: string;
    initialGroupBySortDirection?: SortDirection;
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
export interface MixinInjectedDependencies<FItem = any, FContext = any> {
    isLoading: () => boolean;
    isDisabled: () => boolean;
    getRuleBook: () => RuleBook<FItem, FContext>;
    touch: FinderTouchCallback;
    getItems: () => FItem[];
    test: (serializedMixins: SnapshotSerializedMixins, isAdditive?: boolean) => FItem[];
    debouncer: ReturnType<typeof DebounceCallbackRegistry>;
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
    rule?: SearchRuleDefinition;
}
export interface SerializedFiltersMixin {
    rules: FilterRuleUnionDefinition[];
    values: Record<string, any>;
}
export interface SerializedSortByMixin {
    rule?: SortByRuleDefinition;
    sortDirection?: SortDirection;
}
export interface SerializedPaginationMixin {
    page: number;
    numItemsPerPage?: number;
}
export interface SerializedGroupByMixin {
    rule?: GroupByRuleDefinition;
    groupBySortDirection?: SortDirection;
}
export interface PaginationMixinInterface {
    page: number;
    offset: number;
    numItemsPerPage: number | undefined;
    numTotalItems: number;
    lastPage: number | undefined;
    isPaginated: boolean;
    setPage: (value: number) => void;
    setNumItemsPerPage: (value: number) => void;
}
