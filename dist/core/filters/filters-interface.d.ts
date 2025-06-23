import { FiltersMixin } from "./filters";
/**
 * Public surface for the Filters mixin
 */
declare function readonlyFiltersInterface(mixin: FiltersMixin): {
    filters: Record<string, any>;
    raw: Record<string, any>;
    activeRules: import("../..").HydratedFilterRule[];
    rules: import("../..").HydratedFilterRule[];
    isActive: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => boolean;
    get: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => any;
    has: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
    getRule: <FItem = any, FValue = any>(identifier: string | import("../..").FilterRule<FItem, FValue> | import("../..").HydratedFilterRule<FItem, FValue>) => import("../..").HydratedFilterRule<FItem, FValue>;
};
declare function filtersInterface(mixin: FiltersMixin): {
    toggle: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => void;
    toggleOption: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule, optionValue: import("../..").FilterOption | any) => void;
    set: <FItem, FValue>(identifier: string | import("../..").FilterRule<FItem, FValue> | import("../..").HydratedFilterRule<FItem, FValue>, incomingFilterValue: FValue | FValue[]) => void;
    delete: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => void;
    test: (options: import("../../types").FilterTestOptions) => any[];
    testRule: ({ rule: identifier, value, ...options }: import("../../types").FilterTestRuleOptions) => any[];
    testRuleOptions: ({ rule: identifier, ...options }: import("../../types").FilterTestRuleOptionsOptions) => Map<any, any>;
    filters: Record<string, any>;
    raw: Record<string, any>;
    activeRules: import("../..").HydratedFilterRule[];
    rules: import("../..").HydratedFilterRule[];
    isActive: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => boolean;
    get: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => any;
    has: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
    getRule: <FItem = any, FValue = any>(identifier: string | import("../..").FilterRule<FItem, FValue> | import("../..").HydratedFilterRule<FItem, FValue>) => import("../..").HydratedFilterRule<FItem, FValue>;
};
export { readonlyFiltersInterface, filtersInterface };
