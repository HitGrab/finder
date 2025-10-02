import { HydratedFilterRule } from "../types/rule-types";
export declare function SingleFilter(rule: HydratedFilterRule): {
    validate(): boolean;
    parse(value: unknown): any;
    has(value: unknown): value is {} | null;
    toggle(value: unknown, optionValue?: any): never;
    add(value: unknown, optionValue: any): never;
    delete(value: unknown, optionValue?: any): undefined;
    isActive(value: unknown): boolean;
};
