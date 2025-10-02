import { FinderCore } from "../finder-core";
import { RuleEffect, SearchEffect } from "../types/effect-types";
import { FilterRuleWithBooleanValue, FilterRuleWithMultipleValues, FilterRuleWithSingleValue, FinderRule, GroupByRule, SearchRule, SortByRule } from "../types/rule-types";
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function finderRuleset<FItem>(rules: FinderRule<FItem>[]): FinderRule<FItem>[];
export declare function searchRule<FItem>(rule: SearchRule<FItem>): SearchRule<FItem, any>;
export declare function filterRule<FItem, FValue = any, T = FilterRuleWithMultipleValues<FItem, FValue>>(rule: T): FilterRuleWithMultipleValues<FItem, FValue>;
export declare function filterRule<FItem, FValue = any, T = FilterRuleWithBooleanValue<FItem, FValue>>(rule: T): FilterRuleWithBooleanValue<FItem, FValue>;
export declare function filterRule<FItem, FValue = any, T = FilterRuleWithSingleValue<FItem, FValue>>(rule: T): FilterRuleWithSingleValue<FItem, FValue>;
export declare function sortByRule<FItem>(rule: SortByRule<FItem>): SortByRule<FItem, any>;
export declare function groupByRule<FItem>(rule: GroupByRule<FItem>): GroupByRule<FItem, any>;
export declare function ruleEffect<FItem, FContext = any>(rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[] | ((items: FItem[], context: FContext) => string | FinderRule<FItem> | (string | FinderRule<FItem>)[]), onChange: (instance: FinderCore<FItem, FContext>, rule: FinderRule) => void): RuleEffect<FItem, FContext>;
export declare function searchEffect<FItem, FContext = any>(haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]), onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void): SearchEffect<FItem, FContext>;
