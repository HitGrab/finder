import { FilterOption, FinderRule, GroupByRule, HydratedFilterRule, SearchRule, SortByRule, MetaInterface, FilterRuleUnion } from "../../types";
/**
 * Make sure the passed ruleset contains only well-configured rules.
 */
export declare function isValidRuleset(rules?: FinderRule[]): rules is FinderRule[];
export declare function getRuleFromIdentifier<T extends FinderRule>(identifier: FinderRule | string | undefined, rules: T[]): T | undefined;
export declare function getFilterOptionFromIdentifier<FItem>(optionOrOptionValue: FilterOption | any, options: FilterOption[] | ((items: FItem[], meta: MetaInterface) => FilterOption[]) | undefined, items: FItem[], meta: MetaInterface): any;
export declare function isFilterOption(data: unknown): data is FilterOption;
export declare function getRuleType(rule: FinderRule): "search" | "filter" | "sortBy" | "groupBy";
export declare function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem>;
export declare function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem>;
export declare function isFilterUnionRule<FItem>(rule: unknown): rule is FilterRuleUnion<FItem>;
export declare function isHydratedFilterRule<FItem>(rule: unknown): rule is HydratedFilterRule<FItem>;
export declare function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem>;
