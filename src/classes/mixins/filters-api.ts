import { FinderFilterRule, FinderOption } from "../../types";
import { getOptionFromIdentifier, getRuleFromIdentifier } from "../../utils/finder-utils";
import { FiltersMixin } from "./filters";

/**
 * Public surface for the Filters mixin
 */
function filtersAPI<FItem>(mixin: FiltersMixin<FItem>) {
    return {
        value: mixin.filters,
        rules: mixin.rules,
        toggle(identifier: FinderFilterRule | string) {
            const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, mixin.rules);
            if (rule === undefined) {
                throw new Error("Finder could not locate a rule for this filter.");
            }
            if (!rule.is_boolean) {
                throw new Error("Finder could not toggle this filter rule, as it is not boolean.");
            }

            const filterValue = mixin.filters?.[rule.id];
            mixin.set(rule, !filterValue);
        },
        toggleOption(identifier: FinderFilterRule | string, optionValue: FinderOption | any) {
            const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, mixin.rules);
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

            const option = getOptionFromIdentifier(optionValue, rule.options);

            const previousFilterValue: any[] = mixin.filters?.[rule.id] ?? [];

            if (previousFilterValue.includes(option.value)) {
                mixin.set(rule, [...previousFilterValue.filter((value) => value !== option.value)]);
                return;
            }

            mixin.set(rule, [...previousFilterValue, option.value]);
        },
        get: mixin.get.bind(mixin),
        set: mixin.set.bind(mixin),
        delete: (identifier: FinderFilterRule | string) => {
            const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, mixin.rules);
            if (rule === undefined) {
                throw new Error("Finder could not locate a rule for this filter.");
            }
            mixin.set(rule, undefined);
        },
        test: mixin.test.bind(mixin),
        testOptions: mixin.testOptions.bind(mixin),
    };
}

export { filtersAPI };
