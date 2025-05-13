import { FinderConstructorOptions, FinderFilterRule, FinderGroupByRule, FinderSearchRule, FinderSortByRule } from "../types";

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
