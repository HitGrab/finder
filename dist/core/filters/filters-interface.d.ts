import { FiltersMixin } from "./filters";
/**
 * Public surface for the Filters mixin
 */
declare function readonlyFiltersInterface<FItem>(mixin: FiltersMixin<FItem>): {
    filters: Record<string, any>;
    raw: Record<string, any>;
    activeRules: import("../..").HydratedFilterRule<FItem>[];
    rules: import("../..").HydratedFilterRule<FItem>[];
    isActive: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => boolean;
    get: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => any;
    has: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
    getRule: (id: string) => import("../..").HydratedFilterRule<FItem> | undefined;
};
declare function filtersInterface<FItem>(mixin: FiltersMixin<FItem>): {
    toggle: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => void;
    toggleOption: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule, optionValue: import("../..").FilterOption | any) => void;
    set: (identifier: import("../..").FilterRule | import("../..").HydratedFilterRule | string, incomingFilterValue: any) => void;
    delete: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => void;
    test: (options: import("../../types").FilterTestOptions) => FItem[];
    testRule: ({ rule: identifier, value, ...options }: import("../../types").FilterTestRuleOptions) => FItem[];
    testRuleOptions: ({ rule: identifier, ...options }: import("../../types").FilterTestRuleOptionsOptions) => Map<any, any>;
    filters: Record<string, any>;
    raw: Record<string, any>;
    activeRules: import("../..").HydratedFilterRule<FItem>[];
    rules: import("../..").HydratedFilterRule<FItem>[];
    isActive: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => boolean;
    get: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule) => any;
    has: (identifier: string | import("../..").FilterRule | import("../..").HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
    getRule: (id: string) => import("../..").HydratedFilterRule<FItem> | undefined;
};
export { readonlyFiltersInterface, filtersInterface };
