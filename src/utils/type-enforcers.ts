import { FinderConstructorOptions, FilterRule, GroupByRule, FinderOption, SearchRule, SortByRule } from "../types";

/**
 * Enforce constructor shape for a Finder Options param.
 */
export function finderOptions<FItem>(options: FinderConstructorOptions<FItem>) {
    return options;
}

/**
 * Enforce structure for an array of rule of mixed types.
 */
export function finderRules<FItem>(rules: (SearchRule<FItem> | FilterRule<FItem> | SortByRule<FItem> | GroupByRule<FItem>)[]) {
    return rules;
}

export function searchRule<FItem>(rule: SearchRule<FItem>) {
    return rule;
}

export function filterRule<FItem, FValue = any>(rule: FilterRule<FItem, FValue>) {
    return rule;
}

export function sortByRule<FItem>(rule: SortByRule<FItem>) {
    return rule;
}

export function groupByRule<FItem>(rule: GroupByRule<FItem>) {
    return rule;
}

export function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem> {
    return typeof rule === "object" && rule !== null && "sortFn" in rule;
}

export function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem> {
    return typeof rule === "object" && rule !== null && "searchFn" in rule;
}

export function isFilterRule<FItem>(rule: unknown): rule is FilterRule<FItem> {
    return typeof rule === "object" && rule !== null && "filterFn" in rule;
}

export function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem> {
    return typeof rule === "object" && rule !== null && "groupFn" in rule;
}
