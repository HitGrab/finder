import { FinderResultGroup, SortDirection } from "./core-types";
/**
 * Select a property from the item to sort by.
 */
export type FinderPropertySelector<FItem, FContext = any> = (item: FItem, context: FContext) => string | number;
interface RuleBase {
    id: string;
    debounceMilliseconds?: number;
    label?: string;
    hidden?: boolean;
}
export type FinderRule<FItem = any, FContext = any> = SearchRule<FItem, FContext> | FilterRuleUnion<FItem, FContext> | HydratedFilterRule<FItem, FContext> | SortByRule<FItem, FContext> | GroupByRule<FItem, FContext>;
export type HydratedFinderRule<FItem = any, FContext = any> = SearchRule<FItem, FContext> | HydratedFilterRule<FItem, FContext> | SortByRule<FItem, FContext> | GroupByRule<FItem, FContext>;
export interface SearchRule<FItem = any, FContext = any> extends Omit<RuleBase, "id"> {
    id?: string;
    searchFn?: (item: FItem, context: FContext) => string | string[];
}
export interface FilterOptionGeneratorFnOptions<FItem, FContext = any> {
    items: FItem[];
    context: FContext;
}
/**
 * Describes the display of a filter or sort option.
 */
export interface FilterOption<FValue = any> {
    label: string;
    value: FValue;
    disabled?: boolean;
}
export interface FilterRule<FItem = any, FValue = any, FContext = any> extends RuleBase {
    options?: FilterOption<FValue>[] | ((options: FilterOptionGeneratorFnOptions<FItem, FContext>) => FilterOption<FValue>[]);
    required?: boolean;
}
export interface FilterRuleWithBooleanValue<FItem, FContext = any> extends FilterRule<FItem> {
    multiple?: false;
    boolean: true;
    filterFn: (item: FItem, value: boolean, context: FContext) => boolean;
    defaultValue?: boolean;
}
export interface FilterRuleWithSingleValue<FItem, FValue, FContext = any> extends FilterRule<FItem, FValue, FContext> {
    multiple?: false;
    boolean?: false;
    filterFn: (item: FItem, value: FValue, context: FContext) => boolean;
    defaultValue?: FValue;
}
export interface FilterRuleWithMultipleValues<FItem, FValue, FContext = any> extends FilterRule<FItem, FValue, FContext> {
    multiple: true;
    boolean?: false;
    filterFn: (item: FItem, value: FValue[], context: FContext) => boolean;
    defaultValue?: FValue[];
}
export type FilterRuleUnion<FItem = any, FValue = any> = FilterRuleWithBooleanValue<FItem> | FilterRuleWithSingleValue<FItem, FValue> | FilterRuleWithMultipleValues<FItem, FValue>;
/**
 * A hydrated filter has rendered any option generator functions, and narrowed ambiguous properties from FilterRule.
 */
export interface HydratedFilterRule<FItem = any, FValue = any, FContext = any> extends Omit<FilterRule<FItem, FValue>, "options"> {
    options?: FilterOption<FValue>[];
    required: boolean;
    boolean: boolean;
    hidden: boolean;
    multiple: boolean;
    filterFn: ((item: FItem, value: FValue, context: FContext) => boolean) | ((item: FItem, value: FValue[], context: FContext) => boolean);
    defaultValue?: boolean | FValue | FValue[];
    _isHydrated: true;
}
export interface SortByRule<FItem = any, FContext = any> extends RuleBase {
    sortFn: FinderPropertySelector<FItem, FContext> | FinderPropertySelector<FItem, FContext>[];
    defaultSortDirection?: SortDirection;
}
export interface GroupByRule<FItem = any, FContext = any> extends RuleBase {
    groupFn: FinderPropertySelector<FItem, FContext>;
    sortGroupFn?: FinderPropertySelector<FinderResultGroup<FItem>, FContext>;
    defaultGroupSortDirection?: SortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
}
export interface SearchTestOptions {
    rule: SearchRule[];
    searchTerm: string;
}
export interface FilterTestOptions {
    rules: HydratedFilterRule[];
    values?: Record<string, any>;
    isAdditive?: boolean;
}
export interface FilterTestRuleOptions {
    rule: string | FilterRuleUnion | HydratedFilterRule;
    value: any;
    isAdditive?: boolean;
}
export {};
