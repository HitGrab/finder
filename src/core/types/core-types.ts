import { DebounceCallbackRegistry } from "../debounce-callback-registry/debounce-callback-registry";
import { readonlyFiltersInterface } from "../filters/filters-interface";
import { readonlyGroupByInterface } from "../group-by/group-by-interface";
import { RuleBook } from "../rule-book/rule-book";
import { readonlySearchInterface } from "../search/search-interface";
import { readonlySortByInterface } from "../sort-by/sort-by-interface";
import { RuleEffect, SearchEffect } from "./effect-types";
import { FinderOnChangeCallback, FinderOnFirstUserInteractCallback, FinderOnInitCallback, FinderOnReadyCallback, FinderTouchCallback } from "./event-types";
import { FinderRule } from "./rule-types";

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

export interface MatchesSnapshot<FItem> {
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
    getContext: () => any;
    getItems: () => FItem[];
    debouncer: DebounceCallbackRegistry;
}

export type EventCallback = (payload?: any) => void;
