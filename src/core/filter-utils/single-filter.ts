/* eslint-disable @typescript-eslint/no-unused-vars */
import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { HydratedFilterRule } from "../types/rule-types";

export function SingleFilter(rule: HydratedFilterRule) {
    return {
        validate() {
            return true;
        },
        parse(value: unknown) {
            if (value === undefined && rule.required) {
                if (rule.defaultValue) {
                    return rule.defaultValue;
                }
                if (Array.isArray(rule.options) && rule.options.length > 0) {
                    return rule.options.at(0)?.value;
                }
            }
            return value;
        },
        has(value: unknown) {
            return value !== undefined;
        },
        toggle(value: unknown, optionValue?: any) {
            throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, { rule, value, optionValue });
        },
        add(value: unknown, optionValue: any) {
            throw new FinderError(ERRORS.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule, value, optionValue });
        },
        delete(value: unknown, optionValue?: any) {
            if (optionValue !== undefined) {
                throw new FinderError(ERRORS.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule, value, optionValue });
            }
            return undefined;
        },
        isActive(value: unknown) {
            if (rule.required) {
                return true;
            }

            if (value === undefined) {
                return false;
            }

            // Empty strings are considered inactive.
            if (typeof value === "string" && value.trim() === "") {
                return false;
            }
            return true;
        },
    };
}
