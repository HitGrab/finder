import { FinderFilterRule, FinderOption, FinderMeta, isFilterRule, isFinderOption, FinderInjectedHandlers } from "../types";
import { DebounceCallbackRegistry } from "../utils/debounce-callback-registry";
import { getRuleFromIdentifier } from "../utils/finder-utils";
import { findItemMatches } from "../utils/matcher";

type OptionOrOptionValue = FinderOption | any;

class FinderFilters<FItem> {
    #filters: Record<string, any>;

    #handlers: FinderInjectedHandlers<FItem>;

    #debouncer = new DebounceCallbackRegistry();

    constructor(initialFilters: Record<string, any> | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#filters = initialFilters || {};
        this.#handlers = handlers;
    }

    #wrappedSetFilter(rule: FinderFilterRule<FItem>, incomingFilterValue: any) {
        if (this.#debouncer.has(rule.id) === false) {
            this.#debouncer.register(rule.id, rule?.debounceDelay);
        }

        this.#debouncer.call(rule.id, () => {
            if (this.#handlers.isDisabled()) {
                return;
            }
            this.#handlers.onInit();

            // early exit if nothing changed
            if (this.#filters?.[rule.id] !== undefined && this.#filters[rule.id] === incomingFilterValue) {
                return;
            }

            this.#filters = { ...this.#filters, [rule.id]: incomingFilterValue };
            this.#handlers.onChange({ filters: this.#filters });
        });
    }

    get value() {
        return this.#filters;
    }

    get rules() {
        return this.#handlers.getRules().filter(isFilterRule);
    }

    set(identifier: FinderFilterRule | string, incomingFilterValue: any) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule) {
            this.#wrappedSetFilter(rule, incomingFilterValue);
        }
    }

    get(identifier: FinderFilterRule | string) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        return this.#filters?.[rule.id];
    }

    delete(identifier: FinderFilterRule | string) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        this.#wrappedSetFilter(rule, undefined);
    }

    toggle(identifier: FinderFilterRule | string) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        if (!rule.is_boolean) {
            throw new Error("Finder could not toggle this filter rule, as it is not boolean.");
        }

        const filterValue = this.#filters?.[rule.id];
        this.#wrappedSetFilter(rule, !filterValue);
    }

    toggleOption(identifier: FinderFilterRule | string, optionValue: FinderOption | any) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        if (rule.options === undefined) {
            throw new Error("Finder could not toggle this filter rule option, as the filter does not have any options.");
        }
        if (!!rule?.multiple === false) {
            throw new Error(
                "Finder could not toggle this filter rule option, as the rule does not allow multiple values. Consider using filters.set() or filters.toggle() instead.",
            );
        }

        const option = getOptionFromIdentifier(optionValue, rule.options, this.#handlers.getMeta());

        const previousFilterValue: any[] = this.#filters?.[rule.id] ?? [];

        if (previousFilterValue.includes(option.value)) {
            this.#wrappedSetFilter(rule, [...previousFilterValue.filter((value) => value !== option.value)]);
            return;
        }

        this.#wrappedSetFilter(rule, [...previousFilterValue, option.value]);
    }

    test(identifier: FinderFilterRule | string, filterValue: any, incomingMeta = this.#handlers.getMeta()) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }
        const testSnapshot = { filters: { [rule.id]: filterValue }, meta: incomingMeta };
        const items = this.#handlers.getItems();
        if (!items) {
            return [];
        }
        return findItemMatches(items, [rule], testSnapshot);
    }

    testOptions(identifier: FinderFilterRule | string, incomingMeta = this.#handlers.getMeta()) {
        const rule = getRuleFromIdentifier<FinderFilterRule>(identifier, this.rules);
        const resultMap = new Map<FinderOption | boolean, FItem[]>();
        const items = this.#handlers.getItems();

        if (rule === undefined) {
            throw new Error("Finder could not locate a rule for this filter.");
        }

        if (rule.is_boolean === true) {
            // enforce result shape
            resultMap.set(true, []);
            resultMap.set(false, []);

            if (items) {
                const options = [true, false];
                options.forEach((option) => {
                    const testSnapshot = { filters: { [rule.id]: option }, meta: incomingMeta };
                    resultMap.set(option, findItemMatches(items, [rule], testSnapshot));
                });
            }
            return resultMap;
        }

        if (Array.isArray(rule.options)) {
            // enforce result shape
            rule.options.forEach((option) => {
                resultMap.set(option, []);
            });

            if (items) {
                rule.options.forEach((option) => {
                    const testSnapshot = { filters: { [rule.id]: option.value }, meta: incomingMeta };
                    resultMap.set(option, findItemMatches(items, [rule], testSnapshot));
                });
            }

            return resultMap;
        }

        // if the filter is not a boolean and doesn't have defined options, there's nothing to test.
        throw new Error("Finder was unable to test the options for this filter rule. It must be a boolean or have defined options.");
    }
}

function getOptionFromIdentifier(
    optionOrOptionValue: OptionOrOptionValue,
    options: FinderOption[] | ((meta?: FinderMeta) => FinderOption[]) | undefined,
    meta?: FinderMeta,
) {
    let option: OptionOrOptionValue | any;

    let composedOptions: FinderOption[] = [];
    if (typeof options === "function") {
        composedOptions = options(meta);
    }
    if (Array.isArray(options)) {
        composedOptions = options;
    }

    if (isFinderOption(optionOrOptionValue)) {
        option = composedOptions?.find((row) => row === optionOrOptionValue);
        if (option === undefined) {
            throw new Error(`Finder could not locate the option for ${optionOrOptionValue}.`);
        }
        return option;
    }

    option = composedOptions?.find(({ value }) => value === optionOrOptionValue);
    if (option === undefined) {
        throw new Error(`Finder could not locate the option for ${optionOrOptionValue}.`);
    }
    return option;
}

export { FinderFilters };
