import { HydratedFilterRule } from "../types/rule-types";
export declare function BooleanFilter(rule: HydratedFilterRule): {
    validate(value: unknown): boolean;
    parse(value: unknown): any;
    has(value: unknown): any;
    toggle(value: unknown, optionValue?: any): boolean;
    isActive(value: unknown): boolean;
};
