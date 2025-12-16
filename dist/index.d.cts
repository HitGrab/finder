import * as react0 from "react";
import { ElementType, PropsWithChildren, ReactElement, ReactNode, RefObject } from "react";
import * as react_jsx_runtime6 from "react/jsx-runtime";

//#region src/core/types/rule-types.d.ts
/**
 * Select a property from the item to sort by.
 */
type FinderPropertySelector<FItem, FContext = any> = (item: FItem, context: FContext) => string | number;
interface Rule {
  id: string;
  debounceMilliseconds?: number;
  label?: string;
  hidden?: boolean;
}
type RuleDefinition<FItem = any, FContext = any> = SearchRuleDefinition<FItem, FContext> | FilterRuleDefinition<FItem, FContext> | SortByRuleDefinition<FItem, FContext> | GroupByRuleDefinition<FItem, FContext>;
interface SearchRuleDefinition<FItem = any, FContext = any> extends Omit<Rule, "id"> {
  id?: string;
  searchFn?: (item: FItem, context: FContext) => string | string[];
}
/**
 * Describes the display of a filter or sort option.
 */
interface FilterOption<FValue = any> {
  label?: string;
  value: FValue;
  disabled?: boolean;
}
interface FilterRuleDefinition<FItem = any, FValue = any, FContext = any> extends Rule {
  filterFn: (item: FItem, value: FValue, context: FContext) => boolean;
  required?: boolean;
  strictOptions?: boolean;
  multiple?: boolean;
  boolean?: boolean;
  options?: FilterOption<FValue>[] | ((options: {
    items: FItem[];
    context: FContext;
  }) => FilterOption<FValue>[]);
}
type AnyFilterRuleDefinition<FItem = any, FValue = any> = Omit<FilterRuleDefinition<FItem, FValue>, "options">;
interface FilterRuleWithBooleanValue<FItem = any, FValue = boolean, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
  multiple?: false;
  boolean: true;
  defaultValue?: boolean;
  options?: never;
}
interface FilterRuleWithSingleValue<FItem = any, FValue = any, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
  multiple?: false;
  boolean?: false;
  defaultValue?: FValue;
}
interface FilterRuleWithMultipleValues<FItem = any, FValue = any, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
  multiple: true;
  boolean?: false;
  defaultValue?: FValue[];
}
/**
 * A hydrated filter has rendered any option generator functions, and narrowed ambiguous properties from FilterRule.
 */
