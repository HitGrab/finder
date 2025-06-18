import { FilterRule, HydratedFilterRule } from "../../types";
import { FiltersMixin } from "./filters";
/**
 * Public surface for the Filters mixin
 */
declare function readonlyFiltersInterface<FItem>(mixin: FiltersMixin<FItem>): {
    filters: Record<string, any>;
    raw: Record<string, any>;
    activeRules: HydratedFilterRule<FItem, any>[];
    rules: HydratedFilterRule<FItem, any>[];
    isActive: (identifier: string | FilterRule | HydratedFilterRule) => boolean;
    get: (identifier: string | FilterRule | HydratedFilterRule) => any;
    has: (identifier: string | FilterRule | HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
    getRule: (id: string) => HydratedFilterRule<FItem, any> | undefined;
};
declare function filtersInterface<FItem>(mixin: FiltersMixin<FItem>): {
    toggle(identifier: string | FilterRule | HydratedFilterRule): void;
    toggleOption: (identifier: string | FilterRule | HydratedFilterRule, optionValue: import("../..").FilterOption | any) => void;
    set: (identifier: FilterRule | HydratedFilterRule | string, incomingFilterValue: any) => void;
    delete: (identifier: string | FilterRule | HydratedFilterRule) => void;
    test: (options: import("../../types").FilterTestOptions) => FItem[];
    testRule: ({ rule: identifier, value, ...options }: import("../../types").FilterTestRuleOptions) => FItem[];
    testRuleOptions: ({ rule: identifier, ...options }: import("../../types").FilterTestRuleOptionsOptions) => Map<any, any>;
    filters: Record<string, any>;
    raw: Record<string, any>;
    activeRules: HydratedFilterRule<FItem, any>[];
    rules: HydratedFilterRule<FItem, any>[];
    isActive: (identifier: string | FilterRule | HydratedFilterRule) => boolean;
    get: (identifier: string | FilterRule | HydratedFilterRule) => any;
    has: (identifier: string | FilterRule | HydratedFilterRule, optionValue?: import("../..").FilterOption | any) => any;
    getRule: (id: string) => HydratedFilterRule<FItem, any> | undefined;
};
export { readonlyFiltersInterface, filtersInterface };
