import { HydratedFilterRule } from "../types/rule-types";
export declare function makeFilter(rule: HydratedFilterRule): {
    validate(value: unknown): boolean;
    parse(value: unknown): any;
    has(value: unknown): any;
    toggle(value: unknown, optionValue?: any): boolean;
    isActive(value: unknown): boolean;
} | {
    validate(value: unknown): boolean;
    parse(value: unknown): any[];
    has(value: unknown, optionValue?: any): boolean;
    toggle(value: unknown, optionValue?: any): any[];
    isActive(value: unknown): boolean;
};
