import { FinderConstructorOptions, SearchRule, FilterRule, SortByRule, GroupByRule } from "../../types";

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
