import { FilterOption, FilterRule, FilterRuleUnion, FilterTestOptions, FilterTestRuleOptions, FilterTestRuleOptionsOptions, HydratedFilterRule } from "../types/rule-types";
import { MixinInjectedDependencies } from "../types/core-types";
type InitialValues = {
    initialFilters: Record<string, any> | undefined;
};
declare class FiltersMixin {
    #private;
    filters: Record<string, any>;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies);
    set<FItem, FValue>(identifier: FilterRuleUnion<FItem, FValue> | HydratedFilterRule<FItem, FValue> | string, incomingFilterValue: FValue | FValue[]): void;
    get rules(): HydratedFilterRule<unknown, any, any>[];
    get activeRules(): HydratedFilterRule<unknown, any, any>[];
    get(identifier: string | FilterRuleUnion | HydratedFilterRule): any;
    has(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue?: FilterOption | any): any;
    getRule(identifier: string | FilterRuleUnion | HydratedFilterRule): HydratedFilterRule<any, any, any> | undefined;
    delete(identifier: string | FilterRuleUnion | HydratedFilterRule): void;
    isActive(identifier: string | FilterRuleUnion | HydratedFilterRule): boolean;
    toggle(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue?: FilterOption | any): void;
    test(options: FilterTestOptions): any[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): any[];
    testRuleOptions({ rule: identifier, ...options }: FilterTestRuleOptionsOptions): Map<any, any>;
    getValues(): Record<string, any>;
    process(items: any[], context?: any): any[];
    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, context?: any): FItem[];
    static isActive(rule: FilterRuleUnion | HydratedFilterRule, value: any): boolean;
    static hydrateRule<FItem = any, FContext = any>(rule: FilterRule, items: FItem[], context: FContext): HydratedFilterRule;
}
export { FiltersMixin };
