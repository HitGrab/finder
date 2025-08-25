import { SearchRule, SortByRule, GroupByRule, FilterRuleUnion } from "../../types";
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function finderRuleset<FItem>(rules: (SearchRule<FItem> | FilterRuleUnion<FItem, any> | SortByRule<FItem> | GroupByRule<FItem>)[]): (SearchRule<FItem> | FilterRuleUnion<FItem, any> | SortByRule<FItem, any> | GroupByRule<FItem, any>)[];
export declare function searchRule<FItem>(rule: SearchRule<FItem>): SearchRule<FItem>;
export declare function filterRule<FItem, FValue = any>(rule: FilterRuleUnion<FItem, FValue>): FilterRuleUnion<FItem, FValue>;
export declare function sortByRule<FItem>(rule: SortByRule<FItem>): SortByRule<FItem, any>;
export declare function groupByRule<FItem>(rule: GroupByRule<FItem>): GroupByRule<FItem, any>;
