import { HydratedFilterRuleDefinition, FilterRuleWithBooleanValue } from "../types/rule-types";
export declare function BooleanFilterHandler(definition: HydratedFilterRuleDefinition & FilterRuleWithBooleanValue): {
    validate(value: unknown): boolean;
    parse(value: unknown): boolean;
    has(value: unknown): boolean;
    toggle(value: unknown, optionValue?: any): boolean;
    add(value: unknown, optionValue: any): never;
    delete(value: unknown, optionValue?: any): undefined;
    isActive(value: unknown): boolean;
    isMatch(item: unknown, value: unknown, context: unknown): boolean;
};