interface HydratedFilterRuleDefinition<FItem = any, FValue = any, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
  options?: FilterOption<FValue>[];
  multiple: boolean;
  boolean: boolean;
  _isHydrated: true;
}
interface SortByRuleDefinition<FItem = any, FContext = any> extends Rule {
  sortFn: FinderPropertySelector<FItem, FContext> | FinderPropertySelector<FItem, FContext>[];
  defaultSortDirection?: SortDirection;
}
interface GroupByRuleDefinition<FItem = any, FContext = any> extends Rule {
  groupFn: (item: FItem, context: FContext) => string | number | (string | number)[];
  sortGroupFn?: FinderPropertySelector<FinderResultGroup<FItem>, FContext>;
  defaultGroupSortDirection?: SortDirection;
  sticky?: {
    header?: string | string[];
    footer?: string | string[];
  } | ((groups: FinderResultGroup<FItem>[], context: FContext) => {
    header?: string | string[];
    footer?: string | string[];
  });
}
interface FilterTestOptions {
  rules: HydratedFilterRuleDefinition[];
  values?: Record<string, any>;
  isAdditive?: boolean;
}
interface FilterTestRuleOptions {
  rule: string | AnyFilterRuleDefinition;
  value: any;
  isAdditive?: boolean;
}
//#endregion
//#region src/core/core-constants.d.ts
declare const EVENTS: {
  readonly INIT: "init";
  readonly FIRST_USER_INTERACTION: "firstUserInteraction";
  readonly READY: "ready";
  readonly CHANGE: "change";
  readonly SET_ITEMS: "setItems";
  readonly SET_IS_LOADING: "setIsLoading";
  readonly SET_IS_DISABLED: "setIsDisabled";
  readonly SET_CONTEXT: "setContext";
  readonly SET_SEARCH_TERM: "setSearchTerm";
  readonly RESET_SEARCH_TERM: "resetSearchTerm";
  readonly SET_FILTER: "setFilter";
  readonly RESET_FILTERS: "resetFilters";
  readonly SET_SORT_BY: "setSortBy";
  readonly SET_SORT_BY_DIRECTION: "setSortDirection";
  readonly SET_GROUP_BY: "setGroupBy";
  readonly SET_GROUP_SORT_BY_DIRECTION: "setGroupBySortDirection";
  readonly SET_PAGE: "setPage";
  readonly SET_NUM_ITEMS_PER_PAGE: "setNumItemsPerPage";
  readonly SYNC_UPDATED_AT: "syncUpdatedAt";
};
declare const EVENT_SOURCE: {
  readonly CORE: "core";
  readonly SEARCH: "search";
  readonly FILTERS: "filters";
  readonly GROUP_BY: "groupBy";
  readonly SORT_BY: "sortBy";
  readonly PAGINATION: "pagination";
};
//#endregion
//#region src/core/types/event-types.d.ts
type FinderTouchSource = (typeof EVENT_SOURCE)[keyof typeof EVENT_SOURCE];
interface FinderSharedEventProps {
  source: string;
  event: FinderEventName;
  timestamp: number;
  instance: FinderCore;
}
interface FinderInitEvent extends FinderSharedEventProps {
  source: "core";
  event: "init";
}
interface FinderFirstUserInteractionEvent extends FinderSharedEventProps {
  source: "core";
  event: "firstUserInteraction";
}
interface FinderReadyEvent extends FinderSharedEventProps {
  source: "core";
  event: "ready";
}
type FinderEvent = FinderInitEvent | FinderFirstUserInteractionEvent | FinderReadyEvent | FinderChangeEvent;
type FinderOnInitCallback = (event: FinderInitEvent) => void;
type FinderOnReadyCallback = (event: FinderReadyEvent) => void;
type FinderOnFirstUserInteractCallback = (event: FinderFirstUserInteractionEvent) => void;
type FinderOnChangeCallback = (event: FinderChangeEvent) => void;
/**
 * Internal communication between mixins and core
 */
interface FinderTouchEvent {
  source: FinderTouchSource;
  event: FinderEventName;
  current: any;
  initial: any;
  rule?: RuleDefinition;
}
/**
 * External type that consumers will receive
 */
type FinderChangeEvent = FinderTouchEvent & FinderSharedEventProps;
type FinderEventName = (typeof EVENTS)[keyof typeof EVENTS];
//#endregion
//#region src/core/finder-core.d.ts
/**
 * This thin wrapper around FinderCoreImplementation defines the mixin interfaces and hides private methods.
 */
