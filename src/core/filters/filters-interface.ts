import { FilterRule, HydratedFilterRule } from "../../types";
import { getRuleFromIdentifier } from "../utils/rule-utils";
import { FiltersMixin } from "./filters";

/**
 * Public surface for the Filters mixin
 */
function readonlyFiltersInterface<FItem>(mixin: FiltersMixin<FItem>) {
    return {
        filters: mixin.getFilters(),
        raw: mixin.filters,
        activeRules: mixin.activeRules,
        rules: mixin.rules,
        isActive: mixin.isActive.bind(mixin),
        get: mixin.get.bind(mixin),
        has: mixin.has.bind(mixin),
        getRule: mixin.getRule.bind(mixin),
    };
}

function filtersInterface<FItem>(mixin: FiltersMixin<FItem>) {
    return {
        ...readonlyFiltersInterface(mixin),
        toggle(identifier: string | FilterRule | HydratedFilterRule) {
            const rule = getRuleFromIdentifier<FilterRule>(identifier, mixin.rules);
            if (rule === undefined) {
                throw new Error("Finder could not locate a rule for this filter.");
            }
            if (!rule.isBoolean) {
                throw new Error("Finder could not toggle this filter rule, as it is not boolean.");
            }

            const filterValue = mixin.get(rule.id);
            mixin.set(rule, !filterValue);
        },
        toggleOption: mixin.toggleOption.bind(mixin),
        set: mixin.set.bind(mixin),
        delete: (identifier: string | FilterRule | HydratedFilterRule) => {
            const rule = getRuleFromIdentifier<FilterRule>(identifier, mixin.rules);
            if (rule === undefined) {
                throw new Error("Finder could not locate a rule for this filter.");
            }
            mixin.set(rule, undefined);
        },
        test: mixin.test.bind(mixin),
        testRule: mixin.testRule.bind(mixin),
        testRuleOptions: mixin.testRuleOptions.bind(mixin),
    };
}

export { readonlyFiltersInterface, filtersInterface };
