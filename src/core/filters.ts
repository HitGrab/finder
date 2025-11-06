import {
    FilterOption,
    FilterRuleUnionDefinition,
    FilterRuleUnionHydratedDefinition,
    FilterRuleWithBooleanValue,
    FilterRuleWithMultipleValues,
    FilterTestOptions,
    FilterTestRuleOptions,
} from "./types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "./types/core-types";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./finder-error";
import { uniqBy } from "lodash";
import { makeFilterHandler } from "./rule-book/filter-handler";
import { isFilterRuleDefinitionWithHydratedOptions } from "./utils/rule-utils";
import { FilterRuleDefinition } from "..";

interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}

type FilterRuleIdentifier = string | FilterRuleUnionDefinition | FilterRuleUnionHydratedDefinition;

class FiltersMixin {
    #rawValues;

    #deps;

    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies) {
        this.#rawValues = initialFilters ?? {};
        this.#deps = deps;
    }

    set<FValue>(identifier: Omit<FilterRuleWithMultipleValues<any, FValue>, "options">, value?: FValue[]): void;
    set<FValue>(identifier: Omit<FilterRuleDefinition<any, FValue>, "options">, value?: FValue): void;
    set(identifier: string, value?: unknown): void;
    set<FValue>(identifier: string | Omit<FilterRuleDefinition<any, FValue>, "options">, value?: unknown): void {
        // early exit
        if (this.#deps.isDisabled()) {
            return;
        }

        const rule = this.getRule(identifier as string);
        const previousValue = this.get(identifier as string);

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

    add<FValue>(identifier: Omit<FilterRuleWithMultipleValues<any, FValue>, "options">, optionValue?: FValue): void;
    add(identifier: string, optionValue?: unknown): void;
    add<FValue>(identifier: string | Omit<FilterRuleDefinition<any, FValue>, "options">, optionValue?: unknown): void {
        const rule = this.getRule(identifier as string);
        const value = this.#rawValues[rule.id];
        this.set(rule, makeFilterHandler(rule).add(value, optionValue));
    }

    delete<FValue>(identifier: Omit<FilterRuleWithMultipleValues<any, FValue>, "options">, optionValue?: FValue): void;
    delete(identifier: string, optionValue?: unknown): void;
    delete(identifier: Omit<FilterRuleDefinition, "options">, optionValue?: never): void;
    delete<FValue>(identifier: string | Omit<FilterRuleDefinition<any, FValue>, "options">, optionValue?: unknown): void {
        const rule = this.getRule(identifier as string);
        const value = this.#rawValues[rule.id];
        this.set(rule, makeFilterHandler(rule).delete(value, optionValue));
    }

    isRuleActive(identifier: FilterRuleIdentifier) {
        const rule = this.getRule(identifier);
        const value = this.#rawValues[rule.id];
        return makeFilterHandler(rule).isActive(value);
    }

    toggle(identifier: string, optionValue?: any): void;
    toggle<FValue extends boolean>(identifier: FilterRuleWithBooleanValue<any, FValue>): void;
    toggle<FValue>(identifier: FilterRuleWithMultipleValues<any, FValue>, optionValue?: FValue): void;
    toggle(identifier: string | FilterRuleWithBooleanValue | FilterRuleWithMultipleValues, optionValue?: any): void {
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
