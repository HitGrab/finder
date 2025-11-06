import { FilterRuleUnionHydratedDefinition } from "../types/rule-types";
export declare function makeFilterHandler(definition: FilterRuleUnionHydratedDefinition): {
    validate(value: unknown): boolean;
    parse(value: unknown): boolean;
    has(value: unknown): boolean;
    toggle(value: unknown, optionValue?: any): boolean;
    add(value: unknown, optionValue: any): never;
    delete(value: unknown, optionValue?: any): undefined;
    isActive(value: unknown): boolean;
    isMatch(item: unknown, value: unknown, context: unknown): boolean;
} | {
    validate(value: unknown): boolean;
    parse(value: unknown): any[];
    has(value: unknown, optionValue?: any): boolean;
    toggle(value: unknown, optionValue?: any): any[];
    add(value: unknown, optionValue: any): any[];
    delete(value: unknown, optionValue?: any): any[] | undefined;
    isActive(value: unknown): boolean;
    isMatch(item: any, value: unknown, context: unknown): boolean;
} | {
    validate(value: unknown): boolean;
    parse(value: unknown): any;
    has(value: unknown): value is {} | null;
    toggle(value: unknown, optionValue?: any): never;
    add(value: unknown, optionValue: any): never;
    delete(value: unknown, optionValue?: any): undefined;
    isActive(value: unknown): boolean;
    isMatch(item: unknown, value: unknown, context: unknown): boolean;
};
