import { FinderInjectedHandlers, FilterRule, FinderOption, FinderMeta, HydratedFilterRule } from "../../types";
import { DebounceCallbackRegistry } from "../../utils/debounce-callback-registry";
import { getOptionFromIdentifier, getRuleFromIdentifier, isHydratedFilterRule } from "../../utils/finder-utils";

class FiltersMixin<FItem> {
    filters: Record<string, any>;

    #handlers: FinderInjectedHandlers<FItem>;

    #debouncer = new DebounceCallbackRegistry();

    constructor(initialFilters: Record<string, any> | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.filters = initialFilters || {};
        this.#handlers = handlers;
    }

    set(identifier: FilterRule | HydratedFilterRule | string, incomingFilterValue: any) {
        const rule = getRuleFromIdentifier<FilterRule>(identifier, this.rules);
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

            // empty strings are treated as if a filter is being deleted.
            const isBlankString = typeof incomingFilterValue === "string" && incomingFilterValue.trim() === "";
            let transformedFilterValue = isBlankString ? undefined : incomingFilterValue;

            // early exit if nothing changed
            if (this.filters?.[rule.id] !== undefined && this.filters[rule.id] === transformedFilterValue) {
                return;
            }

            this.filters = { ...this.filters, [rule.id]: transformedFilterValue };
            this.#handlers.onChange({ filters: this.filters });
        });
    }

    get rules() {
        return this.#handlers.getHydratedRules().filter(isHydratedFilterRule);
    }

    get activeRules() {
        return this.rules.filter((rule) => this.isActive(rule));
    }
    get activeRuleIds() {
        return this.activeRules.map((rule) => rule.id);
    }

    get(identifier: string | FilterRule | HydratedFilterRule) {
        const rule = getRuleFromIdentifier<FilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const value = this.filters?.[rule.id];
        if (value === undefined && rule.required) {
            if (rule.is_boolean) {
                return true;
            }
            if (Array.isArray(rule.options) && rule.options.length > 0) {
                return rule.options.at(0);
            }
        }
        return value;
    }

    has(identifier: string | FilterRule | HydratedFilterRule, optionValue?: FinderOption | any) {
        const rule = getRuleFromIdentifier<FilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const value = this.get(rule);

        if (optionValue === undefined) {
            return value !== undefined;
        }

        const option = getOptionFromIdentifier(optionValue, rule.options, this.#handlers.getItems(), this.#handlers.getMeta());

        if (rule.multiple) {
            return value.includes(option);
        }

        return value === option;
    }

    isActive(identifier: string | FilterRule | HydratedFilterRule) {
        const rule = getRuleFromIdentifier<HydratedFilterRule>(identifier, this.rules);
        if (!rule) {
            return false;
        }
        return FiltersMixin.isActive(rule, this.filters?.[rule.id]);
    }

    toggleOption(identifier: string | FilterRule | HydratedFilterRule, optionValue: FinderOption | any) {
        const rule = getRuleFromIdentifier<HydratedFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        if (rule.options === undefined) {
            throw new Error("Finder could not toggle this filter rule option, as the filter does not have any options.");
        }
        if (!!rule?.multiple === false) {
            throw new Error(
                "Finder could not toggle this filter rule option, as the rule does not allow multiple values. Consider using filters.set() or filters.toggle() instead.",
            );
        }

        const option = getOptionFromIdentifier(optionValue, rule.options, this.#handlers.getItems());

        const previousFilterValue: any[] = this.filters?.[rule.id] ?? [];

        if (previousFilterValue.includes(option.value)) {
            this.set(rule, [...previousFilterValue.filter((value) => value !== option.value)]);
            return;
        }

        this.set(rule, [...previousFilterValue, option.value]);
    }

    test(identifier: string | FilterRule | HydratedFilterRule, filterValue: any, incomingMeta = this.#handlers.getMeta()) {
        const rule = getRuleFromIdentifier<HydratedFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const items = this.#handlers.getItems();
        return FiltersMixin.process(items, [rule], { [rule.id]: filterValue }, incomingMeta);
    }

    testOptions(identifier: FilterRule | HydratedFilterRule | string, meta = this.#handlers.getMeta()) {
        const rule = getRuleFromIdentifier<HydratedFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const items = this.#handlers.getItems();

        if (rule.is_boolean === true) {
            const resultMap = new Map<FinderOption | boolean, FItem[]>();
            resultMap.set(true, FiltersMixin.process(items, [rule], { [rule.id]: true }, meta));
            resultMap.set(false, FiltersMixin.process(items, [rule], { [rule.id]: false }, meta));
            return resultMap;
        }

        if (Array.isArray(rule.options)) {
            const resultMap = new Map<FinderOption | boolean, FItem[]>();
            rule.options.forEach((option) => {
                resultMap.set(option, FiltersMixin.process(items, [rule], { [rule.id]: option.value }, meta));
            });
            return resultMap;
        }

        // if the filter is not a boolean and doesn't have defined options, there's nothing to test.
        throw new Error("Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.");
    }

    process(items: FItem[], meta?: FinderMeta) {
        return FiltersMixin.process(items, this.rules, this.filters, meta);
    }

    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, meta?: FinderMeta) {
        const activeFilters = rules.filter((rule) => {
            return FiltersMixin.isActive(rule, values?.[rule.id]);
        });
        return items.filter((item) => {
            // An item must pass ALL filters to match.
            return activeFilters.every((rule) => {
                const filterValue = values?.[rule.id];

                if (rule.required && filterValue === undefined) {
                    let options: FinderOption[] = [];

                    if (Array.isArray(rule.options)) {
                        options = rule.options;
                    }

                    const firstOption = options.at(0);
                    if (firstOption) {
                        return rule.filterFn(item, firstOption.value, meta);
                    }
                }

                return rule.filterFn(item, filterValue, meta);
            });
        });
    }

    static isActive(rule: FilterRule | HydratedFilterRule, value: any) {
        if (rule.required) {
            return true;
        }

        // The filter is inactive if no value is set.
        if (value === undefined) {
            return false;
        }

        // If the value array is empty, the filter is inactive.
        if (rule.multiple && Array.isArray(value) && value.length === 0) {
            return false;
        }

        if (rule.is_boolean && value === false) {
            return false;
        }

        // Empty strings are considered inactive.
        if (typeof value === "string" && value.trim() === "") {
            return false;
        }
        return true;
    }
}

export { FiltersMixin };
