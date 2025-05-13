import { FinderFilterRule, FinderGroupByRule, FinderSearchRule, FinderSortByRule, useFinderFactoryOptions } from "../types";

/**
 * Enforce constructor shape for a Finder Options param.
 */
export function finderOptions<FItem>(options: useFinderFactoryOptions<FItem>) {
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

export function makeRules<FItem>(rules: (FinderSearchRule<FItem> | FinderFilterRule<FItem> | FinderSortByRule<FItem> | FinderGroupByRule<FItem>)[]) {
    return rules;
}
