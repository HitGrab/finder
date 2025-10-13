import { HydratedFilterRule } from "../types/rule-types";
export declare function BooleanFilter(rule: HydratedFilterRule): {
    validate(value: unknown): boolean;
    parse(value: unknown): any;
    has(value: unknown): any;
    toggle(value: unknown, optionValue?: any): boolean;
    add(value: unknown, optionValue: any): never;
    delete(value: unknown, optionValue?: any): undefined;
    isActive(value: unknown): boolean;
};
