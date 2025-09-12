import { RuleEffect, SearchEffect } from "../types/effect-types";
import { FilterRuleUnion, GroupByRule, HydratedFilterRule, SearchRule, SortByRule } from "../types/rule-types";

export function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem> {
    return typeof rule === "object" && rule !== null && "sortFn" in rule;
}

export function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem> {
    return typeof rule === "object" && rule !== null && ("searchFn" in rule || "haystackFn" in rule);
}

export function isFilterUnionRule<FItem>(rule: unknown): rule is FilterRuleUnion<FItem> {
    return typeof rule === "object" && rule !== null && "filterFn" in rule;
}
export function isHydratedFilterRule<FItem>(rule: unknown): rule is HydratedFilterRule<FItem> {
    return typeof rule === "object" && rule !== null && "filterFn" in rule && "_isHydrated" in rule;
}

export function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem> {
    return typeof rule === "object" && rule !== null && "groupFn" in rule;
}

export function isRuleEffect<FItem>(data: unknown): data is RuleEffect<FItem> {
    return typeof data === "object" && data !== null && ("rules" in data || "callback" in data);
}

export function isSearchEffect<FItem>(data: unknown): data is SearchEffect<FItem> {
    return typeof data === "object" && data !== null && ("haystack" in data || "callback" in data);
}
