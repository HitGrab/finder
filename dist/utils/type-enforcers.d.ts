import { FinderConstructorOptions, FilterRule, GroupByRule, SearchRule, SortByRule } from "../types";
/**
 * Enforce constructor shape for a Finder Options param.
 */
export declare function finderOptions<FItem>(options: FinderConstructorOptions<FItem>): FinderConstructorOptions<FItem>;
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function finderRules<FItem>(rules: (SearchRule<FItem> | FilterRule<FItem> | SortByRule<FItem> | GroupByRule<FItem>)[]): (SearchRule<FItem> | FilterRule<FItem, any> | SortByRule<FItem> | GroupByRule<FItem>)[];
export declare function searchRule<FItem>(rule: SearchRule<FItem>): SearchRule<FItem>;
export declare function filterRule<FItem, FValue = any>(rule: FilterRule<FItem, FValue>): FilterRule<FItem, FValue>;
export declare function sortByRule<FItem>(rule: SortByRule<FItem>): SortByRule<FItem>;
export declare function groupByRule<FItem>(rule: GroupByRule<FItem>): GroupByRule<FItem>;
export declare function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem>;
export declare function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem>;
export declare function isFilterRule<FItem>(rule: unknown): rule is FilterRule<FItem>;
export declare function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem>;
