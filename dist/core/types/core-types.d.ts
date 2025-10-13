import { DebounceCallbackRegistry } from "../debounce-callback-registry";
import { RuleBook } from "../rule-book";
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
