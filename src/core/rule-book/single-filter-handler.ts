import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { FilterRuleWithSingleValue, HydratedFilterRuleDefinition } from "../types/rule-types";

export function SingleFilterHandler(definition: HydratedFilterRuleDefinition & FilterRuleWithSingleValue) {
    return {
        validate(value: unknown) {
            if (definition.strictOptions && Array.isArray(definition.options)) {
                const hasMatchingOptionValue = definition.options.find((option) => {
                    return option.value === value;
                });
                if (hasMatchingOptionValue === undefined) {
                    throw new FinderError(ERRORS.NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS, { rule: definition, value });
                }
            }
            return true;
        },

        parse(value: unknown) {
            if (value === undefined && definition.required) {
                if (definition.defaultValue) {
                    return definition.defaultValue;
                }
                if (Array.isArray(definition.options) && definition.options.length > 0) {
                    return definition.options.at(0)?.value;
                }
            }
            return value;
        },

        has(value: unknown) {
            return value !== undefined;
        },

        toggle(value: unknown, optionValue?: any) {
            throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_SINGLE_VALUE, { rule: definition, value, optionValue });
        },

        add(value: unknown, optionValue: any) {
            throw new FinderError(ERRORS.ADDING_OPTION_VALUE_TO_NON_MULTIPLE_FILTER, { rule: definition, value, optionValue });
        },

        delete(value: unknown, optionValue?: any) {
            if (optionValue !== undefined) {
                throw new FinderError(ERRORS.DELETING_OPTION_VALUE_FROM_NON_MULTIPLE_FILTER, { rule: definition, value, optionValue });
            }
            return undefined;
        },

        isActive(value: unknown) {
            if (definition.required) {
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

        isMatch(item: unknown, value: unknown, context: unknown) {
            return definition.filterFn(item, value, context);
        },
    };
}
