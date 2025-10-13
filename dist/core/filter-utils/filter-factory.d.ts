import { HydratedFilterRule } from "../types/rule-types";
export declare function makeFilter(rule: HydratedFilterRule): {
    validate(value: unknown): boolean;
    parse(value: unknown): any;
    has(value: unknown): any;
    toggle(value: unknown, optionValue?: any): boolean;
    add(value: unknown, optionValue: any): never;
    delete(value: unknown, optionValue?: any): undefined;
    isActive(value: unknown): boolean;
} | {
    validate(value: unknown): boolean;
    parse(value: unknown): any[];
    has(value: unknown, optionValue?: any): boolean;
    toggle(value: unknown, optionValue?: any): any[];
    add(value: unknown, optionValue: any): any[];
    delete(value: unknown, optionValue?: any): any[] | undefined;
    isActive(value: unknown): boolean;
};
