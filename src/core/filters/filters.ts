import { getFilterOptionFromIdentifier, isHydratedFilterRule } from "../utils/rule-utils";
import { simpleUniqBy } from "../utils/finder-utils";
import {
    FilterOption,
    FilterRule,
    FilterRuleUnion,
    FilterTestOptions,
    FilterTestRuleOptions,
    FilterTestRuleOptionsOptions,
    HydratedFilterRule,
} from "../types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "../types/core-types";

interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}

class FiltersMixin {
    #values;

    #deps;

    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies) {
        this.#values = initialFilters || {};
        this.#deps = deps;
    }

    set<FItem, FValue>(identifier: FilterRuleUnion<FItem, FValue> | HydratedFilterRule<FItem, FValue> | string, incomingFilterValue: FValue | FValue[]) {
        const rule = this.#deps.getRuleBook().getRule<HydratedFilterRule>(identifier);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const previousValue = this.get(identifier);

        if (this.#deps.debouncer.has(rule.id) === false) {
            this.#deps.debouncer.register(rule.id, rule?.debounceMilliseconds);
        }

        this.#deps.debouncer.call(rule.id, () => {
            if (this.#deps.isDisabled()) {
                return;
            }

            // empty strings are treated as if a filter is being deleted.
            const isBlankString = typeof incomingFilterValue === "string" && incomingFilterValue.trim() === "";
            let transformedFilterValue = isBlankString ? undefined : incomingFilterValue;

            // early exit if nothing changed
            if (this.#values?.[rule.id] !== undefined && this.#values[rule.id] === transformedFilterValue) {
                return;
            }

            this.#values = { ...this.#values, [rule.id]: transformedFilterValue };

            this.#deps.touch({
                source: "filters",
                event: "change.filters.set",
                current: {
                    rule,
                    value: incomingFilterValue,
                },
                initial: { rule, value: previousValue },
                rule,
            });
        });
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isHydratedFilterRule);
    }

    get activeRules() {
        return this.rules.filter((rule) => FiltersMixin.isRuleActive(rule, this.#values?.[rule.id]));
    }

    get(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        const rule = this.#deps.getRuleBook().getRule<HydratedFilterRule>(identifier);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const value = this.#values?.[rule.id];

        if (value === undefined) {
            if (rule.defaultValue) {
                return rule.defaultValue;
            }

            if (rule.required) {
                if (rule.boolean) {
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

            if (rule.boolean) {
                return false;
            }
        }

        return value;
    }

    has(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue?: FilterOption | any) {
        const rule = this.#deps.getRuleBook().getRule<HydratedFilterRule>(identifier);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        const ruleValue = this.get(rule);

        if (optionValue === undefined) {
            return ruleValue !== undefined;
        }

        const option = getFilterOptionFromIdentifier(optionValue, rule.options, this.#deps.getItems(), this.#deps.getContext());

        if (rule.multiple) {
            return ruleValue.includes(option.value);
        }

        return ruleValue === option.value;
    }

    getRule(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        return this.#deps.getRuleBook().getRule<HydratedFilterRule>(identifier);
    }

    delete(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        const rule = this.#deps.getRuleBook().getRule<HydratedFilterRule>(identifier);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        return this.set(rule, undefined);
    }

    isRuleActive(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        const rule = this.#deps.getRuleBook().getRule<HydratedFilterRule>(identifier);
        if (!rule) {
            return false;
        }
        return FiltersMixin.isRuleActive(rule, this.#values?.[rule.id]);
    }

    toggle(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue?: FilterOption | any) {
        const rule = this.#deps.getRuleBook().getRule<HydratedFilterRule>(identifier);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        if (optionValue === undefined && rule.boolean) {
            const filterValue = this.get(rule.id);
            this.set(rule, !filterValue);
            return;
        }

        if (rule.options === undefined) {
            throw new Error("Finder could not toggle this filter rule option, as the filter does not have any options.");
        }

        if (rule.multiple === false) {
            throw new Error("Finder could not toggle this filter rule option, as the rule does not allow multiple values.");
        }

        const option = getFilterOptionFromIdentifier(optionValue, rule.options, this.#deps.getItems(), this.#deps.getContext());

        const previousFilterValue: any[] = this.#values?.[rule.id] ?? [];

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

        // Additive tests use the current Finder state.
        if (options.isAdditive) {
            const rules = simpleUniqBy([...this.rules, ...options.rules], "id");
            const values = { ...this.getValues(), ...options.values };
            return this.#deps.test({ filters: { rules, values } }, true);
        }
        return this.#deps.test({ filters: { rules: options.rules, values: options.values ?? {} } });
    }

    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions) {
        const rule = this.getRule(identifier);
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

        const rule = this.getRule(identifier);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        if (rule.boolean === true) {
            const resultMap = new Map<FilterOption | boolean, any[]>();
            resultMap.set(true, this.testRule({ rule, value: true, ...options }));
            resultMap.set(false, this.testRule({ rule, value: false, ...options }));
            return resultMap;
        }

        if (Array.isArray(rule.options)) {
            const resultMap = new Map<FilterOption | boolean, any[]>();
            rule.options.forEach((option) => {
                let transformedOptionValue;

                if (options.mergeExistingValue) {
                    // use raw value, not calculated value
                    const initialValue = this.#values?.[rule.id] ?? [];

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
    getValues() {
        return this.rules.reduce<Record<string, any>>((acc, rule) => {
            acc[rule.id] = this.get(rule);
            return acc;
        }, {});
    }

    getRawValues() {
        return this.#values;
    }

    serialize(): SerializedFiltersMixin {
        return {
            rules: this.rules,
            values: this.getValues(),
        };
    }

    static process<FItem>(options: SerializedFiltersMixin, items: FItem[], context?: any) {
        const activeRules = options.rules.filter((rule) => {
            return FiltersMixin.isRuleActive(rule, options.values?.[rule.id]);
        });
        if (activeRules.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return activeRules.every((rule) => rule.filterFn(item, options.values?.[rule.id], context));
        });
    }

    static isRuleActive(rule: FilterRuleUnion | HydratedFilterRule, value: any) {
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

        if (rule.boolean && value === false) {
            return false;
        }

        // Empty strings are considered inactive.
        if (typeof value === "string" && value.trim() === "") {
            return false;
        }
        return true;
    }

    static hydrateRule<FItem = any, FContext = any>(rule: FilterRule, items: FItem[], context: FContext) {
        return {
            ...rule,

            options: typeof rule.options === "function" ? rule.options({ items, context }) : rule.options,

            // reduce uncertainty
            multiple: !!rule.multiple,
            required: !!rule.required,
            boolean: !!rule.boolean,
            hidden: !!rule.hidden,

            // brand it
            _isHydrated: true,
        } as HydratedFilterRule;
    }
}

export { FiltersMixin };