declare class FinderCore<FItem = any, FContext = any> {
  #private;
  constructor(items: FItem[] | null | undefined, options: FinderConstructorOptions<FItem, FContext>);
  get items(): FItem[];
  get context(): FContext;
  get isReady(): boolean;
  get isEmpty(): boolean;
  get hasMatches(): boolean;
  get isLoading(): boolean;
  get disabled(): boolean;
  get state(): "loading" | "empty" | "groups" | "items" | "noMatches";
  get updatedAt(): number;
  get events(): {
    on: (event: FinderEventName, callback: EventCallback) => void;
    off: (event: FinderEventName, callback: EventCallback) => void;
    silently: (callback: EventCallback) => void;
    isSilent: () => boolean;
  };
  /**
   * Mixin interfaces
   */
  get matches(): ResultSnapshot<FItem>;
  get search(): {
    rule: SearchRuleDefinition<unknown, any> | undefined;
    searchTerm: string;
    hasSearchTerm: boolean;
    hasSearchRule: boolean;
    setSearchTerm: (value: string) => void;
    reset: () => void;
    test: (searchTerm: string, isAdditive?: boolean) => FItem[];
  };
  get filters(): {
    values: Record<string, any>;
    raw: Record<string, any>;
    activeRules: HydratedFilterRuleDefinition<any, any, any>[];
    rules: HydratedFilterRuleDefinition<any, any, any>[];
    isActive: (identifier: string | AnyFilterRuleDefinition<any, any>) => boolean;
    get: (identifier: string | AnyFilterRuleDefinition<any, any>) => any;
    add: <FValue>(identifier: string | AnyFilterRuleDefinition<any, FValue>, optionValue?: FValue | FilterOption<FValue>) => void;
    has: (identifier: string | AnyFilterRuleDefinition<any, any>, optionValue?: any) => boolean;
    getRule: (identifier: string | AnyFilterRuleDefinition<any, any>) => HydratedFilterRuleDefinition<any, any, any>;
    toggle: <FValue>(identifier: string | AnyFilterRuleDefinition<any, FValue>, optionValue?: FValue | FilterOption<FValue>) => void;
    set: <FValue>(identifier: string | AnyFilterRuleDefinition<any, FValue>, value?: FValue | FValue[]) => void;
    delete: <FValue>(identifier: string | AnyFilterRuleDefinition<any, FValue>, optionValue?: FValue | FilterOption<FValue>) => void;
    reset: () => void;
    test: (options: FilterTestOptions) => any[];
    testRule: ({
      rule: identifier,
      value,
      ...options
    }: FilterTestRuleOptions) => any[];
    testRuleOptions: (identifier: string | AnyFilterRuleDefinition<any, any>, isAdditive?: boolean) => Map<any, any>;
  };
  get sortBy(): {
    activeRule: SortByRuleDefinition<unknown, any> | undefined;
    sortDirection: SortDirection;
    userHasSetSortDirection: boolean;
    rules: SortByRuleDefinition<unknown, any>[];
    set: (identifier?: string | SortByRuleDefinition, incomingSortDirection?: SortDirection) => void;
    toggle: (identifier: string | SortByRuleDefinition) => void;
    isRuleActive: (identifier: string | SortByRuleDefinition) => boolean;
    reset: () => void;
    setSortDirection: (incomingSortDirection?: SortDirection) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
  };
  get groupBy(): {
    activeRule: GroupByRuleDefinition<unknown, any> | undefined;
    requireGroup: boolean;
    rules: GroupByRuleDefinition<unknown, any>[];
    groupBySortDirection: SortDirection | undefined;
    set: (identifier?: string | GroupByRuleDefinition<any, any>) => void;
    toggle: (identifier: string | GroupByRuleDefinition<any, any>) => void;
    setGroupSortDirection: (direction?: SortDirection) => void;
    reset: () => void;
  };
  get pagination(): {
    page: number;
    offset: number;
    numItemsPerPage: number | undefined;
    numTotalItems: number;
    lastPage: number | undefined;
    isPaginated: boolean;
    setPage: (value: number) => void;
    setNumItemsPerPage: (value?: number) => void;
  };
  /**
   * Mutators
   */
  setItems(items: FItem[] | null | undefined): void;
  setIsLoading(value?: boolean): void;
  setIsDisabled(value?: boolean): void;
  setRules(definitions: RuleDefinition<FItem>[]): void;
  setContext(context: FContext): void;
  /**
   * Utils
   */
  test(mixins: SnapshotSerializedMixins, isAdditive?: boolean): FItem[];
  getRule<T extends RuleDefinition<FItem>>(identifier: string | RuleDefinition<FItem>): T | undefined;
  toJSON(): Omit<FinderConstructorOptions<FItem, any>, "rules">;
}
//#endregion
//#region src/core/types/effect-types.d.ts
interface RuleEffect<FItem = any, FContext = any> {
  rules: string | RuleDefinition<FItem> | (string | RuleDefinition<FItem>)[] | ((items: FItem[], context: FContext) => string | RuleDefinition<FItem> | (string | RuleDefinition<FItem>)[]);
  onChange: (instance: FinderCore<FItem, FContext>, rule: RuleDefinition<FItem>) => void;
}
interface SearchEffect<FItem = any, FContext = any> {
  haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]);
  onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void;
}
//#endregion
//#region src/core/types/core-types.d.ts
interface FinderConstructorOptions<FItem, FContext = any> {
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
  ignoreSortByRulesWhileSearchRuleIsActive?: boolean;
  requireGroup?: boolean;
  page?: number;
  numItemsPerPage?: number;
  onInit?: FinderOnInitCallback;
  onReady?: FinderOnReadyCallback;
  onFirstUserInteraction?: FinderOnFirstUserInteractCallback;
  onChange?: FinderOnChangeCallback;
}
interface FinderResultGroup<FItem> {
  id: string;
  items: FItem[];
}
type SortDirection = "asc" | "desc" | ("asc" | "desc")[];
interface ResultSnapshot<FItem> {
  items?: FItem[];
  groups?: FinderResultGroup<FItem>[];
  numMatchedItems: number;
  numTotalItems: number;
  hasGroupByRule: boolean;
}
type EventCallback = (payload?: any) => void;
interface SnapshotSerializedMixins {
  search?: SerializedSearchMixin;
  filters?: SerializedFiltersMixin;
  sortBy?: SerializedSortByMixin;
  pagination?: SerializedPaginationMixin;
  groupBy?: SerializedGroupByMixin;
}
interface SerializedSearchMixin {
  searchTerm: string;
  rule?: SearchRuleDefinition;
}
interface SerializedFiltersMixin {
  rules: HydratedFilterRuleDefinition[];
  values: Record<string, any>;
}
interface SerializedSortByMixin {
  rule?: SortByRuleDefinition;
  sortDirection?: SortDirection;
}
interface SerializedPaginationMixin {
  page: number;
  numItemsPerPage?: number;
}
interface SerializedGroupByMixin {
  rule?: GroupByRuleDefinition;
  groupBySortDirection?: SortDirection;
}
interface PaginationMixinInterface {
  page: number;
  offset: number;
  numItemsPerPage: number | undefined;
  numTotalItems: number;
  lastPage: number | undefined;
  isPaginated: boolean;
  setPage: (value: number) => void;
  setNumItemsPerPage: (value: number) => void;
}
//#endregion
//#region src/core/types/string-match-types.d.ts
/**
 *  These values all point to the transformed haystack.
 */
