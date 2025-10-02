import { FilterRuleUnion, FilterTestOptions, FilterTestRuleOptions, FilterTestRuleOptionsOptions, HydratedFilterRule } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "./types/core-types";
interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}
type FilterRuleIdentifier = string | FilterRuleUnion | HydratedFilterRule;
declare class FiltersMixin {
    #private;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies);
    set<FValue>(identifier: FilterRuleIdentifier, value: FValue | FValue[]): void;
    get rules(): HydratedFilterRule<unknown, any, any>[];
    get activeRules(): HydratedFilterRule<unknown, any, any>[];
    get(identifier: FilterRuleIdentifier): any;
    has(identifier: FilterRuleIdentifier, optionValue?: any): boolean;
    getRule(identifier: FilterRuleIdentifier): HydratedFilterRule<any, any, any>;
    delete(identifier: FilterRuleIdentifier): void;
    isRuleActive(identifier: FilterRuleIdentifier): boolean;
    toggle(identifier: FilterRuleIdentifier, optionValue?: any): void;
    test(options: FilterTestOptions): any[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): any[];
    testRuleOptions({ rule: identifier, ...options }: FilterTestRuleOptionsOptions): Map<any, any>;
    get values(): Record<string, any>;
    get raw(): Record<string, any>;
    serialize(): SerializedFiltersMixin;
    static process<FItem>(options: SerializedFiltersMixin, items: FItem[], context?: any): FItem[];
}
export { FiltersMixin };
