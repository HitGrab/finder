import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { HydratedFilterRuleDefinition, FilterRuleWithBooleanValue } from "../types/rule-types";

export function BooleanFilterHandler(definition: HydratedFilterRuleDefinition & FilterRuleWithBooleanValue) {
    return {
        validate(value: unknown) {
            if (value !== undefined && typeof value !== "boolean") {
                throw new FinderError(ERRORS.SETTING_BOOLEAN_FILTER_WITHOUT_BOOLEAN_VALUE, { rule: definition, value });
            }
            return true;
        },

        parse(value: unknown) {
            if (value === undefined) {
                if (definition.required) {
                    return true;
                }
                if (typeof definition.defaultValue === "boolean") {
                    return definition.defaultValue;
                }
                return false;
            }

            // reject invalid shapes
            if (typeof value !== "boolean") {
                return false;
            }
            return value;
        },

        has(value: unknown) {
            return this.parse(value);
        },

        toggle(value: unknown, optionValue?: any) {
            if (optionValue !== undefined) {
                throw new FinderError(ERRORS.TOGGLING_BOOLEAN_FILTER_WITH_UNUSED_VALUE, { rule: definition, value });
            }
            const parsedValue = this.parse(value);
            return !parsedValue;
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
            return this.parse(value);
        },

        isMatch(item: unknown, value: unknown, context: unknown) {
            return definition.filterFn(item, value as boolean, context);
        },
    };
}
