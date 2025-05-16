import { FilterRule, FinderOption, HydratedFilterRule } from "../../types";
import { getRuleFromIdentifier } from "../../utils/finder-utils";
import { FiltersMixin } from "./filters";

/**
 * Public surface for the Filters mixin
 */
function filtersAPI<FItem>(mixin: FiltersMixin<FItem>) {
    return {
        value: mixin.filters,
        activeRules: mixin.activeRules,
        activeRuleIds: mixin.activeRuleIds,
        rules: mixin.rules,
        isActive: mixin.isActive.bind(mixin),
        toggle(identifier: string | FilterRule | HydratedFilterRule) {
            const rule = getRuleFromIdentifier<FilterRule>(identifier, mixin.rules);
            if (rule === undefined) {
                throw new Error("Finder could not locate a rule for this filter.");
            }
            if (!rule.is_boolean) {
                throw new Error("Finder could not toggle this filter rule, as it is not boolean.");
            }

            const filterValue = mixin.filters?.[rule.id];
            mixin.set(rule, !filterValue);
        },
        toggleOption: mixin.toggleOption.bind(mixin),
        get: mixin.get.bind(mixin),
        set: mixin.set.bind(mixin),
        delete: (identifier: string | FilterRule | HydratedFilterRule) => {
            const rule = getRuleFromIdentifier<FilterRule>(identifier, mixin.rules);
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
