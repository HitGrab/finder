import { AnyFilterRuleDefinition, FilterOption, FilterTestOptions, FilterTestRuleOptions } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "./types/core-types";
interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}
type FilterRuleIdentifier<FValue = any> = string | AnyFilterRuleDefinition<any, FValue>;
declare class FiltersMixin {
    #private;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies);
    set<FValue>(identifier: FilterRuleIdentifier<FValue>, value?: FValue | FValue[]): void;
    get rules(): import("./types/rule-types").HydratedFilterRuleDefinition<any, any, any>[];
    get activeRules(): import("./types/rule-types").HydratedFilterRuleDefinition<any, any, any>[];
    get(identifier: FilterRuleIdentifier): any;
    has(identifier: FilterRuleIdentifier, optionValue?: any): boolean;
    getRule(identifier: FilterRuleIdentifier): import("./types/rule-types").HydratedFilterRuleDefinition<any, any, any>;
    add<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void;
    delete<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void;
    toggle<FValue>(identifier: FilterRuleIdentifier<FValue>, optionValue?: FValue | FilterOption<FValue>): void;
    reset(): void;
    isRuleActive(identifier: FilterRuleIdentifier): boolean;
    test(options: FilterTestOptions): any[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): any[];
    testRuleOptions(identifier: FilterRuleIdentifier, isAdditive?: boolean): Map<any, any>;
    get values(): Record<string, any>;
    get raw(): Record<string, any>;
    serialize(): SerializedFiltersMixin;
    static process<FItem>(options: SerializedFiltersMixin, items: FItem[], context: any): FItem[];
}
export { FiltersMixin };
