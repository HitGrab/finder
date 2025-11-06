import { FilterRuleWithSingleValue, HydratedFilterRuleDefinition } from "../types/rule-types";
export declare function SingleFilterHandler(definition: HydratedFilterRuleDefinition & FilterRuleWithSingleValue): {
    validate(value: unknown): boolean;
    parse(value: unknown): any;
    has(value: unknown): value is {} | null;
    toggle(value: unknown, optionValue?: any): never;
    add(value: unknown, optionValue: any): never;
    delete(value: unknown, optionValue?: any): undefined;
    isActive(value: unknown): boolean;
    isMatch(item: unknown, value: unknown, context: unknown): boolean;
};
