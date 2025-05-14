import { FinderInjectedHandlers, FinderFilterRule, FinderOption, FinderMeta } from "../../types";
import { DebounceCallbackRegistry } from "../../utils/debounce-callback-registry";
import { getRuleFromIdentifier, getOptionFromIdentifier } from "../../utils/finder-utils";
import { isFilterRule } from "../../utils/type-enforcers";

class FiltersMixin<FItem> {
    filters: Record<string, any>;

    #handlers: FinderInjectedHandlers<FItem>;

    #debouncer = new DebounceCallbackRegistry();

    constructor(initialFilters: Record<string, any> | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.filters = initialFilters || {};
        this.#handlers = handlers;
    }

    set(identifier: FinderFilterRule | string, incomingFilterValue: any) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        if (this.#debouncer.has(rule.id) === false) {
            this.#debouncer.register(rule.id, rule?.debounceDelay);
        }

        this.#debouncer.call(rule.id, () => {
            if (this.#handlers.isDisabled()) {
                return;
            }
            this.#handlers.onInit();

            // early exit if nothing changed
            if (this.filters?.[rule.id] !== undefined && this.filters[rule.id] === incomingFilterValue) {
                return;
            }

            this.filters = { ...this.filters, [rule.id]: incomingFilterValue };
            this.#handlers.onChange({ filters: this.filters });
        });
    }

    get rules() {
        return this.#handlers.getRules().filter(isFilterRule);
    }

    get(identifier: FinderFilterRule | string) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        return this.filters?.[rule.id];
    }

    test(identifier: FinderFilterRule | string, filterValue: any, incomingMeta = this.#handlers.getMeta()) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const items = this.#handlers.getItems();
        return FiltersMixin.process(items, [rule], { [rule.id]: filterValue }, incomingMeta);
    }

    testOptions(identifier: FinderFilterRule | string, incomingMeta = this.#handlers.getMeta()) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const items = this.#handlers.getItems();

        if (rule.is_boolean === true) {
            const resultMap = new Map<FinderOption | boolean, FItem[]>();
            resultMap.set(true, FiltersMixin.process(items, [rule], { [rule.id]: true }, incomingMeta));
            resultMap.set(false, FiltersMixin.process(items, [rule], { [rule.id]: false }, incomingMeta));
            return resultMap;
        }

        if (Array.isArray(rule.options)) {
            const resultMap = new Map<FinderOption | boolean, FItem[]>();
            rule.options.forEach((option) => {
                resultMap.set(option, FiltersMixin.process(items, [rule], { [rule.id]: option.value }, incomingMeta));
            });
            return resultMap;
        }

        // if the filter is not a boolean and doesn't have defined options, there's nothing to test.
        throw new Error("Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.");
    }

    process(items: FItem[], meta?: FinderMeta) {
        return FiltersMixin.process(items, this.rules, this.filters, meta);
    }

    static process<FItem>(items: FItem[], rules: FinderFilterRule[], values: Record<string, any>, meta?: FinderMeta) {
        const activeFilters = composeActiveFilterRules(rules, values);
        return items.filter((item) => {
            // An item must pass ALL filters to match.
            return activeFilters.every((rule) => {
                const filterValue = values?.[rule.id];

                if (rule.required && filterValue === undefined) {
                    const firstOption = Array.isArray(rule.options) && rule.options.at(0);
                    if (firstOption) {
                        return rule.filterFn(item, firstOption.value, meta);
                    }
                }

                return rule.filterFn(item, filterValue, meta);
            });
        });
    }
}

/**
 * Filters are static arrays, and may not all be active.
 * This method identifies which filters have matching filterValues that make them relevant.
 */
export function composeActiveFilterRules<Item>(rules: FinderFilterRule<Item>[] = [], filterValues: Record<string, any> = {}) {
    return rules.filter((rule) => {
        const filterState = filterValues?.[rule.id];

        if (rule.required) {
            return true;
        }

        // The filter is inactive if no value is set.
        if (filterState === undefined) {
            return false;
        }

        // If the value array is empty, the filter is inactive.
        if (rule.multiple && Array.isArray(filterState) && filterState.length === 0) {
            return false;
        }

        if (rule.is_boolean && filterState === false) {
            return false;
        }

        // Empty strings are considered inactive.
        if (typeof filterState === "string" && filterState.trim() === "") {
            return false;
        }
        return true;
    });
}

export { FiltersMixin };
