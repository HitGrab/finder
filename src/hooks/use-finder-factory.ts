/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { composeFilterValuesWithSideEffects, findResults } from "../services/finder-logic.js";
import { FinderCore, FinderSortDirection, FinderStateSnapshot, useFinderFactoryOptions } from "../types/types.js";

/**
 * TODO:
 * Validate filter options
 * Filter onChange recursive callback
 * 'prequisite' filter function?
 * Selected layer
 */

/**
 * Utility hook to store search, filter and sorting state.
 */
function useFinderFactory<FItem>(
    items: FItem[] | null | undefined,
    { config, initialValues, initialMeta, page, numItemsPerPage, isLoading, disabled, onChange = () => {} }: useFinderFactoryOptions<FItem>,
): FinderCore<FItem> {
    const [searchTerm, setSearchTerm] = useState<FinderStateSnapshot["searchTerm"]>(initialValues?.searchTerm);
    const [filters, setFilters] = useState<FinderStateSnapshot["filters"]>(initialValues?.filters);
    const [sortBy, setSortBy] = useState<FinderStateSnapshot["sortBy"]>(initialValues?.sortBy);
    const [sortDirection, setSortDirection] = useState<FinderStateSnapshot["sortDirection"]>(initialValues?.sortDirection);
    const [groupBy, setGroupBy] = useState<FinderStateSnapshot["groupBy"]>(initialValues?.groupBy);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [meta, setMeta] = useState(initialMeta);

    return useMemo(() => {
        const defaultSortByDefinition = Array.isArray(config?.sortBy) ? config.sortBy.at(0) : undefined;
        const defaultGroupByDefinition = config?.requireGroup && Array.isArray(config.groupBy) ? config.groupBy?.at(0) : undefined;

        const snapshot: FinderStateSnapshot = {
            filters,
            sortBy: sortBy ?? defaultSortByDefinition?.id,
            groupBy: groupBy ?? defaultGroupByDefinition?.id,
            searchTerm,
            sortDirection,
        };

        const results = findResults(items, config, snapshot, meta, page, numItemsPerPage);
        const pagination =
            numItemsPerPage && Array.isArray(items) && page !== undefined
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
                onChange({ ...snapshot, filters: currentFilters });
            }
        }

        function wrappedSetGroupBy(groupByIdentifier?: string) {
            onInit();

            const groupByDefinition = config?.groupBy?.find(({ id }) => groupByIdentifier === id);
            if (groupByDefinition === undefined) {
                throw new Error(`Finder could not locate the groupBy definition for ${groupByIdentifier}.`);
            }

            setGroupBy(groupByIdentifier);
            onChange({ ...snapshot, groupBy: groupByIdentifier });
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
                    onChange({ ...snapshot, searchTerm: incomingSearchTerm });
                },
            },
            filters: {
                state: snapshot.filters,
                definitions: config?.filters,
                set: wrappedSetFilter,
                reset: (filterIdentifier: string) => wrappedSetFilter(filterIdentifier, undefined),
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
                    onChange({ ...snapshot, sortBy: incomingSortByIdentifier, sortDirection: incomingSortDirection });
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

                    onChange({ ...snapshot, sortDirection: incomingSortDirection });
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
            },
            meta: {
                state: meta,
                set: (metaIdentifier: any, value: any) => {
                    setMeta((prevMetaState) => {
                        const clonedMetaMap = new Map(prevMetaState);
                        clonedMetaMap.set(metaIdentifier, value);
                        return clonedMetaMap;
                    });
                },
                reset: (metaIdentifier: string) => {
                    setMeta((prevMetaState) => {
                        const clonedMetaMap = new Map(prevMetaState);
                        clonedMetaMap.delete(metaIdentifier);
                        return clonedMetaMap;
                    });
                },
            },
        };
    }, [config, disabled, filters, groupBy, isInitialized, isLoading, items, meta, numItemsPerPage, onChange, page, searchTerm, sortBy, sortDirection]);
}

export { useFinderFactory };
