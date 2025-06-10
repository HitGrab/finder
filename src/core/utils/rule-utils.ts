import { FilterRule, FinderMeta, FilterOption, FinderRule, GroupByRule, HydratedFilterRule, SearchRule, SortByRule } from "../../types";

/**
 * Make sure the passed ruleset contains only well-configured rules.
 */
export function isValidRuleset(rules?: FinderRule[]): rules is FinderRule[] {
    if (!rules || rules.length === 0) {
        return false;
    }

    const filterIds: string[] = [];
    rules.forEach((rule) => {
        if (rule.id === undefined && !isSearchRule(rule)) {
            throw new Error("Finder is missing a unique rule id for rule.");
        }

        const uniqueName = [getRuleType(rule), rule.id].join(".");
        if (filterIds.includes(uniqueName)) {
            throw new Error(`Duplicate rule id: ${uniqueName}`);
        }
        filterIds.push(uniqueName);
    });

    return true;
}

export function getRuleFromIdentifier<T extends FinderRule>(identifier: T | string | undefined, rules: T[]): T | undefined {
    if (identifier === undefined) {
        return undefined;
    }

    if (typeof identifier === "object") {
        const rule = rules?.find(({ id }) => id === identifier.id);
        if (rule === undefined) {
            throw new Error(`Finder could not locate the rule for ${identifier.id}.`);
        }
        return rule as T;
    }
    if (typeof identifier === "string") {
        const rule = rules?.find(({ id }) => id === identifier);
        if (rule === undefined) {
            throw new Error(`Finder could not locate the rule for ${identifier}.`);
        }
        return rule as T;
    }

    throw new Error("Finder received an invalid rule request format.");
}

export function getFilterOptionFromIdentifier<FItem>(
    optionOrOptionValue: FilterOption | any,
    options: FilterOption[] | ((items: FItem[], meta?: FinderMeta) => FilterOption[]) | undefined,
    items: FItem[],
    meta?: FinderMeta,
) {
    let option: FilterOption | any;

    let composedOptions: FilterOption[] = [];
    if (typeof options === "function") {
        composedOptions = options(items, meta);
    }
    if (Array.isArray(options)) {
        composedOptions = options;
    }

    if (isFilterOption(optionOrOptionValue)) {
        option = composedOptions?.find((row) => row === optionOrOptionValue);
        if (option === undefined) {
            throw new Error(`Finder could not locate the option for ${optionOrOptionValue}.`);
        }
        return option;
    }

    option = composedOptions?.find(({ value }) => value === optionOrOptionValue);
    if (option === undefined) {
        throw new Error(`Finder could not locate the option for ${optionOrOptionValue}.`);
    }
    return option;
}

export function isFilterOption(data: unknown): data is FilterOption {
    return typeof data === "object" && data !== null && "label" in data && "value" in data;
}

export function getRuleType(rule: FinderRule) {
    if (isSearchRule(rule)) {
        return "search";
    }
    if (isFilterRule(rule)) {
        return "filter";
    }
    if (isSortByRule(rule)) {
        return "sortBy";
    }
    if (isGroupByRule(rule)) {
        return "groupBy";
    }
    throw new Error("Finder received an invalid rule.");
}

export function isSortByRule<FItem>(rule: unknown): rule is SortByRule<FItem> {
    return typeof rule === "object" && rule !== null && "sortFn" in rule;
}

export function isSearchRule<FItem>(rule: unknown): rule is SearchRule<FItem> {
    return typeof rule === "object" && rule !== null && "searchFn" in rule;
}

export function isFilterRule<FItem>(rule: unknown): rule is FilterRule<FItem> {
    return typeof rule === "object" && rule !== null && "filterFn" in rule;
}
export function isHydratedFilterRule<FItem>(rule: unknown): rule is HydratedFilterRule<FItem> {
    return isFilterRule(rule) && rule._isHydrated === true;
}

export function isGroupByRule<FItem>(rule: unknown): rule is GroupByRule<FItem> {
    return typeof rule === "object" && rule !== null && "groupFn" in rule;
}
