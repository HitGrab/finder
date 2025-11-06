import { AnyFilterRuleDefinition, FilterOption, FilterTestOptions, FilterTestRuleOptions } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "./types/core-types";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./finder-error";
import { uniqBy } from "lodash";
import { makeFilterHandler } from "./rule-book/filter-handler";
import { isFilterRuleDefinitionWithHydratedOptions } from "./utils/rule-utils";

interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}

type FilterRuleIdentifier<FValue = any> = string | AnyFilterRuleDefinition<any, FValue>;
class FiltersMixin {
    #rawValues;

    #deps;

    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies) {
        this.#rawValues = initialFilters ?? {};
        this.#deps = deps;
    }

    set<FValue>(identifier: FilterRuleIdentifier<FValue>, value?: FValue | FValue[]): void {
        // early exit
        if (this.#deps.isDisabled()) {
            return;
        }

        const rule = this.getRule(identifier);
        const previousValue = this.get(identifier);

        // empty strings are treated as if a filter is being deleted.
        const isBlankString = typeof value === "string" && value.trim() === "";
        const transformedFilterValue = isBlankString ? undefined : value;

        // ensure we have valid data
        makeFilterHandler(rule).validate(value);

        // early exit if nothing changed
        if (this.#rawValues[rule.id] !== undefined && this.#rawValues[rule.id] === transformedFilterValue) {
            return;
        }

        this.#deps.debouncer(rule, () => {
            this.#rawValues = { ...this.#rawValues, [rule.id]: transformedFilterValue };
            this.#deps.touch({
                source: EVENT_SOURCE.FILTERS,
                event: EVENTS.SET_FILTER,
                current: transformedFilterValue,
                initial: previousValue,
                rule,
            });
        });
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isFilterRuleDefinitionWithHydratedOptions);
    }

    get activeRules() {
        return this.rules.filter((rule) => makeFilterHandler(rule).isActive(this.#rawValues[rule.id]));
    }

    get(identifier: FilterRuleIdentifier) {
        const rule = this.getRule(identifier);
        const value = this.#rawValues[rule.id];
        return makeFilterHandler(rule).parse(value);
    }

    has(identifier: FilterRuleIdentifier, optionValue?: any): boolean {
        const rule = this.getRule(identifier);
        const value = this.#rawValues[rule.id];
        return makeFilterHandler(rule).has(value, optionValue);
    }

    getRule(identifier: FilterRuleIdentifier) {
        const rule = this.#deps.getRuleBook().getRule(identifier);
        if (!isFilterRuleDefinitionWithHydratedOptions(rule)) {
            throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
        }
        return rule;
    }

    add<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void {
        const rule = this.getRule(identifier);
        const value = this.#rawValues[rule.id];
        this.set(rule, makeFilterHandler(rule).add(value, optionValue));
    }

    delete<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void {
        const rule = this.getRule(identifier);
        const value = this.#rawValues[rule.id];
        this.set(rule, makeFilterHandler(rule).delete(value, optionValue));
    }

    toggle<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void {
        const rule = this.getRule(identifier);
        const value = this.#rawValues[rule.id];
        if (rule.boolean && optionValue !== undefined) {
            throw new FinderError(ERRORS.TOGGLING_BOOLEAN_FILTER_WITH_UNUSED_VALUE, { rule, value });
        }
        const toggledValue = makeFilterHandler(rule).toggle(value, optionValue);
        this.set(rule, toggledValue);
    }

    reset() {
        const previousValues = this.values;
        this.#rawValues = {};
        this.#deps.touch({
            source: EVENT_SOURCE.FILTERS,
            event: EVENTS.RESET_FILTERS,
            current: this.values,
            initial: previousValues,
        });
    }

    isRuleActive(identifier: FilterRuleIdentifier) {
        const rule = this.getRule(identifier);
        const value = this.#rawValues[rule.id];
        return makeFilterHandler(rule).isActive(value);
    }

    test(options: FilterTestOptions) {
        // If no data is available, we cannot perform any tests.
        if (this.#deps.isLoading()) {
            return [];
        }

        // Additive tests use the current Finder state.
        if (options.isAdditive) {
            const rules = uniqBy([...this.rules, ...options.rules], "id");
            const values = { ...this.values, ...options.values };
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

    testRuleOptions(identifier: FilterRuleIdentifier, isAdditive?: boolean) {
        // If no data is available, we cannot perform any tests.
        if (this.#deps.isLoading()) {
            return new Map();
        }

        const rule = this.getRule(identifier);

        if (rule.boolean) {
            const resultMap = new Map<FilterOption | boolean, any[]>();
            resultMap.set(true, this.testRule({ rule, value: true }));
            resultMap.set(false, this.testRule({ rule, value: false }));
            return resultMap;
        }

        if (Array.isArray(rule.options)) {
            const resultMap = new Map<FilterOption | boolean, any[]>();
            rule.options.forEach((option) => {
                let transformedOptionValue;

                if (rule.multiple) {
                    transformedOptionValue = [option.value];
                } else {
                    transformedOptionValue = option.value;
                }

                resultMap.set(option, this.testRule({ rule: rule, value: transformedOptionValue, isAdditive }));
            });
            return resultMap;
        }

        // if the filter is not a boolean and doesn't have defined options, there's nothing to test.
        throw new FinderError(ERRORS.TESTING_OPTIONS_ON_RULE_WITH_NO_OPTIONS, rule);
    }

    // return all filter values with default options and type casts applied.
    get values() {
        return this.rules.reduce<Record<string, any>>((acc, rule) => {
            acc[rule.id] = this.get(rule);
            return acc;
        }, {});
    }

    get raw() {
        return this.#rawValues;
    }

    serialize(): SerializedFiltersMixin {
        return {
            rules: this.rules,
            values: this.values,
        };
    }

    static process<FItem>(options: SerializedFiltersMixin, items: FItem[], context: any) {
        const activeRules = options.rules.filter((rule) => {
            return isFilterRuleDefinitionWithHydratedOptions(rule) && makeFilterHandler(rule).isActive(options.values[rule.id]);
        });
        if (activeRules.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return activeRules.every(
                (rule) => isFilterRuleDefinitionWithHydratedOptions(rule) && makeFilterHandler(rule).isMatch(item, options.values[rule.id], context),
            );
        });
    }
}

export { FiltersMixin };
