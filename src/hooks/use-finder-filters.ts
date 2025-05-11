import { useState } from "react";
import { FinderFilterDefinition, FinderFilterOption, FinderMeta, FinderStateSnapshot } from "../types";
import { composeFilterValuesWithSideEffects, findItems } from "../utils/finder-logic";
import { finderConfig } from "../utils/finder-config";

interface useFinderFiltersOptions<FItem> {
    initialFilterState: FinderStateSnapshot["filters"];
    definitions?: FinderFilterDefinition<FItem>[];
    maxSelectedItems?: number;
    meta?: FinderMeta;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
function useFinderFilters<FItem>(items: FItem[] | null | undefined, options: useFinderFiltersOptions<FItem>) {
    const [filters, setFilters] = useState<FinderStateSnapshot["filters"]>(options.initialFilterState);

    function wrappedSetFilter(filterIdentifier: string, incomingFilterState: any) {
        options.onInit && options.onInit();
        const filterDefinition = options?.definitions?.find(({ id }) => filterIdentifier === id);
        if (filterDefinition === undefined) {
            throw new Error(`Finder could not locate the filter definition for ${filterIdentifier}.`);
        }

        // early exit if nothing changed
        if (filters?.[filterIdentifier] !== undefined && filters[filterIdentifier] === incomingFilterState) {
            return;
        }

        if (options.definitions) {
            const currentFilters = composeFilterValuesWithSideEffects(filterIdentifier, incomingFilterState, options.definitions, filters);
            setFilters(currentFilters);
            options.onChange({ filters: currentFilters });
        }
    }

    return {
        state: filters,
        definitions: options?.definitions,
        set: wrappedSetFilter,
        get: (filterIdentifier: string) => filters?.[filterIdentifier],
        delete: (filterIdentifier: string) => wrappedSetFilter(filterIdentifier, undefined),
        toggle: (filterIdentifier: string) => {
            const filterDefinition = options.definitions?.find(({ id }) => id === filterIdentifier);
            if (filterDefinition) {
                if (!filterDefinition.is_boolean) {
                    throw new Error("Finder Error: trying to toggle non-boolean filter.");
                }

                const filterState = filters?.[filterIdentifier];
                wrappedSetFilter(filterIdentifier, !filterState);
            }
        },
        test: (filterDefinition: FinderFilterDefinition<FItem>, filterState: any, incomingMeta = options.meta) => {
            const testConfig = finderConfig({ filters: [filterDefinition] });
            const testSnapshot = { filters: { [filterDefinition.id]: filterState }, meta: incomingMeta };
            if (!items) {
                return [];
            }
            return findItems(items, testConfig, testSnapshot);
        },
        testOptions: (filterDefinition: FinderFilterDefinition<FItem>, incomingMeta = options.meta) => {
            const resultMap = new Map<FinderFilterOption | boolean, any>();
            const testConfig = finderConfig({ filters: [filterDefinition] });

            if (filterDefinition.is_boolean === true) {
                // enforce result shape
                resultMap.set(true, undefined);
                resultMap.set(false, undefined);

                if (items) {
                    const options = [true, false];
                    options.forEach((option) => {
                        const testSnapshot = { filters: { [filterDefinition.id]: option }, meta: incomingMeta };
                        resultMap.set(option, findItems(items, testConfig, testSnapshot).length);
                    });
                }
                return resultMap;
            }

            if (Array.isArray(filterDefinition.options)) {
                // enforce result shape
                filterDefinition.options.forEach((option) => {
                    resultMap.set(option, undefined);
                });

                if (items) {
                    filterDefinition.options.forEach((option) => {
                        const testSnapshot = { filters: { [filterDefinition.id]: option.value }, meta: incomingMeta };
                        resultMap.set(option, findItems(items, testConfig, testSnapshot).length);
                    });
                }

                return resultMap;
            }

            // if the filter is not a boolean and doesn't have defined options, there's nothing to test.
            throw new Error("Finder was unable to test the options for this filter definition. It must be a boolean or have defined options.");
        },
    };
}

export { useFinderFilters };
