import { HydratedFilterRule, FilterOption, FilterTestOptions, FilterTestRuleOptions, FilterTestRuleOptionsOptions, FilterRuleUnion, InjectedContext } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialFilters: Record<string, any> | undefined;
};
declare class FiltersMixin {
    #private;
    filters: Record<string, any>;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies);
    set<FItem, FValue>(identifier: FilterRuleUnion<FItem, FValue> | HydratedFilterRule<FItem, FValue> | string, incomingFilterValue: FValue | FValue[]): void;
    get rules(): HydratedFilterRule<any, any>[];
    clearHydratedRules(): void;
    getRule<FItem = any, FValue = any>(identifier: FilterRuleUnion<FItem, FValue> | HydratedFilterRule<FItem, FValue> | string): HydratedFilterRule<FItem, FValue>;
    get activeRules(): HydratedFilterRule<any, any>[];
    get(identifier: string | FilterRuleUnion | HydratedFilterRule): any;
    has(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue?: FilterOption | any): any;
    delete(identifier: string | FilterRuleUnion | HydratedFilterRule): void;
    isActive(identifier: string | FilterRuleUnion | HydratedFilterRule): boolean;
    toggle(identifier: string | FilterRuleUnion | HydratedFilterRule): void;
    toggleOption(identifier: string | FilterRuleUnion | HydratedFilterRule, optionValue: FilterOption | any): void;
    test(options: FilterTestOptions): any[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): any[];
    testRuleOptions({ rule: identifier, ...options }: FilterTestRuleOptionsOptions): Map<any, any>;
    getFilters(): Record<string, any>;
    process(items: any[], context?: InjectedContext): any[];
    static process<FItem>(items: FItem[], rules: HydratedFilterRule[], values: Record<string, any>, context?: InjectedContext): FItem[];
    static isActive(rule: FilterRuleUnion | HydratedFilterRule, value: any): boolean;
}
export { FiltersMixin };
