import { FinderCore } from "../finder-core";
import { RuleEffect, SearchEffect } from "../types/effect-types";
import { FilterRuleUnion, FinderRule, GroupByRule, SearchRule, SortByRule } from "../types/rule-types";
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function finderRuleset<FItem>(rules: FinderRule<FItem>[]): FinderRule<FItem>[];
export declare function searchRule<FItem>(rule: SearchRule<FItem>): SearchRule<FItem, any>;
export declare function filterRule<FItem, FValue = any>(rule: FilterRuleUnion<FItem, FValue>): FilterRuleUnion<FItem, FValue>;
export declare function sortByRule<FItem>(rule: SortByRule<FItem>): SortByRule<FItem, any>;
export declare function groupByRule<FItem>(rule: GroupByRule<FItem>): GroupByRule<FItem, any>;
export declare function ruleEffect<FItem, FContext = any>(rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[] | ((items: FItem[], context: FContext) => string | FinderRule<FItem> | (string | FinderRule<FItem>)[]), onChange: (instance: FinderCore<FItem, FContext>) => void): RuleEffect<FItem, FContext>;
export declare function searchEffect<FItem, FContext = any>(haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]), onChange: (instance: FinderCore<FItem, FContext>) => void): SearchEffect<FItem, FContext>;
