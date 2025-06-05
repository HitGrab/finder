import { HydratedFilterRule, FilterRule, FinderMeta, FinderOption, FilterTestOptions, FilterTestRuleOptions, FilterTestRuleOptionsOptions } from "../../types";
import { MixinInjectedDependencies } from "../types/core-types";
type InitialValues = {
    initialFilters: Record<string, any> | undefined;
};
declare class FiltersMixin<FItem> {
    #private;
    filters: Record<string, any>;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    set(identifier: FilterRule | HydratedFilterRule | string, incomingFilterValue: any): void;
    get rules(): HydratedFilterRule<FItem, any>[];
    get activeRules(): HydratedFilterRule<FItem, any>[];
    get activeRuleIds(): string[];
    get(identifier: string | FilterRule | HydratedFilterRule): any;
    has(identifier: string | FilterRule | HydratedFilterRule, optionValue?: FinderOption | any): any;
    isActive(identifier: string | FilterRule | HydratedFilterRule): boolean;
    toggleOption(identifier: string | FilterRule | HydratedFilterRule, optionValue: FinderOption | any): void;
    test(options: FilterTestOptions): FItem[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): FItem[];
    testRuleOptions({ rule: identifier, ...options }: FilterTestRuleOptionsOptions): Map<boolean | FinderOption<any>, FItem[]>;
    getFilters(): Record<string, any>;
    process(items: FItem[], meta?: FinderMeta): FItem[];
    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, meta?: FinderMeta): FItem[];
    static isActive(rule: FilterRule | HydratedFilterRule, value: any): boolean;
}
export { FiltersMixin };
