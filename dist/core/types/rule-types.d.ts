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
export type FinderRuleDefinition<FItem = any, FContext = any> = SearchRuleDefinition<FItem, FContext> | FilterRuleUnionDefinition<FItem, FContext> | SortByRuleDefinition<FItem, FContext> | GroupByRuleDefinition<FItem, FContext>;
export interface SearchRuleDefinition<FItem = any, FContext = any> extends Omit<RuleBase, "id"> {
    id?: string;
    searchFn?: (item: FItem, context: FContext) => string | string[];
}
/**
 * Describes the display of a filter or sort option.
 */
export interface FilterOption<FValue = any> {
    label: string;
    value: FValue;
    disabled?: boolean;
}
export interface FilterRuleDefinition<FItem = any, FValue = any, FContext = any> extends RuleBase {
    options?: FilterOption<FValue>[] | ((options: {
        items: FItem[];
        context: FContext;
    }) => FilterOption<FValue>[]);
    required?: boolean;
}
export interface FilterRuleWithBooleanValue<FItem, FContext = any> extends FilterRuleDefinition<FItem> {
    multiple?: false;
    boolean: true;
    filterFn: (item: FItem, value: boolean, context: FContext) => boolean;
    defaultValue?: boolean;
}
export interface FilterRuleWithSingleValue<FItem, FValue, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple?: false;
    boolean?: false;
    filterFn: (item: FItem, value: FValue, context: FContext) => boolean;
    defaultValue?: FValue;
}
export interface FilterRuleWithMultipleValues<FItem, FValue, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple: true;
    boolean?: false;
    filterFn: (item: FItem, value: FValue, context: FContext) => boolean;
    defaultValue?: FValue[];
}
export type FilterRuleUnionDefinition<FItem = any, FValue = any> = FilterRuleWithBooleanValue<FItem> | FilterRuleWithSingleValue<FItem, FValue> | FilterRuleWithMultipleValues<FItem, FValue>;
/**
 * A hydrated filter has rendered any option generator functions, and narrowed ambiguous properties from FilterRule.
 */
export interface HydratedFilterOptions<FValue = any> {
    options: FilterOption<FValue>[] | undefined;
}
export interface SortByRuleDefinition<FItem = any, FContext = any> extends RuleBase {
    sortFn: FinderPropertySelector<FItem, FContext> | FinderPropertySelector<FItem, FContext>[];
    defaultSortDirection?: SortDirection;
}
export interface GroupByRuleDefinition<FItem = any, FContext = any> extends RuleBase {
    groupFn: FinderPropertySelector<FItem, FContext>;
    sortGroupFn?: FinderPropertySelector<FinderResultGroup<FItem>, FContext>;
    defaultGroupSortDirection?: SortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
}
export interface SearchTestOptions {
    rule: SearchRuleDefinition[];
    searchTerm: string;
}
export interface FilterTestOptions {
    rules: FilterRuleUnionDefinition[];
    values?: Record<string, any>;
    isAdditive?: boolean;
}
export interface FilterTestRuleOptions {
    rule: string | FilterRuleUnionDefinition;
    value: any;
    isAdditive?: boolean;
}
export {};
