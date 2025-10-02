import { HydratedFilterRule } from "../types/rule-types";
export declare function MultipleFilter(rule: HydratedFilterRule): {
    validate(value: unknown): boolean;
    parse(value: unknown): any[];
    has(value: unknown, optionValue?: any): boolean;
    toggle(value: unknown, optionValue?: any): any[];
    add(value: unknown, optionValue: any): any[];
    delete(value: unknown, optionValue?: any): any[] | undefined;
    isActive(value: unknown): boolean;
};
