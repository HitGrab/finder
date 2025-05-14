import { FinderConstructorOptions, FinderFilterRule, FinderGroupByRule, FinderOption, FinderSearchRule, FinderSortByRule } from "../types";

/**
 * Enforce constructor shape for a Finder Options param.
 */
export function finderOptions<FItem>(options: FinderConstructorOptions<FItem>) {
    return options;
}

export function makeSearchRule<FItem>(rule: FinderSearchRule<FItem>) {
    return rule;
}

export function makeFilterRule<FItem, FValue = any>(rule: FinderFilterRule<FItem, FValue>) {
    return rule;
}

export function makeSortByRule<FItem>(rule: FinderSortByRule<FItem>) {
    return rule;
}

export function makeGroupByRule<FItem>(rule: FinderGroupByRule<FItem>) {
    return rule;
}

/**
 * Enforce structure for an array of rule of mixed types.
 */
export function makeRules<FItem>(rules: (FinderSearchRule<FItem> | FinderFilterRule<FItem> | FinderSortByRule<FItem> | FinderGroupByRule<FItem>)[]) {
    return rules;
}

export function isSortByRule<FItem>(rule: unknown): rule is FinderSortByRule<FItem> {
    return typeof rule === "object" && rule !== null && "sortFn" in rule;
}

export function isSearchRule<FItem>(rule: unknown): rule is FinderSearchRule<FItem> {
    return typeof rule === "object" && rule !== null && "searchFn" in rule;
}

export function isFilterRule<FItem>(rule: unknown): rule is FinderFilterRule<FItem> {
    return typeof rule === "object" && rule !== null && "filterFn" in rule;
}

export function isGroupByRule<FItem>(rule: unknown): rule is FinderGroupByRule<FItem> {
    return typeof rule === "object" && rule !== null && "groupFn" in rule;
}

export function isFinderOption(data: unknown): data is FinderOption {
    return typeof data === "object" && data !== null && "label" in data && "value" in data;
}
