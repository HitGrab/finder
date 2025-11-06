import { FinderCore } from "../finder-core";
import { RuleEffect, SearchEffect } from "../types/effect-types";
import { FilterRuleUnionDefinition, FilterRuleWithBooleanValue, FilterRuleWithMultipleValues, FilterRuleWithSingleValue, FinderRuleDefinition, GroupByRuleDefinition, SearchRuleDefinition, SortByRuleDefinition } from "../types/rule-types";
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function finderRuleset<FItem, FContext = any>(rules: FinderRuleDefinition<FItem, FContext>[]): FinderRuleDefinition<FItem, FContext>[];
export declare function searchRule<FItem, FContext = any>(rule: SearchRuleDefinition<FItem, FContext>): SearchRuleDefinition<FItem, FContext>;
export declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithMultipleValues<FItem, FValue, FContext>>(rule: T): FilterRuleWithMultipleValues<FItem, FValue>;
export declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithBooleanValue<FItem, FContext>>(rule: T): FilterRuleWithBooleanValue<FItem, FValue>;
export declare function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithSingleValue<FItem, FValue, FContext>>(rule: T): FilterRuleWithSingleValue<FItem, FValue>;
export declare function sortByRule<FItem, FContext = any>(rule: SortByRuleDefinition<FItem, FContext>): SortByRuleDefinition<FItem, FContext>;
export declare function groupByRule<FItem, FContext = any>(rule: GroupByRuleDefinition<FItem, FContext>): GroupByRuleDefinition<FItem, FContext>;
export declare function ruleEffect<FItem, FContext = any>(rules: string | FinderRuleDefinition<FItem> | (string | FinderRuleDefinition<FItem>)[] | ((items: FItem[], context: FContext) => string | FinderRuleDefinition<FItem> | (string | FinderRuleDefinition<FItem>)[]), onChange: (instance: FinderCore<FItem, FContext>, rule: FinderRuleDefinition) => void): RuleEffect<FItem, FContext>;
export declare function searchEffect<FItem, FContext = any>(haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]), onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void): SearchEffect<FItem, FContext>;
export declare function transformFilterToSingleValue<FItem, FContext = any>(filter: FilterRuleUnionDefinition<FItem, FContext>): FilterRuleWithMultipleValues<FItem, FContext>;
export declare function transformFilterToBoolean<FItem, FContext = any>(filter: FilterRuleUnionDefinition<FItem, FContext>): FilterRuleWithBooleanValue<FItem, FContext>;
export declare function transformFilterToMultiple<FItem, FContext = any>(filter: FilterRuleUnionDefinition<FItem, FContext>): FilterRuleWithMultipleValues<FItem, FContext>;
