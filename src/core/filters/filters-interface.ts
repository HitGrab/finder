import { FiltersMixin } from "./filters";

/**
 * Public surface for the Filters mixin
 */
function readonlyFiltersInterface(mixin: FiltersMixin) {
    return {
        values: mixin.getValues(),
        raw: mixin.filters,
        activeRules: mixin.activeRules,
        rules: mixin.rules,
        isActive: mixin.isActive.bind(mixin),
        get: mixin.get.bind(mixin),
        has: mixin.has.bind(mixin),
    };
}

function filtersInterface(mixin: FiltersMixin) {
    return {
        ...readonlyFiltersInterface(mixin),
        toggle: mixin.toggle.bind(mixin),
        set: mixin.set.bind(mixin),
        delete: mixin.delete.bind(mixin),
        test: mixin.test.bind(mixin),
        testRule: mixin.testRule.bind(mixin),
        testRuleOptions: mixin.testRuleOptions.bind(mixin),
    };
}

export { readonlyFiltersInterface, filtersInterface };
