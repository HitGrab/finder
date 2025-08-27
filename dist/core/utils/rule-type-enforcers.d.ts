import { SearchRule, SortByRule, GroupByRule, FilterRuleUnion, FinderRule } from "../../types";
import { FinderCore } from "../finder-core";
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function finderRuleset<FItem>(rules: FinderRule<FItem>[]): FinderRule<FItem>[];
export declare function searchRule<FItem>(rule: SearchRule<FItem>): SearchRule<FItem, any>;
export declare function filterRule<FItem, FValue = any>(rule: FilterRuleUnion<FItem, FValue>): FilterRuleUnion<FItem, FValue>;
export declare function sortByRule<FItem>(rule: SortByRule<FItem>): SortByRule<FItem, any>;
export declare function groupByRule<FItem>(rule: GroupByRule<FItem>): GroupByRule<FItem, any>;
export declare function ruleEffect<FItem, FContext = any>(rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[], onChange: (instance: FinderCore<FItem, FContext>) => void): {
    rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[];
    onChange: (instance: FinderCore<FItem, FContext>) => void;
};
