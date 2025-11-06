import { RuleEffect, SearchEffect } from "../types/effect-types";
import {
    FilterRuleWithBooleanValue,
    FilterRuleWithMultipleValues,
    FilterRuleWithSingleValue,
    GroupByRuleDefinition,
    HydratedFilterRuleDefinition,
    SearchRuleDefinition,
    SortByRuleDefinition,
} from "../types/rule-types";

type FilterRuleUnion<FItem> = FilterRuleWithSingleValue<FItem> | FilterRuleWithMultipleValues<FItem> | FilterRuleWithBooleanValue<FItem>;

export function isSortByRuleDefinition<FItem>(rule: unknown): rule is SortByRuleDefinition<FItem> {
    return typeof rule === "object" && rule !== null && "sortFn" in rule;
}

export function isSearchRuleDefinition<FItem>(rule: unknown): rule is SearchRuleDefinition<FItem> {
    return typeof rule === "object" && rule !== null && "searchFn" in rule;
}

export function isFilterRuleDefinition<FItem>(rule: unknown): rule is FilterRuleUnion<FItem> {
    return typeof rule === "object" && rule !== null && "filterFn" in rule;
}

export function isFilterRuleDefinitionWithHydratedOptions(rule: unknown): rule is HydratedFilterRuleDefinition {
    return isFilterRuleDefinition(rule) && typeof rule.options !== "function";
}

export function isGroupByRuleDefinition<FItem>(rule: unknown): rule is GroupByRuleDefinition<FItem> {
    return typeof rule === "object" && rule !== null && "groupFn" in rule;
}

export function isRuleEffectDefinition<FItem>(data: unknown): data is RuleEffect<FItem> {
    return typeof data === "object" && data !== null && ("rules" in data || "callback" in data);
}

export function isSearchEffectDefinition<FItem>(data: unknown): data is SearchEffect<FItem> {
    return typeof data === "object" && data !== null && ("haystack" in data || "callback" in data);
}

export function isBooleanFilterRuleDefinition<FItem>(rule: unknown): rule is FilterRuleWithBooleanValue<FItem> {
    return isFilterRuleDefinition(rule) && rule.boolean === true;
}
export function isMultipleValueFilterRuleDefinition<FItem>(rule: unknown): rule is FilterRuleWithMultipleValues<FItem> {
    return isFilterRuleDefinition(rule) && rule.multiple === true;
}

export function isSingleValueFilterRuleDefinition<FItem>(rule: unknown): rule is FilterRuleWithSingleValue<FItem> {
    return isFilterRuleDefinition(rule) && rule.multiple !== true && rule.boolean !== true;
}
