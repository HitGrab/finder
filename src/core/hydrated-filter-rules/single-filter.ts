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
        toggle(optionValue?: any) {
            throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, { rule, optionValue });
        },
    };
}
