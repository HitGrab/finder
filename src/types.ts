/* eslint-disable @typescript-eslint/no-explicit-any */
import { readonlyFiltersInterface } from "./core/filters/filters-interface";
import { readonlyGroupByInterface } from "./core/group-by/group-by-interface";
import { readonlySearchInterface } from "./core/search/search-interface";
import { readonlySortByInterface } from "./core/sort-by/sort-by-interface";
import { FinderCore } from "./core/finder-core";
import { FinderOnInitCallback, FinderOnReadyCallback, FinderOnFirstUserInteractCallback, FinderOnChangeCallback } from "./core/types/event-types";

export interface FinderConstructorOptions<FItem, FContext = any> {
    // Stateless rules
    rules?: FinderRule<FItem>[];
    hooks?: RuleHook[];

    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: SortDirection;
    initialGroupBy?: string;
    initialFilters?: Record<string, any>;
    context?: FContext;

    isLoading?: boolean;
    disabled?: boolean;

    // Pagination properties
    page?: number;
    numItemsPerPage?: number;

    // Force items to use a group rule.
    // If no groupBy is set, the first valid group rule will be used.
    requireGroup?: boolean;

    // maybe a little verbose
    ignoreSortByRulesWhileSearchRuleIsActive?: boolean;

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

export type FinderRule<FItem = any, FContext = any> =
    | SearchRule<FItem, FContext>
    | FilterRuleUnion<FItem, FContext>
    | HydratedFilterRule<FItem, FContext>
    | SortByRule<FItem, FContext>
    | GroupByRule<FItem, FContext>;

export interface SearchRuleSharedProps {
    id?: string;
    label?: string;
    hidden?: boolean;
    debounceMilliseconds?: number;

    // these properties will be narrowed in the SearchRule union
    searchFn?: unknown;
    haystackFn?: unknown;
}
export interface SearchRuleSimple<FItem = any, FContext = any> extends SearchRuleSharedProps {
    searchFn?: never;
    haystackFn: (item: FItem, context?: FContext) => string | string[];
}

export interface SearchRuleAdvanced<FItem = any, FContext = any> extends SearchRuleSharedProps {
    haystackFn?: never;
    searchFn: (item: FItem, searchTerm: string, context?: FContext) => boolean;
}

export type SearchRule<FItem = any, FContext = any> = SearchRuleAdvanced<FItem, FContext> | SearchRuleSimple<FItem, FContext>;

export interface FilterOptionGeneratorFnOptions<FItem, FContext = any> {
    items: FItem[];
    context?: FContext;
}

export interface FilterRule<FItem = any, FValue = any, FContext = any> {
    id: string;
    options?: FilterOption<FValue>[] | ((options: FilterOptionGeneratorFnOptions<FItem, FContext>) => FilterOption<FValue>[]);
    required?: boolean;
    label?: string;
    hidden?: boolean;
    debounceMilliseconds?: number;

    // these properties will be narrowed by FilterRuleUnion
    multiple?: boolean;
    isBoolean?: boolean;
    filterFn: CallableFunction;
    defaultValue?: any;
}

interface FilterRuleWithBooleanValue<FItem, FValue = boolean, FContext = any> extends FilterRule<FItem, FValue> {
    multiple?: false;
    isBoolean: true;
    filterFn: (item: FItem, value: FValue, context?: FContext) => boolean;
    defaultValue?: boolean;
}
interface FilterRuleWithScalarValue<FItem, FValue, FContext = any> extends FilterRule<FItem, FValue, FContext> {
    multiple?: false;
    isBoolean?: false;
    filterFn: (item: FItem, value: FValue, context?: FContext) => boolean;
    defaultValue?: FValue;
}

interface FilterRuleWithMultipleValues<FItem, FValue, FContext = any> extends FilterRule<FItem, FValue, FContext> {
    multiple: true;
    isBoolean?: false;
    filterFn: (item: FItem, value: FValue[], context?: FContext) => boolean;
    defaultValue?: FValue[];
}

export type FilterRuleUnion<FItem = any, FValue = any> =
    | FilterRuleWithBooleanValue<FItem>
    | FilterRuleWithScalarValue<FItem, FValue>
    | FilterRuleWithMultipleValues<FItem, FValue>;

/**
 * A hydrated filter has rendered any option generator functions, and narrowed ambiguous properties from FilterRule.
 */
export interface HydratedFilterRule<FItem = any, FValue = any, FContext = any>
    extends Omit<FilterRule<FItem, FValue>, "options" | "required" | "isBoolean" | "hidden"> {
    options?: FilterOption<FValue>[];
    required: boolean;
    isBoolean: boolean;
    hidden: boolean;
    multiple: boolean;

    filterFn: ((item: FItem, value: FValue, context?: FContext) => boolean) | ((item: FItem, value: FValue[], context?: FContext) => boolean);
    defaultValue?: boolean | FValue | FValue[];
    _isHydrated: true;
}

export interface GroupByRule<FItem = any, FContext = any> {
    id: string;
    groupFn: FinderPropertySelector<FItem, FContext>;
    sortGroupIdFn?: FinderPropertySelector<FinderResultGroup<FItem>, FContext>;
    groupIdSortDirection?: SortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
    label?: string;
    hidden?: boolean;
}

export interface SortByRule<FItem = any, FContext = any> {
    id: string;
    sortFn: FinderPropertySelector<FItem, FContext> | FinderPropertySelector<FItem, FContext>[];
    defaultSortDirection?: SortDirection;
    label?: string;
    hidden?: boolean;
}

export type SortDirection = "asc" | "desc" | ("asc" | "desc")[];

/**
 * Select a property from the item to sort by.
 */
export type FinderPropertySelector<FItem, FContext = any> = (item: FItem, context?: FContext) => string | number;

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

export interface FilterTestOptions<FContext = any> {
    rules?: HydratedFilterRule[];
    values?: any;
    context?: FContext;
    isAdditive?: boolean;
}

export interface FilterTestRuleOptions<FContext = any> {
    rule: string | FilterRuleUnion | HydratedFilterRule;
    value: any;
    context?: FContext;
    isAdditive?: boolean;
}

// TODO: Maybe rename this
export interface FilterTestRuleOptionsOptions<FContext = any> {
    rule: string | FilterRuleUnion | HydratedFilterRule;
    context?: FContext;
    isAdditive?: boolean;
    mergeExistingValue?: boolean;
}

export interface FinderSnapshot<FItem, FContext = any> {
    search: ReturnType<typeof readonlySearchInterface<FItem>>;
    filters: ReturnType<typeof readonlyFiltersInterface>;
    sortBy: ReturnType<typeof readonlySortByInterface<FItem>>;
    groupBy: ReturnType<typeof readonlyGroupByInterface<FItem, FContext>>;
    context?: FContext;
    updatedAt?: number;
}

export interface RuleHook<FItem = any, FContext = any> {
    rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[];
    onChange: (instance: FinderCore<FItem, FContext>) => void;
}