interface StringMatchSegment {
  index: number;
  length: number;
  is_match: boolean;
  value: string;
}
//#endregion
//#region src/react/types/react-types.d.ts
interface FinderProps<FItem, FContext> extends FinderConstructorOptions<FItem, FContext>, PropsWithChildren {
  items: FItem[] | undefined | null;
  controllerRef?: RefObject<FinderCore<FItem, FContext> | null>;
}
interface FinderContentProps<FItem = any, FContext = any> {
  empty: {
    pagination: PaginationMixinInterface;
    context: FContext;
  };
  loading: {
    pagination: PaginationMixinInterface;
    context: FContext;
  };
  noMatches: {
    pagination: PaginationMixinInterface;
    context: FContext;
  };
  items: {
    items: FItem[];
    pagination: PaginationMixinInterface;
    context: FContext;
  };
  groups: {
    groups: FinderResultGroup<FItem>[];
    pagination: PaginationMixinInterface;
    context: FContext;
  };
}
interface StringMatchSegmentProps {
  segment: StringMatchSegment;
  segmentIndex: number;
}
type FinderSearchTermProp = keyof HTMLElementTagNameMap | ElementType | ElementType<StringMatchSegmentProps>;
//#endregion
//#region src/core/utils/rule-type-enforcers.d.ts
/**
 * Enforce structure for an array of rule of mixed types.
 */
