import { FinderCore } from "../finder-core";
import { RuleEffect, SearchEffect } from "../types/effect-types";
import { FilterRuleWithBooleanValue, FilterRuleWithMultipleValues, FilterRuleWithSingleValue, FinderRule, GroupByRule, SearchRule, SortByRule } from "../types/rule-types";
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function finderRuleset<FItem>(rules: FinderRule<FItem>[]): FinderRule<FItem>[];
export declare function searchRule<FItem, FContext = any>(rule: SearchRule<FItem, FContext>): SearchRule<FItem, FContext>;
export declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithMultipleValues<FItem, FValue, FContext>>(rule: T): FilterRuleWithMultipleValues<FItem, FValue>;
export declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithBooleanValue<FItem, FContext>>(rule: T): FilterRuleWithBooleanValue<FItem, FValue>;
export declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithSingleValue<FItem, FValue, FContext>>(rule: T): FilterRuleWithSingleValue<FItem, FValue>;
export declare function sortByRule<FItem, FContext = any>(rule: SortByRule<FItem, FContext>): SortByRule<FItem, FContext>;
export declare function groupByRule<FItem, FContext = any>(rule: GroupByRule<FItem, FContext>): GroupByRule<FItem, FContext>;
export declare function ruleEffect<FItem, FContext = any>(rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[] | ((items: FItem[], context: FContext) => string | FinderRule<FItem> | (string | FinderRule<FItem>)[]), onChange: (instance: FinderCore<FItem, FContext>, rule: FinderRule) => void): RuleEffect<FItem, FContext>;
export declare function searchEffect<FItem, FContext = any>(haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]), onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void): SearchEffect<FItem, FContext>;
