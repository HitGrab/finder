import { HydratedFilterRule } from "../types/rule-types";
export declare function MultipleFilter(rule: HydratedFilterRule): {
    validate(value: unknown): boolean;
    parse(value: unknown): any[];
    has(value: unknown, optionValue?: any): boolean;
    toggle(value: unknown, optionValue?: any): any[];
    isActive(value: unknown): boolean;
};
