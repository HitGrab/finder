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
export type RuleDefinition<FItem = any, FContext = any> = SearchRuleDefinition<FItem, FContext> | FilterRuleDefinition<FItem, FContext> | SortByRuleDefinition<FItem, FContext> | GroupByRuleDefinition<FItem, FContext>;
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
export interface FilterRuleDefinition<FItem = any, FValue = any, FContext = any> extends Rule {
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
export type AnyFilterRuleDefinition<FItem = any, FValue = any> = Omit<FilterRuleDefinition<FItem, FValue>, "options">;
export interface FilterRuleWithBooleanValue<FItem = any, FValue = boolean, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple?: false;
    boolean: true;
    defaultValue?: boolean;
    options?: never;
}
export interface FilterRuleWithSingleValue<FItem = any, FValue = any, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple?: false;
    boolean?: false;
    defaultValue?: FValue;
}
export interface FilterRuleWithMultipleValues<FItem = any, FValue = any, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    multiple: true;
    boolean?: false;
    defaultValue?: FValue[];
}
/**
 * A hydrated filter has rendered any option generator functions, and narrowed ambiguous properties from FilterRule.
 */
export interface HydratedFilterRuleDefinition<FItem = any, FValue = any, FContext = any> extends FilterRuleDefinition<FItem, FValue, FContext> {
    options?: FilterOption<FValue>[];
    multiple: boolean;
    boolean: boolean;
    _isHydrated: true;
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
    rules: HydratedFilterRuleDefinition[];
    values?: Record<string, any>;
    isAdditive?: boolean;
}
export interface FilterTestRuleOptions {
    rule: string | AnyFilterRuleDefinition;
    value: any;
    isAdditive?: boolean;
}
export {};
