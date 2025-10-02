import { ERRORS } from "../core-constants";
import { FinderError } from "../finder-error";
import { HydratedFilterRule } from "../types/rule-types";

export function MultipleFilter(rule: HydratedFilterRule) {
    return {
        validate(value: unknown) {
            if (value !== undefined && Array.isArray(value) === false) {
                throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule, value });
            }
            return true;
        },
        parse(value: unknown) {
            if (value === undefined) {
                if (rule.required && Array.isArray(rule.options) && rule.options.length > 0) {
                    return [rule.options.at(0)?.value];
                }
                return [];
            }
            if (Array.isArray(value)) {
                return value;
            }
            throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule, value });
        },
        has(value: unknown, optionValue?: any): boolean {
            if (optionValue === undefined) {
                // test if any value is set
                return Array.isArray(value) && value.length > 0;
            } else if (Array.isArray(optionValue)) {
                // if an array was passed, recursively ensure every requirement is met
                return optionValue.every((optionIdentifier) => this.has(rule, optionIdentifier));
            }

            // test a single option
            const optionToTest = rule.options?.find((option) => {
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
                throw new FinderError(ERRORS.SETTING_MULTIPLE_FILTER_WITHOUT_ARRAY, { rule, value: parsedValue });
            }
            if (optionValue === undefined) {
                throw new FinderError(ERRORS.TOGGLING_OPTION_WITHOUT_PASSING_OPTION, { rule });
            }
            if (rule.options === undefined) {
                throw new FinderError(ERRORS.TOGGLING_OPTION_ON_RULE_WITH_NO_OPTIONS, { rule, optionValue });
            }

            const optionToToggle = rule.options.find((option) => {
                if (typeof optionValue === "object" && "value" in optionValue) {
                    return option.value === optionValue.value;
                }
                return option.value === optionValue;
            });
            if (optionToToggle === undefined) {
                throw new FinderError(ERRORS.TOGGLING_OPTION_THAT_DOES_NOT_EXIST, { rule, optionValue });
            }

            if (parsedValue.includes(optionToToggle.value)) {
                return [...parsedValue.filter((row) => row !== optionToToggle.value)];
            }

            return [...parsedValue, optionToToggle.value];
        },
        add(value: unknown, optionValue: any) {
            const parsedValue = this.parse(value);
            if (optionValue === undefined) {
                throw new FinderError(ERRORS.ADDING_OPTION_TO_MULTIPLE_FILTER_WITHOUT_OPTION_VALUE, { rule, optionValue });
            }

            // check if the passed optionValue lines up with a predefined option
            const optionToToggle = rule.options?.find((option) => {
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
            const optionToToggle = rule.options?.find((option) => {
                if (typeof optionValue === "object" && "value" in optionValue) {
                    return option.value === optionValue.value;
                }
                return option.value === optionValue;
            });
            if (optionToToggle !== undefined && parsedValue.includes(optionToToggle.value)) {
                return parsedValue.filter((row) => row.value !== optionToToggle.value);
            }

            // otherwise, delete blind and hope for the best!
            return parsedValue.filter((row) => row !== optionValue);
        },
        isActive(value: unknown) {
            if (rule.required) {
                return true;
            }

            return this.parse(value).length > 0;
        },
    };
}
