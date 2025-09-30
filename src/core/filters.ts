import { isHydratedFilterRule } from "./utils/rule-utils";
import { FilterOption, FilterRuleUnion, FilterTestOptions, FilterTestRuleOptions, FilterTestRuleOptionsOptions, HydratedFilterRule } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "./types/core-types";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./finder-error";
import { uniqBy } from "lodash";

interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}

class FiltersMixin {
    #values;

    #deps;

    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies) {
        this.#values = initialFilters ?? {};
        this.#deps = deps;
    }

    set<FItem, FValue>(identifier: FilterRuleUnion<FItem, FValue> | HydratedFilterRule<FItem, FValue> | string, incomingFilterValue: FValue | FValue[]) {
        const rule = this.getRule(identifier);

        const previousValue = this.get(identifier);

        if (this.#deps.debouncer.has(rule.id) === false) {
            this.#deps.debouncer.register(rule.id, rule.debounceMilliseconds);
        }

        this.#deps.debouncer.call(rule.id, () => {
            if (this.#deps.isDisabled()) {
                return;
            }

            // empty strings are treated as if a filter is being deleted.
            const isBlankString = typeof incomingFilterValue === "string" && incomingFilterValue.trim() === "";
            const transformedFilterValue = isBlankString ? undefined : incomingFilterValue;

            // early exit if nothing changed
            if (this.#values[rule.id] !== undefined && this.#values[rule.id] === transformedFilterValue) {
                return;
            }

            this.#values = { ...this.#values, [rule.id]: transformedFilterValue };

            this.#deps.touch({
                source: EVENT_SOURCE.FILTERS,
                event: EVENTS.SET_FILTER,
                current: incomingFilterValue,
                initial: previousValue,
                rule,
            });
        });
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isHydratedFilterRule);
    }

    get activeRules() {
        return this.rules.filter((rule) => FiltersMixin.isRuleActive(rule, this.#values[rule.id]));
    }

    get(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        const rule = this.getRule(identifier);
        const value = this.#values[rule.id];

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

    has(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue?: any) {
        const rule = this.getRule(identifier);

        const ruleValue = this.get(rule);

        if (optionValue === undefined) {
            return ruleValue !== undefined;
        }

        const option = rule.options?.find((option) => {
            if (typeof optionValue === "object" && "value" in optionValue) {
                return option.value === optionValue.value;
            }
            return option.value === optionValue;
        });

        if (option === undefined) {
            return false;
        }

        if (rule.multiple && Array.isArray(ruleValue)) {
            return ruleValue.includes(option.value);
        }

        return ruleValue === option.value;
    }

    getRule(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        const rule = this.#deps.getRuleBook().getRule(identifier);
        if (isHydratedFilterRule(rule) === false) {
            throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
        }
        return rule;
    }

    delete(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        const rule = this.getRule(identifier);
        return this.set(rule, undefined);
    }

    isRuleActive(identifier: string | FilterRuleUnion | HydratedFilterRule) {
        const rule = this.getRule(identifier);
        return FiltersMixin.isRuleActive(rule, this.#values[rule.id]);
    }

    toggle(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue?: any) {
        const rule = this.getRule(identifier);

        if (optionValue === undefined && rule.boolean) {
            const filterValue = this.get(rule.id);
            this.set(rule, !filterValue);
            return;
        }

        if (rule.options === undefined) {
            throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS, { identifier, optionValue });
        }

        if (rule.multiple === false) {
            throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, { identifier, optionValue });
        }

        const option = rule.options.find((option) => {
            if (typeof optionValue === "object" && "value" in optionValue) {
                return option.value === optionValue.value;
            }
            return option.value === optionValue;
        });
        if (option === undefined) {
            throw new FinderError(ERRORS.TOGGLING_OPTION_THAT_DOES_NOT_EXIST, { identifier, optionValue });
        }

        const previousFilterValue: any[] = this.#values[rule.id] ?? [];

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
            const rules = uniqBy([...this.rules, ...options.rules], "id");
            const values = { ...this.getValues(), ...options.values };
            return this.#deps.test({ filters: { rules, values } }, true);
        }
        return this.#deps.test({ filters: { rules: options.rules, values: options.values ?? {} } });
    }

    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions) {
        const rule = this.getRule(identifier);
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
                    const initialValue = this.#values[rule.id] ?? [];

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
        throw new FinderError(ERRORS.TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS, rule);
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
            return FiltersMixin.isRuleActive(rule, options.values[rule.id]);
        });
        if (activeRules.length === 0) {
            return items;
        }
        return items.filter((item) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return activeRules.every((rule) => rule.filterFn(item, options.values[rule.id], context));
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
}

export { FiltersMixin };
