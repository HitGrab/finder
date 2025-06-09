import { FinderConstructorOptions, SearchRule, FilterRule, SortByRule, GroupByRule } from "../../types";

/**
 * Enforce constructor shape for a Finder Options param.
 */
export function finderOptions<FItem>(options: FinderConstructorOptions<FItem>) {
    return options;
}

/**
 * Enforce structure for an array of rule of mixed types.
 */
export function finderRuleset<FItem>(rules: (SearchRule<FItem> | FilterRule<FItem> | SortByRule<FItem> | GroupByRule<FItem>)[]) {
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
