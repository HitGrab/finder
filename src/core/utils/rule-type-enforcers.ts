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
export function finderRuleset<FItem, FContext = any>(rules: FinderRule<FItem, FContext>[]) {
    return rules;
}

export function searchRule<FItem, FContext = any>(rule: SearchRule<FItem, FContext>) {
    return rule;
}

export function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithMultipleValues<FItem, FValue, FContext>>(
    rule: T,
): FilterRuleWithMultipleValues<FItem, FValue>;
export function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithBooleanValue<FItem, FContext>>(
    rule: T,
): FilterRuleWithBooleanValue<FItem, FValue>;
export function filterRule<FItem, FValue = any, FContext = any, T = FilterRuleWithSingleValue<FItem, FValue, FContext>>(
    rule: T,
): FilterRuleWithSingleValue<FItem, FValue>;
export function filterRule<
    FItem,
    FValue = any,
    FContext = any,
    T =
        | FilterRuleWithSingleValue<FItem, FValue, FContext>
        | FilterRuleWithMultipleValues<FItem, FValue, FContext>
        | FilterRuleWithBooleanValue<FItem, FContext>,
>(rule: T) {
    return rule;
}

export function sortByRule<FItem, FContext = any>(rule: SortByRule<FItem, FContext>) {
    return rule;
}

export function groupByRule<FItem, FContext = any>(rule: GroupByRule<FItem, FContext>) {
    return rule;
}

export function ruleEffect<FItem, FContext = any>(
    rules:
        | string
        | FinderRule<FItem>
        | (string | FinderRule<FItem>)[]
        | ((items: FItem[], context: FContext) => string | FinderRule<FItem> | (string | FinderRule<FItem>)[]),
    onChange: (instance: FinderCore<FItem, FContext>, rule: FinderRule) => void,
): RuleEffect<FItem, FContext> {
    return { rules, onChange };
}

export function searchEffect<FItem, FContext = any>(
    haystack: string | string[] | ((items: FItem[], context: FContext) => string | string[]),
    onChange: (instance: FinderCore<FItem, FContext>, searchTerm: string) => void,
): SearchEffect<FItem, FContext> {
    return { haystack, onChange };
}
