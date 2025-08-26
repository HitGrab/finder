import { SearchRule, SortByRule, GroupByRule, FilterRuleUnion, FinderRule } from "../../types";
import { FinderCore } from "../finder-core";

/**
 * Enforce structure for an array of rule of mixed types.
 */
export function finderRuleset<FItem>(rules: FinderRule<FItem>[]) {
    return rules;
}

export function searchRule<FItem>(rule: SearchRule<FItem>) {
    return rule;
}

export function filterRule<FItem, FValue = any>(rule: FilterRuleUnion<FItem, FValue>) {
    return rule;
}

export function sortByRule<FItem>(rule: SortByRule<FItem>) {
    return rule;
}

export function groupByRule<FItem>(rule: GroupByRule<FItem>) {
    return rule;
}

export function ruleHook<FItem, FContext = any>(
    rules: string | FinderRule<FItem> | (string | FinderRule<FItem>)[],
    onChange: (instance: FinderCore<FItem, FContext>) => void,
) {
    return {
        rules,
        onChange,
    };
}
