import { FilterRule, FinderOption, HydratedFilterRule } from "../../types";
import { FiltersMixin } from "./filters";
/**
 * Public surface for the Filters mixin
 */
declare function filtersAPI<FItem>(mixin: FiltersMixin<FItem>): {
    value: Record<string, any>;
    activeRules: HydratedFilterRule<FItem, any>[];
    activeRuleIds: any[];
    rules: HydratedFilterRule<FItem, any>[];
    isActive: (identifier: string | FilterRule | HydratedFilterRule) => boolean;
    toggle(identifier: string | FilterRule | HydratedFilterRule): void;
    toggleOption: (identifier: string | FilterRule | HydratedFilterRule, optionValue: FinderOption | any) => void;
    get: (identifier: string | FilterRule | HydratedFilterRule) => any;
    set: (identifier: FilterRule | HydratedFilterRule | string, incomingFilterValue: any) => void;
    has: (identifier: string | FilterRule | HydratedFilterRule, optionValue?: FinderOption | any) => any;
    delete: (identifier: string | FilterRule | HydratedFilterRule) => void;
    test: (identifier: string | FilterRule | HydratedFilterRule, filterValue: any, incomingMeta?: import("../../types").FinderMeta | undefined) => FItem[];
    testOptions: (identifier: FilterRule | HydratedFilterRule | string, meta?: import("../../types").FinderMeta | undefined) => Map<boolean | FinderOption<any>, FItem[]>;
};
export { filtersAPI };
