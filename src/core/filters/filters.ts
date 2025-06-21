import {
    HydratedFilterRule,
    FilterRule,
    FilterOption,
    FilterTestOptions,
    FilterTestRuleOptions,
    FilterTestRuleOptionsOptions,
    MetaInterface,
} from "../../types";
import { getRuleFromIdentifier, isFilterRule, getFilterOptionFromIdentifier } from "../utils/rule-utils";
import { MixinInjectedDependencies } from "../types/internal-types";
import { simpleUniqBy } from "../utils/finder-utils";

type InitialValues = {
    initialFilters: Record<string, any> | undefined;
};
class FiltersMixin<FItem> {
    filters;

    // memoize rules with generated options
    #hydratedRules?: HydratedFilterRule<FItem>[];

    #deps;

    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.filters = initialFilters || {};
        this.#deps = deps;
    }

    set(identifier: FilterRule | HydratedFilterRule | string, incomingFilterValue: any) {
        const rule = getRuleFromIdentifier(identifier, this.rules) as HydratedFilterRule | undefined;
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const previousValue = this.get(identifier);

        if (this.#deps.debouncer.has(rule.id) === false) {
            this.#deps.debouncer.register(rule.id, rule?.debounceDelay);
        }

        this.#deps.debouncer.call(rule.id, () => {
            if (this.#deps.isDisabled()) {
                return;
            }

            // empty strings are treated as if a filter is being deleted.
            const isBlankString = typeof incomingFilterValue === "string" && incomingFilterValue.trim() === "";
            let transformedFilterValue = isBlankString ? undefined : incomingFilterValue;

            // early exit if nothing changed
            if (this.filters?.[rule.id] !== undefined && this.filters[rule.id] === transformedFilterValue) {
                return;
            }

            this.filters = { ...this.filters, [rule.id]: transformedFilterValue };
            this.#deps.touch({
                source: "filters",
                event: "change.filters.set",
                current: {
                    rule,
                    value: incomingFilterValue,
                },
                initial: { rule, value: previousValue },
            });
        });
    }

    get rules() {
        if (this.#hydratedRules === undefined) {
            this.#hydratedRules = this.#takeHydratedRulesSnapshot(this.#deps.getItems(), this.#deps.getMeta());
        }
        return this.#hydratedRules;
    }

    recalculateHydratedRules() {
        this.#hydratedRules = this.#takeHydratedRulesSnapshot(this.#deps.getItems(), this.#deps.getMeta());
    }

    getRule(id: string) {
        return getRuleFromIdentifier(id, this.rules);
    }

    get activeRules() {
        return this.rules.filter((rule) => this.isActive(rule));
    }

    // hydrate and memoize generated options
    #takeHydratedRulesSnapshot(items: FItem[], meta: MetaInterface) {
        const filterRules = this.#deps.getRules().filter(isFilterRule);
        return filterRules.map((rule) => {
            // trigger option generator if found
            let hydratedOptions = typeof rule.options === "function" ? rule.options(items, meta) : rule.options;
            return {
                ...rule,

                options: hydratedOptions,

                // reduce uncertainty
                multiple: !!rule.multiple,
                required: !!rule.required,
                isBoolean: !!rule.isBoolean,
                hidden: !!rule.hidden,

                // brand it
                _isHydrated: true,
            } as HydratedFilterRule<FItem>;
        });
    }

    get(identifier: string | FilterRule | HydratedFilterRule) {
        const rule = getRuleFromIdentifier(identifier, this.rules) as HydratedFilterRule | undefined;
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const value = this.filters?.[rule.id];

        if (value === undefined) {
            if (rule.defaultValue) {
                return rule.defaultValue;
            }

            if (rule.required) {
                if (rule.isBoolean) {
                    return true;
                }

                if (Array.isArray(rule.options) && rule.options.length > 0) {
                    return rule.options.at(0)?.value;
                }
            }

            // cast empty values to the correct shape
            if (rule.multiple) {
                return [];
            }

            if (rule.isBoolean) {
                return false;
            }
        }

        return value;
    }

    has(identifier: string | FilterRule | HydratedFilterRule, optionValue?: FilterOption | any) {
        const rule = getRuleFromIdentifier(identifier, this.rules) as HydratedFilterRule | undefined;
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const ruleValue = this.get(rule);

        if (optionValue === undefined) {
            return ruleValue !== undefined;
        }

        const option = getFilterOptionFromIdentifier(optionValue, rule.options, this.#deps.getItems(), this.#deps.getMeta());

        if (rule.multiple) {
            return ruleValue.includes(option.value);
        }

        return ruleValue === option.value;
    }

    delete(identifier: string | FilterRule | HydratedFilterRule) {
        const rule = getRuleFromIdentifier<FilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        return this.set(rule, undefined);
    }

    isActive(identifier: string | FilterRule | HydratedFilterRule) {
        const rule = getRuleFromIdentifier(identifier, this.rules) as HydratedFilterRule | undefined;
        if (!rule) {
            return false;
        }
        return FiltersMixin.isActive(rule, this.filters?.[rule.id]);
    }

    toggle(identifier: string | FilterRule | HydratedFilterRule) {
        const rule = getRuleFromIdentifier<FilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        if (rule.isBoolean) {
            const filterValue = this.get(rule.id);
            this.set(rule, !filterValue);
            return;
        }

        throw new Error("Finder could not toggle this filter rule, as it is not boolean.");
    }

    toggleOption(identifier: string | FilterRule | HydratedFilterRule, optionValue: FilterOption | any) {
        const rule = getRuleFromIdentifier(identifier, this.rules) as HydratedFilterRule | undefined;
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

        const option = getFilterOptionFromIdentifier(optionValue, rule.options, this.#deps.getItems(), this.#deps.getMeta());

        const previousFilterValue: any[] = this.filters?.[rule.id] ?? [];

        if (previousFilterValue.includes(option.value)) {
            this.set(rule, [...previousFilterValue.filter((value) => value !== option.value)]);
            return;
        }

        this.set(rule, [...previousFilterValue, option.value]);
    }

    test(options: FilterTestOptions) {
        // If no data is available, we cannot perform any tests.
        if (this.#deps.isLoading()) {
            return [];
        }

        const optionsWithDefaults = { rules: [], meta: this.#deps.getMeta(), values: {}, ...options };

        // Additive tests use the current values of the filters.
        if (options.isAdditive) {
            const ruleset = simpleUniqBy([...this.rules, ...optionsWithDefaults.rules], "id");
            const initialValues = { ...this.getFilters(), ...optionsWithDefaults.values };
            return FiltersMixin.process(this.#deps.getItems(), ruleset, initialValues, optionsWithDefaults.meta);
        }

        return FiltersMixin.process(this.#deps.getItems(), optionsWithDefaults.rules, optionsWithDefaults.values, optionsWithDefaults.meta);
    }

    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions) {
        // If no data is available, we cannot perform any tests.
        if (this.#deps.isLoading()) {
            return [];
        }

        const rule = getRuleFromIdentifier(identifier, this.rules) as HydratedFilterRule | undefined;
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        return this.test({
            rules: [rule],
            values: { [rule.id]: value },
            ...options,
        });
    }

    testRuleOptions({ rule: identifier, ...options }: FilterTestRuleOptionsOptions) {
        // If no data is available, we cannot perform any tests.
        if (this.#deps.isLoading()) {
            return new Map();
        }

        const rule = getRuleFromIdentifier(identifier, this.rules) as HydratedFilterRule | undefined;
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        if (rule.isBoolean === true) {
            const resultMap = new Map<FilterOption | boolean, FItem[]>();
            resultMap.set(true, this.testRule({ rule, value: true, ...options }));
            resultMap.set(false, this.testRule({ rule, value: false, ...options }));
            return resultMap;
        }

        if (Array.isArray(rule.options)) {
            const resultMap = new Map<FilterOption | boolean, FItem[]>();
            rule.options.forEach((option) => {
                let transformedOptionValue;

                if (options.mergeExistingValue) {
                    // use raw value, not calculated value
                    const initialValue = this.filters?.[rule.id] ?? [];

                    if (rule.multiple) {
                        transformedOptionValue = [...initialValue, option.value];
                    }
                } else {
                    if (rule.multiple) {
                        transformedOptionValue = [option.value];
                    } else {
                        transformedOptionValue = option.value;
                    }
                }
                resultMap.set(option, this.testRule({ rule: rule, value: transformedOptionValue, ...options }));
            });
            return resultMap;
        }

        // if the filter is not a boolean and doesn't have defined options, there's nothing to test.
        throw new Error("Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.");
    }

    // return all filter values with default options and type casts applied.
    getFilters() {
        return this.rules.reduce(
            (acc, rule) => {
                acc[rule.id] = this.get(rule);
                return acc;
            },
            {} as Record<string, any>,
        );
    }

    process(items: FItem[], meta: MetaInterface) {
        return FiltersMixin.process(items, this.rules, this.getFilters(), meta);
    }

    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, meta: MetaInterface) {
        const activeRules = rules.filter((rule) => {
            return FiltersMixin.isActive(rule, values?.[rule.id]);
        });
        // An item must pass ALL active filters to match.
        return items.filter((item) => {
            return activeRules.every((rule) => rule.filterFn(item, values?.[rule.id], meta));
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

        if (rule.isBoolean && value === false) {
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
