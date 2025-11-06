import { FinderResultGroup, SortDirection } from "./core-types";
/**
 * Select a property from the item to sort by.
 */
export type FinderPropertySelector<FItem, FContext = any> = (item: FItem, context: FContext) => string | number;
interface Rule {
    id: string;
    debounceMilliseconds?: number;
    label?: string;
    hidden?: boolean;
}
export type RuleDefinition<FItem = any, FContext = any> = SearchRuleDefinition<FItem, FContext> | FilterRuleUnionDefinition<FItem, FContext> | SortByRuleDefinition<FItem, FContext> | GroupByRuleDefinition<FItem, FContext>;
export type HydratedRuleDefinition<FItem = any, FValue = any, FContext = any> = SearchRuleDefinition<FItem, FContext> | FilterRuleUnionHydratedDefinition<FItem, FValue, FContext> | SortByRuleDefinition<FItem, FContext> | GroupByRuleDefinition<FItem, FContext>;
export interface SearchRuleDefinition<FItem = any, FContext = any> extends Omit<Rule, "id"> {
    id?: string;
    searchFn?: (item: FItem, context: FContext) => string | string[];
}
/**
 * Describes the display of a filter or sort option.
 */
export interface FilterOption<FValue = any> {
    label?: string;
    value: FValue;
    disabled?: boolean;
}
export interface FilterRuleDefinition<FItem = any, FValue = unknown, FContext = any> extends Rule {
    filterFn: (item: FItem, value: FValue, context: FContext) => boolean;
    required?: boolean;
    strictOptions?: boolean;
    multiple?: boolean;
    boolean?: boolean;
}
export interface FilterRuleWithBooleanValue<FItem = any, FValue = boolean, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple?: false;
    boolean: true;
    defaultValue?: boolean;
    options?: never;
}
export type FilterRuleWithBooleanValueAndHydratedOptions<FItem = any, FValue = unknown, FContext = any> = Omit<FilterRuleWithBooleanValue<FItem, FValue, FContext>, "options"> & HydratedFilterOptions<FValue>;
export interface FilterRuleWithSingleValue<FItem = any, FValue = unknown, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple?: false;
    boolean?: false;
    defaultValue?: FValue;
    options?: FilterOption<FValue>[] | ((options: {
        items: FItem[];
        context: FContext;
    }) => FilterOption<FValue>[]);
}
export type FilterRuleWithSingleValueAndHydratedOptions<FItem = any, FValue = unknown, FContext = any> = Omit<FilterRuleWithSingleValue<FItem, FValue, FContext>, "options"> & HydratedFilterOptions<FValue>;
export interface FilterRuleWithMultipleValues<FItem = any, FValue = unknown, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple: true;
    boolean?: false;
    defaultValue?: FValue;
    options?: FilterOption<FValue>[] | ((options: {
        items: FItem[];
        context: FContext;
    }) => FilterOption<FValue>[]);
}
export type FilterRuleWithMultipleValuesAndHydratedOptions<FItem = any, FValue = unknown, FContext = any> = Omit<FilterRuleWithMultipleValues<FItem, FValue, FContext>, "options"> & HydratedFilterOptions<FValue>;
export type FilterRuleUnionDefinition<FItem = any, FValue = any, FContext = any> = FilterRuleWithBooleanValue<FItem, FContext> | FilterRuleWithSingleValue<FItem, FValue, FContext> | FilterRuleWithMultipleValues<FItem, FValue, FContext>;
/**
 * A hydrated filter has rendered any option generator functions, and narrowed ambiguous properties from FilterRule.
 */
export type FilterRuleUnionHydratedDefinition<FItem = any, FValue = unknown, FContext = any> = FilterRuleWithBooleanValueAndHydratedOptions<FItem, FValue, FContext> | FilterRuleWithMultipleValuesAndHydratedOptions<FItem, FValue, FContext> | FilterRuleWithSingleValueAndHydratedOptions<FItem, FValue, FContext>;
export interface HydratedFilterOptions<FValue = any> {
    options?: FilterOption<FValue>[];
}
export interface SortByRuleDefinition<FItem = any, FContext = any> extends Rule {
    sortFn: FinderPropertySelector<FItem, FContext> | FinderPropertySelector<FItem, FContext>[];
    defaultSortDirection?: SortDirection;
}
export interface GroupByRuleDefinition<FItem = any, FContext = any> extends Rule {
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
    rules: FilterRuleUnionHydratedDefinition[];
    values?: Record<string, any>;
    isAdditive?: boolean;
}
export interface FilterTestRuleOptions {
    rule: string | FilterRuleUnionDefinition | FilterRuleUnionHydratedDefinition;
    value: any;
    isAdditive?: boolean;
}
export type AnyButNotArray = (object | string | bigint | number | boolean) & {
    length?: never;
};
export {};
