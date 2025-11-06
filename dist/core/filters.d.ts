import { FilterRuleUnionDefinition, FilterRuleUnionHydratedDefinition, FilterRuleWithBooleanValue, FilterRuleWithMultipleValues, FilterTestOptions, FilterTestRuleOptions } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedFiltersMixin } from "./types/core-types";
import { FilterRuleDefinition } from "..";
interface InitialValues {
    initialFilters: Record<string, any> | undefined;
}
type FilterRuleIdentifier = string | FilterRuleUnionDefinition | FilterRuleUnionHydratedDefinition;
declare class FiltersMixin {
    #private;
    constructor({ initialFilters }: InitialValues, deps: MixinInjectedDependencies);
    set<FValue>(identifier: Omit<FilterRuleWithMultipleValues<any, FValue>, "options">, value?: FValue[]): void;
    set<FValue>(identifier: Omit<FilterRuleDefinition<any, FValue>, "options">, value?: FValue): void;
    set(identifier: string, value?: unknown): void;
    get rules(): FilterRuleUnionHydratedDefinition<unknown>[];
    get activeRules(): FilterRuleUnionHydratedDefinition<unknown>[];
    get(identifier: FilterRuleIdentifier): any;
    has(identifier: FilterRuleIdentifier, optionValue?: any): boolean;
    getRule(identifier: FilterRuleIdentifier): import("./types/rule-types").FilterRuleWithBooleanValueAndHydratedOptions<any, any, any> | import("./types/rule-types").FilterRuleWithMultipleValuesAndHydratedOptions<any, any, any> | import("./types/rule-types").FilterRuleWithSingleValueAndHydratedOptions<any, any, any>;
    add<FValue>(identifier: Omit<FilterRuleWithMultipleValues<any, FValue>, "options">, optionValue?: FValue): void;
    add(identifier: string, optionValue?: unknown): void;
    delete<FValue>(identifier: Omit<FilterRuleWithMultipleValues<any, FValue>, "options">, optionValue?: FValue): void;
    delete(identifier: string, optionValue?: unknown): void;
    delete(identifier: Omit<FilterRuleDefinition, "options">, optionValue?: never): void;
    isRuleActive(identifier: FilterRuleIdentifier): boolean;
    toggle(identifier: string, optionValue?: any): void;
    toggle<FValue extends boolean>(identifier: FilterRuleWithBooleanValue<any, FValue>): void;
    toggle<FValue>(identifier: FilterRuleWithMultipleValues<any, FValue>, optionValue?: FValue): void;
    reset(): void;
    test(options: FilterTestOptions): any[];
    testRule({ rule: identifier, value, ...options }: FilterTestRuleOptions): any[];
    testRuleOptions(identifier: FilterRuleIdentifier, isAdditive?: boolean): Map<any, any>;
    get values(): Record<string, any>;
    get raw(): Record<string, any>;
    serialize(): SerializedFiltersMixin;
    static process<FItem>(options: SerializedFiltersMixin, items: FItem[], context: any): FItem[];
}
export { FiltersMixin };
