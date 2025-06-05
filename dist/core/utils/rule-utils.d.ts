import { FilterRule, FinderMeta, FinderOption, FinderRule, GroupByRule, HydratedFilterRule, SearchRule, SortByRule } from "../../types";
/**
 * Make sure the passed ruleset contains only well-configured rules.
 */
export declare function isValidRuleset(rules?: FinderRule[]): rules is FinderRule[];
export declare function getRuleFromIdentifier<T extends FinderRule>(identifier: T | string | undefined, rules: T[]): T | undefined;
export declare function getOptionFromIdentifier<FItem>(optionOrOptionValue: FinderOption | any, options: FinderOption[] | ((items: FItem[], meta?: FinderMeta) => FinderOption[]) | undefined, items: FItem[], meta?: FinderMeta): any;
export declare function isFinderOption(data: unknown): data is FinderOption;
export declare function getRuleType(rule: FinderRule): "search" | "filter" | "sortBy" | "groupBy";
export declare function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem>;
export declare function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem>;
export declare function isFilterRule<FItem>(rule: unknown): rule is FilterRule<FItem>;
export declare function isHydratedFilterRule<FItem>(rule: unknown): rule is HydratedFilterRule<FItem>;
export declare function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem>;
