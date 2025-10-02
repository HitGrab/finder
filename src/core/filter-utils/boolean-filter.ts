import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { HydratedFilterRule } from "../types/rule-types";

export function BooleanFilter(rule: HydratedFilterRule) {
    return {
        validate(value: unknown) {
            if (value !== undefined && typeof value !== "boolean") {
                throw new FinderError(ERRORS.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule, value });
            }
            return true;
        },
        parse(value: unknown) {
            if (value === undefined) {
                if (rule.required) {
                    return true;
                }
                if (rule.defaultValue !== undefined) {
                    return rule.defaultValue;
                }
                return false;
            }
            return value;
        },
        has(value: unknown) {
            return this.parse(value);
        },
        toggle(value: unknown, optionValue?: any) {
            const parsedValue = this.parse(value);

            if (typeof parsedValue !== "boolean") {
                throw new FinderError(ERRORS.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule, value: parsedValue, optionValue });
            }
            return !parsedValue;
        },
        isActive(value: unknown) {
            if (rule.required) {
                return true;
            }

            const parsedValue = this.parse(value);
            return parsedValue === true;
        },
    };
}