declare function finderRuleset<FItem, FContext = any>(rules: RuleDefinition<FItem, FContext>[]): RuleDefinition<FItem, FContext>[];
declare function searchRule<FItem, FContext = any>(rule: SearchRuleDefinition<FItem, FContext>): SearchRuleDefinition<FItem, FContext>;
declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithMultipleValues<FItem, FValue, FContext>>(rule: T): FilterRuleWithMultipleValues<FItem, FValue>;
declare function filterRule<FItem, FValue = boolean, FContext = any, T = FilterRuleWithBooleanValue<FItem, FValue, FContext>>(rule: T): FilterRuleWithBooleanValue<FItem, FValue>;
declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithSingleValue<FItem, FValue, FContext>>(rule: T): FilterRuleWithSingleValue<FItem, FValue>;
declare function sortByRule<FItem, FContext = any>(rule: SortByRuleDefinition<FItem, FContext>): SortByRuleDefinition<FItem, FContext>;
declare function groupByRule<FItem, FContext = any>(rule: GroupByRuleDefinition<FItem, FContext>): GroupByRuleDefinition<FItem, FContext>;
declare function ruleEffect<FItem, FContext = any>(rules: string | RuleDefinition<FItem> | (string | RuleDefinition<FItem>)[] | ((items: FItem[], context: FContext) => string | RuleDefinition<FItem> | (string | RuleDefinition<FItem>)[]), onChange: (instance: FinderCore<FItem, FContext>, rule: RuleDefinition) => void): RuleEffect<FItem, FContext>;
declare function searchEffect<FItem, FContext = any>(haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]), onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void): SearchEffect<FItem, FContext>;
declare function transformFilterToSingleValue<FItem, FValue, FContext = any>(filter: AnyFilterRuleDefinition<FItem, FValue>): FilterRuleWithMultipleValues<FItem, FValue, FContext>;
declare function transformFilterToBoolean<FItem, FValue, FContext = any>(filter: AnyFilterRuleDefinition<FItem, FValue>): FilterRuleWithBooleanValue<FItem, boolean, FContext>;
declare function transformFilterToMultiple<FItem, FValue, FContext = any>(filter: AnyFilterRuleDefinition<FItem, FValue>): FilterRuleWithMultipleValues<FItem, FValue, FContext>;
//#endregion
//#region src/react/hooks/use-finder.d.ts
declare function useFinder<FItem = any, FContext = undefined>(): FinderCore<FItem, FContext>;
//#endregion
//#region src/react/components/finder-content-loading.d.ts
interface FinderContentLoadingProps<FItem, FContext> {
  children: ElementType<FinderContentProps<FItem, FContext>["loading"]> | ReactElement<FinderContentProps<FItem, FContext>["loading"]> | Iterable<ReactNode>;
}
declare function FinderContentLoading<FItem, FContext>({
  children: Component
}: FinderContentLoadingProps<FItem, FContext>): react_jsx_runtime6.JSX.Element | Iterable<ReactNode> | null;
//#endregion
//#region src/react/components/finder-content-empty.d.ts
interface FinderContentEmptyProps<FItem, FContext> {
  children: ElementType<FinderContentProps<FItem, FContext>["empty"]> | ReactElement<FinderContentProps<FItem, FContext>["empty"]> | Iterable<ReactNode>;
}
declare function FinderContentEmpty<FItem = any, FContext = any>({
  children: Component
}: FinderContentEmptyProps<FItem, FContext>): react_jsx_runtime6.JSX.Element | Iterable<ReactNode> | null;
//#endregion
//#region src/react/components/finder-content-no-matches.d.ts
interface FinderContentNoMatchesProps<FItem, FContext> {
  children: ElementType<FinderContentProps<FItem, FContext>["noMatches"]> | ReactElement<FinderContentProps<FItem, FContext>["noMatches"]> | Iterable<ReactNode>;
}
declare function FinderContentNoMatches<FItem = any, FContext = any>({
  children: Component
}: FinderContentNoMatchesProps<FItem, FContext>): react_jsx_runtime6.JSX.Element | Iterable<ReactNode> | null;
//#endregion
//#region src/react/components/finder-content-items.d.ts
interface FinderContentItemsProps<FItem, FContext> {
  children: ElementType<FinderContentProps<FItem, FContext>["items"]> | ReactElement<FinderContentProps<FItem, FContext>["items"]> | Iterable<ReactNode>;
}
declare function FinderContentItems<FItem = any, FContext = any>({
  children: Component
}: FinderContentItemsProps<FItem, FContext>): react_jsx_runtime6.JSX.Element | Iterable<ReactNode> | null;
//#endregion
//#region src/react/components/finder-content-groups.d.ts
interface FinderContentGroupsProps<FItem, FContext> {
  children: ElementType<FinderContentProps<FItem, FContext>["groups"]> | ReactElement<FinderContentProps<FItem, FContext>["groups"]> | Iterable<ReactNode>;
}
declare function FinderContentGroups<FItem = any, FContext = any>({
  children: Component
}: FinderContentGroupsProps<FItem, FContext>): react_jsx_runtime6.JSX.Element | Iterable<ReactNode> | null;
//#endregion
//#region src/react/components/finder-content.d.ts
interface FinderContentContainerProps<FItem, FContext> {
  children: {
    loading?: ElementType<FinderContentProps<FItem, FContext>["loading"]> | ReactElement<FinderContentProps<FItem, FContext>["loading"]> | Iterable<ReactNode>;
    empty?: ElementType<FinderContentProps<FItem, FContext>["empty"]> | ReactElement<FinderContentProps<FItem, FContext>["empty"]> | Iterable<ReactNode>;
    noMatches?: ElementType<FinderContentProps<FItem, FContext>["noMatches"]> | ReactElement<FinderContentProps<FItem, FContext>["noMatches"]> | Iterable<ReactNode>;
    items?: ElementType<FinderContentProps<FItem, FContext>["items"]> | ReactElement<FinderContentProps<FItem, FContext>["items"]> | Iterable<ReactNode>;
    groups?: ElementType<FinderContentProps<FItem, FContext>["groups"]> | ReactElement<FinderContentProps<FItem, FContext>["groups"]> | Iterable<ReactNode>;
  };
}
declare function FinderContent<FItem = any, FContext = any>({
  children: renderProps
}: FinderContentContainerProps<FItem, FContext>): (react_jsx_runtime6.JSX.Element | undefined)[];
declare namespace FinderContent {
  var Loading: typeof FinderContentLoading;
  var Empty: typeof FinderContentEmpty;
  var NoMatches: typeof FinderContentNoMatches;
  var Items: typeof FinderContentItems;
  var Groups: typeof FinderContentGroups;
}
//#endregion
//#region src/react/components/finder-search-term-haystack.d.ts
interface FinderSearchTermHaystackProps {
  children: string;
  Match?: FinderSearchTermProp;
  Miss?: FinderSearchTermProp;
}
declare function FinderSearchTermHaystack({
  Match,
  Miss,
  children: haystack
}: FinderSearchTermHaystackProps): string | react_jsx_runtime6.JSX.Element;
//#endregion
//#region src/react/components/finder.d.ts
declare function Finder<FItem = any, FContext = any>({
  items,
  rules,
  effects,
  initialSearchTerm,
  initialSortBy,
  initialSortDirection,
  initialGroupBy,
  initialGroupBySortDirection,
  initialFilters,
  context,
  isLoading,
  disabled,
  page,
  numItemsPerPage,
  requireGroup,
  ignoreSortByRulesWhileSearchRuleIsActive,
  onInit,
  onReady,
  onFirstUserInteraction,
  onChange,
  controllerRef,
  children
}: FinderProps<FItem, FContext>): react_jsx_runtime6.JSX.Element;
declare namespace Finder {
  var Content: typeof FinderContent;
  var SearchTermHaystack: typeof FinderSearchTermHaystack;
}
//#endregion
//#region src/react/hooks/use-finder-ref.d.ts
declare function useFinderRef<FItem = any, FContext = any>(): react0.RefObject<FinderCore<FItem, FContext> | null>;
//#endregion
//#region src/react/components/string-match.d.ts
interface StringMatchProps {
  needle: string;
  haystack: string;
  Match?: FinderSearchTermProp;
  Miss?: FinderSearchTermProp;
}
/**
 * Split a string into result segment components .
 */
declare function StringMatch({
  needle,
  haystack,
  Match,
  Miss
}: StringMatchProps): string | (string | react_jsx_runtime6.JSX.Element)[];
//#endregion
export { type AnyFilterRuleDefinition, type FilterOption, type FilterRuleDefinition, Finder, type FinderChangeEvent, type FinderConstructorOptions, type FinderContentProps, type FinderEvent, type FinderFirstUserInteractionEvent, type FinderInitEvent, type FinderProps, type FinderReadyEvent, type FinderResultGroup, type GroupByRuleDefinition, type RuleDefinition, type RuleEffect, type SearchEffect, type SearchRuleDefinition, type SortByRuleDefinition, type SortDirection, StringMatch, type StringMatchSegmentProps, filterRule, finderRuleset, groupByRule, ruleEffect, searchEffect, searchRule, sortByRule, transformFilterToBoolean, transformFilterToMultiple, transformFilterToSingleValue, useFinder, useFinderRef };