import { RuleEffect, SearchEffect } from "../types/effect-types";
import { FilterRuleUnion, GroupByRule, HydratedFilterRule, SearchRule, SortByRule } from "../types/rule-types";
export declare function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem>;
export declare function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem>;
export declare function isFilterUnionRule<FItem>(rule: unknown): rule is FilterRuleUnion<FItem>;
export declare function isHydratedFilterRule<FItem>(rule: unknown): rule is HydratedFilterRule<FItem>;
export declare function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem>;
export declare function isRuleEffect<FItem>(data: unknown): data is RuleEffect<FItem>;
export declare function isSearchEffect<FItem>(data: unknown): data is SearchEffect<FItem>;
