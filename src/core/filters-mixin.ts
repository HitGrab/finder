import { AnyFilterRuleDefinition, FilterOption, FilterTestOptions, FilterTestRuleOptions } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "./types/core-types";
import { ERRORS, EVENT_SOURCE, EVENTS, WARNINGS } from "./core-constants";
import { FinderError } from "./finder-error";
import { uniqBy } from "lodash";
import { isFilterRuleDefinitionWithHydratedOptions } from "./utils/rule-utils";
import { makeFilterHandler } from "./filters/filter-handler";

interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}

type FilterRuleIdentifier<FValue = any> = string | AnyFilterRuleDefinition<any, FValue>;
class FiltersMixin {
    #rawValues = new Map<string, any>();

    #initialValues = new Map<string, any>();

    #deps;

    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies) {
        this.#deps = deps;

        if (initialFilters) {
            Object.entries(initialFilters).forEach(([ruleId, value]) => {
                const isValidRule = this.#deps.getRuleBook().hasRule(ruleId);
                if (isValidRule) {
                    this.#rawValues.set(ruleId, value);
                    this.#initialValues.set(ruleId, value);
                } else {
                    console.warn(WARNINGS.INITIAL_RULE_NOT_FOUND, { rule: ruleId });
                }
            });
        }
    }

    set<FValue>(identifier: FilterRuleIdentifier<FValue>, value?: FValue | FValue[]): void {
        // early exit
        if (this.#deps.isDisabled()) {
            return;
        }

        const rule = this.getRule(identifier);
        const previousValue = this.get(identifier);

        // empty strings are treated as if a filter is being deleted.
        const isFilterBeingReset = (typeof value === "string" && value.trim() === "") || value === undefined || value === null;
        const transformedFilterValue = isFilterBeingReset ? undefined : value;

        // if the filter value is blank or undefined, the user is removing this filter so we don't need to validate it.
        if (isFilterBeingReset === false) {
            // ensure we have valid data
            makeFilterHandler(rule).validate(transformedFilterValue);
        }

        // early exit if nothing changed
        if (this.#rawValues.has(rule.id) && this.#rawValues.get(rule.id) === transformedFilterValue) {
            return;
        }

        this.#deps.debouncer(rule, () => {
            const initialValue = makeFilterHandler(rule).parse(this.#initialValues.get(rule.id));
            const isResetToInitialValue =
                initialValue !== undefined && transformedFilterValue === makeFilterHandler(rule).parse(this.#initialValues.get(rule.id));
            const isResetToDefaultValue = transformedFilterValue === rule.defaultValue;

            if (isResetToInitialValue || isResetToDefaultValue) {
                this.#rawValues.delete(rule.id);
            } else {
                this.#rawValues.set(rule.id, transformedFilterValue);
            }
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
        return this.rules.filter((rule) => makeFilterHandler(rule).isActive(this.#rawValues.get(rule.id)));
    }

    get touchedRules() {
        return this.rules.filter((rule) => {
            return this.#rawValues.has(rule.id);
        });
    }

    get(identifier: FilterRuleIdentifier) {
        const rule = this.getRule(identifier);
        const value = this.#rawValues.get(rule.id);
        return makeFilterHandler(rule).parse(value);
    }

    has(identifier: FilterRuleIdentifier, optionValue?: any): boolean {
        const rule = this.getRule(identifier);
        const value = this.#rawValues.get(rule.id);
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
        const value = this.#rawValues.get(rule.id);
        this.set(rule, makeFilterHandler(rule).add(value, optionValue));
    }

    delete<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void {
        const rule = this.getRule(identifier);
        const value = this.#rawValues.get(rule.id);
        this.set(rule, makeFilterHandler(rule).delete(value, optionValue));
    }

    toggle<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void {
        const rule = this.getRule(identifier);
        const value = this.#rawValues.get(rule.id);
        this.set(rule, makeFilterHandler(rule).toggle(value, optionValue, !!rule.required));
    }

    reset() {
        const previousValues = this.values;
        this.#rawValues.clear();
        this.#deps.touch({
            source: EVENT_SOURCE.FILTERS,
            event: EVENTS.RESET_FILTERS,
            current: this.values,
            initial: previousValues,
        });
    }

    isRuleActive(identifier: FilterRuleIdentifier) {
        const rule = this.getRule(identifier);
        const value = this.#rawValues.get(rule.id);
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
            return this.#deps.testItems({ filters: { rules, values } }, true);
        }
        return this.#deps.testItems({ filters: { rules: options.rules, values: options.values ?? {} } });
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
        return Object.fromEntries(this.#rawValues.entries());
    }

    serialize(): SerializedFiltersMixin {
        return {
            rules: this.rules,
            values: this.values,
        };
    }

    get api() {
        return {
            values: this.values,
            raw: this.raw,
            activeRules: this.activeRules,
            touchedRules: this.touchedRules,
            rules: this.rules,
            isActive: this.isRuleActive.bind(this),
            get: this.get.bind(this),
            add: this.add.bind(this),
            has: this.has.bind(this),
            getRule: this.getRule.bind(this),
            toggle: this.toggle.bind(this),
            set: this.set.bind(this),
            delete: this.delete.bind(this),
            reset: this.reset.bind(this),
            test: this.test.bind(this),
            testRule: this.testRule.bind(this),
            testRuleOptions: this.testRuleOptions.bind(this),
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
