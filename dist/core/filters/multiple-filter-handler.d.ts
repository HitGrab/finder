import { HydratedFilterRuleDefinition, FilterRuleWithMultipleValues } from "../types/rule-types";
export declare function MultipleFilterHandler(definition: HydratedFilterRuleDefinition & FilterRuleWithMultipleValues): {
    validate(value: unknown): boolean;
    parse(value: unknown): any[];
    has(value: unknown, optionValue?: any): boolean;
    toggle(value: unknown, optionValue?: any): any[];
    add(value: unknown, optionValue: any): any[];
    delete(value: unknown, optionValue?: any): any[] | undefined;
    isActive(value: unknown): boolean;
    isMatch(item: any, value: unknown, context: unknown): boolean;
};
