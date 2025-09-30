/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { FinderCore } from "../finder-core";
import { RuleEffect, SearchEffect } from "../types/effect-types";
import {
    FilterRuleWithBooleanValue,
    FilterRuleWithMultipleValues,
    FilterRuleWithSingleValue,
    FinderRule,
    GroupByRule,
    SearchRule,
    SortByRule,
} from "../types/rule-types";

/**
 * Enforce structure for an array of rule of mixed types.
 */
export function finderRuleset<FItem>(rules: FinderRule<FItem>[]) {
    return rules;
}

export function searchRule<FItem>(rule: SearchRule<FItem>) {
    return rule;
}

export function filterRule<FItem, FValue = any, T = FilterRuleWithMultipleValues<FItem, FValue>>(rule: T): FilterRuleWithMultipleValues<FItem, FValue>;
export function filterRule<FItem, FValue = any, T = FilterRuleWithBooleanValue<FItem, FValue>>(rule: T): FilterRuleWithBooleanValue<FItem, FValue>;
export function filterRule<FItem, FValue = any, T = FilterRuleWithSingleValue<FItem, FValue>>(rule: T): FilterRuleWithSingleValue<FItem, FValue>;
export function filterRule<
    FItem,
    FValue = any,
    T = FilterRuleWithSingleValue<FItem, FValue> | FilterRuleWithMultipleValues<FItem, FValue> | FilterRuleWithBooleanValue<FItem, FValue>,
>(rule: T) {
    return rule;
}

export function sortByRule<FItem>(rule: SortByRule<FItem>) {
    return rule;
}

export function groupByRule<FItem>(rule: GroupByRule<FItem>) {
    return rule;
}

export function ruleEffect<FItem, FContext = any>(
    rules:
        | string
        | FinderRule<FItem>
        | (string | FinderRule<FItem>)[]
        | ((items: FItem[], context: FContext) => string | FinderRule<FItem> | (string | FinderRule<FItem>)[]),
    onChange: (instance: FinderCore<FItem, FContext>) => void,
): RuleEffect<FItem, FContext> {
    return { rules, onChange };
}

export function searchEffect<FItem, FContext = any>(
    haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]),
    onChange: (instance: FinderCore<FItem, FContext>) => void,
): SearchEffect<FItem, FContext> {
    return { haystack, onChange };
}
