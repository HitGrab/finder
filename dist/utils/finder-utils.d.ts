import { FilterRule, FinderMeta, FinderOption, FinderRule, GroupByRule, HydratedFilterRule, SearchRule, SortByRule } from "../types";
export declare function getRuleFromIdentifier<NarrowRule = FinderRule>(identifier: FinderRule | string | undefined, rules: FinderRule[]): NarrowRule | undefined;
export declare function getOptionFromIdentifier<FItem>(optionOrOptionValue: FinderOption | any, options: FinderOption[] | ((items: FItem[], meta?: FinderMeta) => FinderOption[]) | undefined, items: FItem[], meta?: FinderMeta): any;
export declare function isFinderOption(data: unknown): data is FinderOption;
export declare function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem>;
export declare function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem>;
export declare function isFilterRule<FItem>(rule: unknown): rule is FilterRule<FItem>;
export declare function isHydratedFilterRule<FItem>(rule: unknown): rule is HydratedFilterRule<FItem>;
export declare function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem>;
