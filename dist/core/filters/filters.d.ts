import { HydratedFilterRule, FilterRule, FilterOption, FilterTestOptions, FilterTestRuleOptions, FilterTestRuleOptionsOptions, MetaInterface } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialFilters: Record<string, any> | undefined;
};
declare class FiltersMixin {
    #private;
    filters: Record<string, any>;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies);
    set<FItem, FValue>(identifier: FilterRule<FItem, FValue> | HydratedFilterRule<FItem, FValue> | string, incomingFilterValue: FValue | FValue[]): void;
    get rules(): HydratedFilterRule[];
    clearHydratedRules(): void;
    getRule<FItem = any, FValue = any>(identifier: FilterRule<FItem, FValue> | HydratedFilterRule<FItem, FValue> | string): HydratedFilterRule<FItem, FValue>;
    get activeRules(): HydratedFilterRule[];
    get(identifier: string | FilterRule | HydratedFilterRule): any;
    has(identifier: string | FilterRule | HydratedFilterRule, optionValue?: FilterOption | any): any;
    delete(identifier: string | FilterRule | HydratedFilterRule): void;
    isActive(identifier: string | FilterRule | HydratedFilterRule): boolean;
    toggle(identifier: string | FilterRule | HydratedFilterRule): void;
    toggleOption(identifier: string | FilterRule | HydratedFilterRule, optionValue: FilterOption | any): void;
    test(options: FilterTestOptions): any[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): any[];
    testRuleOptions({ rule: identifier, ...options }: FilterTestRuleOptionsOptions): Map<any, any>;
    getFilters(): Record<string, any>;
    process(items: any[], meta: MetaInterface): any[];
    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, meta: MetaInterface): FItem[];
    static isActive(rule: FilterRule | HydratedFilterRule, value: any): boolean;
}
export { FiltersMixin };
