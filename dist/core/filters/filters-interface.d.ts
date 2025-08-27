import { FiltersMixin } from "./filters";
/**
 * Public surface for the Filters mixin
 */
declare function readonlyFiltersInterface(mixin: FiltersMixin): {
    values: Record<string, any>;
    raw: Record<string, any>;
    activeRules: import("../..").HydratedFilterRule<unknown, any, any>[];
    rules: import("../..").HydratedFilterRule<unknown, any, any>[];
    isActive: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule) => boolean;
    get: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule) => any;
    has: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
};
declare function filtersInterface(mixin: FiltersMixin): {
    toggle: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => void;
    set: <FItem, FValue>(identifier: string | import("../..").FilterRuleUnion<FItem, FValue> | import("../..").HydratedFilterRule<FItem, FValue, any>, incomingFilterValue: FValue | FValue[]) => void;
    delete: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule) => void;
    test: (options: import("../../types").FilterTestOptions) => any[];
    testRule: ({ rule: identifier, value, ...options }: import("../../types").FilterTestRuleOptions) => any[];
    testRuleOptions: ({ rule: identifier, ...options }: import("../../types").FilterTestRuleOptionsOptions) => Map<any, any>;
    values: Record<string, any>;
    raw: Record<string, any>;
    activeRules: import("../..").HydratedFilterRule<unknown, any, any>[];
    rules: import("../..").HydratedFilterRule<unknown, any, any>[];
    isActive: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule) => boolean;
    get: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule) => any;
    has: (identifier: string | import("../..").FilterRuleUnion | import("../..").HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
};
export { readonlyFiltersInterface, filtersInterface };
