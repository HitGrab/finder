/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { findResults, composeFilterValuesWithSideEffects, findItems } from "./finder-logic";
import { useFinderFactoryOptions, FinderCore, FinderStateSnapshot, FinderSortDirection, FinderFilterDefinition, FinderFilterOption } from "../types";
import { finderConfig } from "../utils/finderConfig";

/**
 * TODO:
 * Validate filter options
 * Filters need onChange recursive callback
 * 'prequisite' filter function?
 * debounce onChange?
 * Actually implement 'disabled'
 */

/**
 * Utility hook to store search, filter and sorting state.
 */
function useFinderFactory<FItem>(
    items: FItem[] | null | undefined,
    {
        config = {},
        initialValues,
        initialSelectedItems = [],
        initialMeta,
        page,
        numItemsPerPage,
        isLoading,
        disabled,
        onChange = () => {},
    }: useFinderFactoryOptions<FItem>,
): FinderCore<FItem> {
    const [searchTerm, setSearchTerm] = useState<FinderStateSnapshot["searchTerm"]>(initialValues?.searchTerm);
    const [filters, setFilters] = useState<FinderStateSnapshot["filters"]>(initialValues?.filters);
    const [sortBy, setSortBy] = useState<FinderStateSnapshot["sortBy"]>(initialValues?.sortBy);
    const [sortDirection, setSortDirection] = useState<FinderStateSnapshot["sortDirection"]>(initialValues?.sortDirection);
    const [groupBy, setGroupBy] = useState<FinderStateSnapshot["groupBy"]>(initialValues?.groupBy);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [meta, setMeta] = useState(initialMeta);
    const [selectedItems, setSelectedItems] = useState<FItem[]>(initialSelectedItems);

    return useMemo(() => {
        const defaultSortByDefinition = Array.isArray(config?.sortBy) ? config.sortBy.at(0) : undefined;
        const defaultGroupByDefinition = config?.requireGroup && Array.isArray(config.groupBy) ? config.groupBy?.at(0) : undefined;

        const snapshot: FinderStateSnapshot = {
            filters,
            sortBy: sortBy ?? defaultSortByDefinition?.id,
            groupBy: groupBy ?? defaultGroupByDefinition?.id,
            searchTerm,
            sortDirection,
            selectedItems,
            meta,
        };

        const results = findResults(items, config, snapshot, page, numItemsPerPage);
        const pagination =
            numItemsPerPage && Array.isArray(items) && page !== undefined && results.numTotalItems
                ? {
                      page,
                      lastPage: Math.ceil(results.numTotalItems / numItemsPerPage),
                      numItemsPerPage,
                      numTotalItems: results.numTotalItems,
                      disabled: false,
                  }
                : undefined;

        function onInit() {
            if (config?.onInit && !isInitialized) {
                config.onInit();
                setIsInitialized(true);
            }
        }

        function wrappedSetFilter(filterIdentifier: string, incomingFilterState: any) {
            onInit();
            const filterDefinition = config?.filters?.find(({ id }) => filterIdentifier === id);
            if (filterDefinition === undefined) {
                throw new Error(`Finder could not locate the filter definition for ${filterIdentifier}.`);
            }

            // early exit if nothing changed
            if (snapshot.filters?.[filterIdentifier] !== undefined && snapshot.filters[filterIdentifier] === incomingFilterState) {
                return;
            }

            if (config?.filters) {
                const currentFilters = composeFilterValuesWithSideEffects(filterIdentifier, incomingFilterState, config.filters, filters);
                setFilters(currentFilters);
                const diff = { filters: currentFilters };
                onChange(diff, { ...snapshot, ...diff });
            }
        }

        function wrappedSetGroupBy(groupByIdentifier?: string) {
            onInit();

            const groupByDefinition = config?.groupBy?.find(({ id }) => groupByIdentifier === id);
            if (groupByDefinition === undefined) {
                throw new Error(`Finder could not locate the groupBy definition for ${groupByIdentifier}.`);
            }

            // early exit if nothing changed
            if (snapshot.groupBy === groupByIdentifier) {
                return;
            }

            setGroupBy(groupByIdentifier);
            const diff = { groupBy: groupByIdentifier };
            onChange(diff, { ...snapshot, ...diff });
        }

        return {
            results,
            isEmpty: Array.isArray(items) && items.length === 0,
            isLoading: !!isLoading,
            disabled: !!disabled,
            config,
            snapshot,
            pagination,
            search: {
                state: snapshot.searchTerm,
                disabled: config?.searchFn === undefined,
                set: (incomingSearchTerm?: string) => {
                    onInit();
                    setSearchTerm(incomingSearchTerm);
                    const diff = { searchTerm: incomingSearchTerm };
                    onChange(diff, { ...snapshot, ...diff });
                },
            },
            filters: {
                state: snapshot.filters,
                definitions: config?.filters,
                set: wrappedSetFilter,
                get: (filterIdentifier: string) => snapshot.filters?.[filterIdentifier],
                delete: (filterIdentifier: string) => wrappedSetFilter(filterIdentifier, undefined),
                toggle: (filterIdentifier: string) => {
                    const filterDefinition = config?.filters?.find(({ id }) => id === filterIdentifier);
                    if (filterDefinition) {
                        if (!filterDefinition.is_boolean) {
                            throw new Error("Finder Error: trying to toggle non-boolean filter.");
                        }

                        const filterState = snapshot.filters?.[filterIdentifier];
                        wrappedSetFilter(filterIdentifier, !filterState);
                    }
                },
                test: (filterDefinition, filterState, incomingMeta = snapshot.meta) => {
                    const testConfig = finderConfig({ filters: [filterDefinition] });
                    const testSnapshot = { filters: { [filterDefinition.id]: filterState }, meta: incomingMeta };
                    if (!items) {
                        return [];
                    }
                    return findItems(items, testConfig, testSnapshot);
                },
                testOptions: (filterDefinition, incomingMeta = snapshot.meta) => {
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
                            resultMap.set(option, 0);
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
            },
            sortBy: {
                state: snapshot.sortBy,
                direction: snapshot.sortDirection,
                definitions: config?.sortBy ?? [],
                set: (incomingSortByIdentifier?: string, incomingSortDirection?: FinderSortDirection) => {
                    onInit();

                    const sortByDefinition = config?.sortBy?.find(({ id }) => incomingSortByIdentifier === id);
                    if (sortByDefinition === undefined) {
                        throw new Error(`Finder could not locate the sortBy definition for ${sortByDefinition}.`);
                    }

                    setSortBy(incomingSortByIdentifier);
                    setSortDirection(incomingSortDirection);
                    const diff = { sortBy: incomingSortByIdentifier, sortDirection: incomingSortDirection };
                    onChange(diff, { ...snapshot, ...diff });
                },
                cycleDirection: () => {
                    onInit();
                    let incomingSortDirection: FinderSortDirection;

                    if (sortDirection === null) {
                        incomingSortDirection = "desc";
                    }
                    if (sortDirection === "desc") {
                        incomingSortDirection = "asc";
                    }
                    if (sortDirection === "asc") {
                        incomingSortDirection = null;
                    }

                    const diff = { sortDirection: incomingSortDirection };
                    onChange(diff, { ...snapshot, ...diff });
                },
                reset: () => {
                    setSortBy(undefined);
                    setSortDirection(undefined);
                },
            },
            groupBy: {
                state: snapshot.groupBy,
                definitions: config?.groupBy ?? [],
                required: config?.requireGroup ?? false,
                set: wrappedSetGroupBy,
                toggle: (incomingGroupByIdentifier: string) => {
                    if (snapshot.groupBy === incomingGroupByIdentifier) {
                        wrappedSetGroupBy(undefined);
                        return;
                    }
                    wrappedSetGroupBy(incomingGroupByIdentifier);
                },
                reset: () => {
                    wrappedSetGroupBy(undefined);
                },
            },
            selectedItems: {
                state: selectedItems,
                select: (item: FItem) => {
                    if (snapshot.selectedItems && config.maxSelectedItems && snapshot.selectedItems?.length >= config.maxSelectedItems) {
                        throw new Error("Finder cannot select this item without exceeding maxSelectedItems.");
                    }
                    setSelectedItems((prevSelectedItems) => {
                        return [...prevSelectedItems, item];
                    });
                    const diff = { selectedItems: [...(snapshot.selectedItems ?? []), item] };
                    onChange(diff, { ...snapshot, ...diff });
                },
                delete: (item: FItem) => {
                    const revisedSelectedItems = snapshot.selectedItems?.filter((row) => row !== item);
                    setSelectedItems(revisedSelectedItems ?? []);

                    const diff = { selectedItems: revisedSelectedItems };
                    onChange(diff, { ...snapshot, ...diff });
                },
                isSelected: (item: FItem) => {
                    return !!snapshot.selectedItems?.includes(item);
                },
                reset: () => {
                    setSelectedItems([]);
                    const diff = { selectedItems: [] };
                    onChange(diff, { ...snapshot, ...diff });
                },
                maxSelectedItems: config.maxSelectedItems,
            },
            meta: {
                state: meta,
                set: (metaIdentifier: any, value: any) => {
                    setMeta((prevMetaState) => {
                        const clonedMetaMap = new Map(prevMetaState);
                        clonedMetaMap.set(metaIdentifier, value);

                        const diff = { meta: clonedMetaMap };
                        onChange(diff, { ...snapshot, ...diff });

                        return clonedMetaMap;
                    });
                },
                get: (metaIdentifier: any) => {
                    return snapshot.meta?.get(metaIdentifier);
                },
                delete: (metaIdentifier: any) => {
                    setMeta((prevMetaState) => {
                        const clonedMetaMap = new Map(prevMetaState);
                        clonedMetaMap.delete(metaIdentifier);

                        const diff = { meta: clonedMetaMap };
                        onChange(diff, { ...snapshot, ...diff });

                        return clonedMetaMap;
                    });
                },
                reset: () => {
                    setMeta(new Map());
                },
            },
        };
    }, [config, disabled, filters, groupBy, isInitialized, isLoading, items, meta, numItemsPerPage, onChange, page, searchTerm, sortBy, sortDirection]);
}

export { useFinderFactory };
