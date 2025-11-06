import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { FilterRuleWithMultipleValues, HydratedFilterOptions } from "../types/rule-types";

export function MultipleFilterHandler(definition: FilterRuleWithMultipleValues & HydratedFilterOptions) {
    return {
        validate(value: unknown) {
            if (value !== undefined && Array.isArray(value) === false) {
                throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: definition, value });
            }
            if (definition.strictOptions && Array.isArray(definition.options) && Array.isArray(value)) {
                const hasMatchingOptionValues = value.every((row) => {
                    return definition.options?.some((option) => option.value === row);
                });
                if (hasMatchingOptionValues === false) {
                    throw new FinderError(ERRORS.NO_MATCHING_OPTION_FOUND_WITH_STRICT_OPTIONS, { rule: definition, value });
                }
            }
            return true;
        },

        parse(value: unknown) {
            if (value === undefined) {
                if (definition.required && Array.isArray(definition.options) && definition.options.length > 0) {
                    return [definition.options.at(0)?.value];
                }
                return [];
            }
            if (Array.isArray(value)) {
                return value;
            }
            throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: definition, value });
        },

        has(value: unknown, optionValue?: any): boolean {
            if (optionValue === undefined) {
                // test if any value is set
                return Array.isArray(value) && value.length > 0;
            } else if (Array.isArray(optionValue)) {
                // if an array was passed, recursively ensure every requirement is met
                return optionValue.every((optionIdentifier) => this.has(definition, optionIdentifier));
            }

            // test a single option
            const optionToTest = definition.options?.find((option) => {
                if (typeof optionValue === "object" && "value" in optionValue) {
                    return option.value === optionValue.value;
                }
                return option.value === optionValue;
            });
            return Array.isArray(value) && optionToTest !== undefined && value.includes(optionToTest.value);
        },

        toggle(value: unknown, optionValue?: any) {
            const parsedValue = this.parse(value);

            if (Array.isArray(parsedValue) === false) {
                throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule: definition, value: parsedValue });
            }
            if (optionValue === undefined) {
                throw new FinderError(ERRORS.TOGGLING_OPTION_WITHOUT_PASSING_OPTION, { rule: definition });
            }
            if (definition.options === undefined) {
                throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS, { rule: definition, optionValue });
            }

            const optionToToggle = definition.options.find((option) => {
                if (typeof optionValue === "object" && "value" in optionValue) {
                    return option.value === optionValue.value;
                }
                return option.value === optionValue;
            });
            if (optionToToggle === undefined) {
                throw new FinderError(ERRORS.TOGGLING_OPTION_THAT_DOES_NOT_EXIST, { rule: definition, optionValue });
            }

            if (parsedValue.includes(optionToToggle.value)) {
                return [...parsedValue.filter((row) => row !== optionToToggle.value)];
            }

            return [...parsedValue, optionToToggle.value];
        },

        add(value: unknown, optionValue: any) {
            const parsedValue = this.parse(value);
            if (optionValue === undefined) {
                throw new FinderError(ERRORS.ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE, { rule: definition, optionValue });
            }

            // check if the passed optionValue lines up with a predefined option
            const optionToToggle = definition.options?.find((option) => {
                if (typeof optionValue === "object" && "value" in optionValue) {
                    return option.value === optionValue.value;
                }
                return option.value === optionValue;
            });

            if (optionToToggle !== undefined) {
                if (parsedValue.includes(optionToToggle.value) === false) {
                    return [...parsedValue, optionToToggle.value];
                }
                return parsedValue;
            }

            // otherwise, add blind and hope for the best!
            return [...parsedValue, optionValue];
        },

        delete(value: unknown, optionValue?: any) {
            if (optionValue === undefined) {
                return undefined;
            }

            const parsedValue = this.parse(value);

            // check if the passed optionValue lines up with a predefined option
            const optionToToggle = definition.options?.find((option) => {
                if (typeof optionValue === "object" && "value" in optionValue) {
                    return option.value === optionValue.value;
                }
                return option.value === optionValue;
            });

            if (optionToToggle !== undefined && parsedValue.includes(optionToToggle.value)) {
                return parsedValue.filter((value) => value !== optionToToggle.value);
            }

            // otherwise, delete blind and hope for the best!
            return parsedValue.filter((row) => row !== optionValue);
        },

        isActive(value: unknown) {
            if (definition.required) {
                return true;
            }

            return this.parse(value).length > 0;
        },

        isMatch(item: any, value: unknown, context: unknown) {
            if (Array.isArray(value)) {
                return value.some((value: any) => definition.filterFn(item, value, context));
            }
            return false;
        },
    };
}
