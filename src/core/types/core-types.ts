import { DebounceCallbackRegistry } from "../debounce-callback-registry";
import { RuleBook } from "../rule-book/rule-book";
import { RuleEffect, SearchEffect } from "./effect-types";
import { FinderOnChangeCallback, FinderOnFirstUserInteractCallback, FinderOnInitCallback, FinderOnReadyCallback, FinderTouchCallback } from "./event-types";
import { RuleDefinition, GroupByRuleDefinition, SearchRuleDefinition, SortByRuleDefinition, HydratedFilterRuleDefinition } from "./rule-types";

export interface FinderConstructorOptions<FItem, FContext = any> {
    rules: RuleDefinition<FItem>[];
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

    // maybe a little verbose
    ignoreSortByRulesWhileSearchRuleIsActive?: boolean;

    // Force items to use a group rule.
    // If no groupBy is set, the first valid group rule will be used.
    requireGroup?: boolean;

    // Pagination properties
    page?: number;
    numItemsPerPage?: number;

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
    rules: HydratedFilterRuleDefinition[];
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
