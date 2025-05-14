import { FinderConstructorOptions, FinderFilterRule, FinderGroupByRule, FinderOption, FinderSearchRule, FinderSortByRule } from "../types";
/**
 * Enforce constructor shape for a Finder Options param.
 */
export declare function finderOptions<FItem>(options: FinderConstructorOptions<FItem>): FinderConstructorOptions<FItem>;
export declare function makeSearchRule<FItem>(rule: FinderSearchRule<FItem>): FinderSearchRule<FItem>;
export declare function makeFilterRule<FItem, FValue = any>(rule: FinderFilterRule<FItem, FValue>): FinderFilterRule<FItem, FValue>;
export declare function makeSortByRule<FItem>(rule: FinderSortByRule<FItem>): FinderSortByRule<FItem>;
export declare function makeGroupByRule<FItem>(rule: FinderGroupByRule<FItem>): FinderGroupByRule<FItem>;
/**
 * Enforce structure for an array of rule of mixed types.
 */
export declare function makeRules<FItem>(rules: (FinderSearchRule<FItem> | FinderFilterRule<FItem> | FinderSortByRule<FItem> | FinderGroupByRule<FItem>)[]): (FinderSearchRule<FItem> | FinderFilterRule<FItem, any> | FinderSortByRule<FItem> | FinderGroupByRule<FItem>)[];
export declare function isSortByRule<FItem>(rule: unknown): rule is FinderSortByRule<FItem>;
export declare function isSearchRule<FItem>(rule: unknown): rule is FinderSearchRule<FItem>;
export declare function isFilterRule<FItem>(rule: unknown): rule is FinderFilterRule<FItem>;
export declare function isGroupByRule<FItem>(rule: unknown): rule is FinderGroupByRule<FItem>;
export declare function isFinderOption(data: unknown): data is FinderOption;
