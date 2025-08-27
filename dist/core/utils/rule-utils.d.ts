import { FilterOption, GroupByRule, HydratedFilterRule, SearchRule, SortByRule, FilterRuleUnion } from "../../types";
export declare function getFilterOptionFromIdentifier<FItem, FContext>(optionOrOptionValue: FilterOption | any, options: FilterOption[] | ((items: FItem[], context?: FContext) => FilterOption[]) | undefined, items: FItem[], context?: FContext): any;
export declare function isFilterOption(data: unknown): data is FilterOption;
export declare function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem>;
export declare function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem>;
export declare function isFilterUnionRule<FItem>(rule: unknown): rule is FilterRuleUnion<FItem>;
export declare function isHydratedFilterRule<FItem>(rule: unknown): rule is HydratedFilterRule<FItem>;
export declare function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem>;
export declare function isLinkedRuleBundle<FItem>(rule: unknown): rule is SearchRule<FItem>;
