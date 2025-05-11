/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderBy, groupBy, Many } from "lodash";
import { FinderConfig, FinderStateSnapshot, FinderCore, FinderGroupByDefinition, FinderResultGroup, FinderFilterDefinition, FinderMeta } from "../types";

export function findResults<FItem>(
    items: FItem[] | null | undefined,
    config: FinderConfig<FItem> | undefined = {},
    snapshot: FinderStateSnapshot,
    page?: number,
    numItemsPerPage?: number,
): FinderCore<FItem>["results"] {
    if (!items) {
        return {
            numTotalItems: undefined,
        };
    }

    let itemMatches = findItems(items, config, snapshot);
    const numTotalMatchedItems = itemMatches.length;

    if (page !== undefined && numItemsPerPage) {
        const lastPage = Math.ceil(itemMatches.length / numItemsPerPage);
        const clampedPage = page > lastPage ? lastPage : page;
        const offset = (clampedPage - 1) * numItemsPerPage;

        itemMatches = itemMatches.slice(offset, offset + numItemsPerPage);
    }

    if (snapshot.groupBy !== undefined) {
        const groupByDefinition = config.groupBy?.find(({ id }) => id === snapshot.groupBy);

        if (groupByDefinition) {
            return {
                groups: groupItems(items, groupByDefinition),
                numTotalItems: numTotalMatchedItems,
            };
        }
    }

    return {
        items: itemMatches,
        numTotalItems: numTotalMatchedItems,
    };
}

export function findItems<FItem>(items: FItem[] | undefined, config: FinderConfig<FItem> | undefined, snapshot: FinderStateSnapshot) {
    if (items === undefined || Array.isArray(items) === false) {
        throw new TypeError("Finder.findItems() received an invalid collection.");
    }

    if (items.length === 0 || config === undefined) {
        return items;
    }

    const filters = composeActiveFilterDefinitions(config.filters, snapshot?.filters);
    const matches = items.filter((item) => {
        if (snapshot?.searchTerm && config.searchFn && config.searchFn(item, snapshot.searchTerm) === false) {
            return false;
        }

        // An item must pass ALL filters to match.
        return filters.every((filterDefinition) => {
            const filterState = snapshot?.filters?.[filterDefinition.id];

            if (filterDefinition.required && filterState === undefined) {
                const firstOption = Array.isArray(filterDefinition.options) && filterDefinition.options.at(0);
                if (firstOption) {
                    return filterDefinition.filterFn(item, firstOption.value, snapshot.meta);
                }
            }

            return filterDefinition.filterFn(item, filterState, snapshot.meta);
        });
    });

    const sortByDefinition = config.sortBy?.find((option) => option.id === snapshot?.sortBy) ?? config.sortBy?.[0];
    if (sortByDefinition) {
        return orderBy(matches, sortByDefinition.sortFn, snapshot?.sortDirection ?? sortByDefinition.defaultDirection);
    }

    return matches;
}

export function groupItems<FItem>(items: FItem[] | undefined, groupByDefinition: FinderGroupByDefinition<FItem>) {
    const groupObject = groupBy(items, groupByDefinition.groupFn);

    // transform the object into a sortable array
    const groups = Object.keys(groupObject).map((id) => {
        return {
            id: String(id),
            items: groupObject[id],
        };
    });

    const hasStickyGroups = groupByDefinition?.sticky !== undefined;
    const orderByCallbacks = [];
    const orderDirection = [];
    if (hasStickyGroups) {
        orderByCallbacks.push(composeStickyGroupOrderCallback(groupByDefinition));
        orderDirection.push("asc");
    }
    if (groupByDefinition?.sortGroupIdFn) {
        orderByCallbacks.push(groupByDefinition.sortGroupIdFn);
        orderDirection.push(groupByDefinition.direction ?? "asc");
    }

    // TODO: Figure out group sorting
    // HACK: Lodash type import is bad
    return orderBy(groups, orderByCallbacks, orderDirection as Many<boolean | "asc" | "desc">) as FinderResultGroup<FItem>[];
}

/**
 * Creates a sorting method for groupBy definitions with 'sticky' header/footer groups.
 */
function composeStickyGroupOrderCallback<FItem>(groupByDefinition: FinderGroupByDefinition<FItem>) {
    let stickyHeaderGroupIds: string[] = [];
    if (groupByDefinition?.sticky?.header !== undefined) {
        if (Array.isArray(groupByDefinition.sticky.header)) {
            stickyHeaderGroupIds = groupByDefinition.sticky.header;
        }
        if (typeof groupByDefinition.sticky.header === "string") {
            stickyHeaderGroupIds = [groupByDefinition?.sticky?.header];
        }
    }

    let stickyFooterGroupIds: string[] = [];
    if (groupByDefinition?.sticky?.footer !== undefined) {
        if (Array.isArray(groupByDefinition.sticky.footer)) {
            stickyFooterGroupIds = groupByDefinition.sticky.footer;
        }
        if (typeof groupByDefinition.sticky.footer === "string") {
            stickyFooterGroupIds = [groupByDefinition?.sticky?.footer];
        }
    }

    return (group: FinderResultGroup<FItem>) => {
        if (stickyHeaderGroupIds.includes(group.id)) {
            const index = stickyHeaderGroupIds.findIndex((groupId) => group.id === groupId);
            const sortOrder = (stickyHeaderGroupIds.length - index) * -1;
            return sortOrder;
        }
        if (stickyFooterGroupIds.includes(group.id)) {
            const index = stickyFooterGroupIds.findIndex((groupId) => group.id === groupId);
            return 1 + index;
        }
        return 0;
    };
}

export function composeFilterValuesWithSideEffects<FItem>(
    filterIdentifier: string,
    filterState: any,
    filters: FinderFilterDefinition<FItem>[],
    initialFilterValues: FinderStateSnapshot["filters"] = {},
    meta?: FinderMeta,
) {
    const filter = filters.find((row) => row.id === filterIdentifier);
    if (!filter) {
        return initialFilterValues;
    }
    const currentFilterValues = { ...initialFilterValues };

    if (filterState === undefined || filterState === null) {
        delete currentFilterValues[filter.id];
        if (filter.side_effects) {
            return recursivelyApplySideEffects(filterIdentifier, filterState, filters, currentFilterValues, meta);
        }
        return currentFilterValues;
    }

    currentFilterValues[filter.id] = filterState;
    if (filter.side_effects) {
        return recursivelyApplySideEffects(filterIdentifier, filterState, filters, currentFilterValues, meta);
    }
    return currentFilterValues;
}

function recursivelyApplySideEffects<FItem>(
    filterIdentifier: string,
    filterState: any,
    filters: FinderFilterDefinition<FItem>[],
    initialFilterValues: FinderStateSnapshot["filters"] = {},
    meta?: FinderMeta,
) {
    const filter = filters.find((row) => row.id === filterIdentifier);
    if (!filter || filter.side_effects === undefined) {
        return initialFilterValues;
    }

    // merge default values for type safety
    const calculatedSideEffects = {
        reset: [],
        set: {},
        ...filter.side_effects(filterState, meta),
    };

    let currentFilterValues = { ...initialFilterValues };
    calculatedSideEffects.reset.forEach((identifierToDelete) => {
        if (initialFilterValues[identifierToDelete] !== undefined) {
            delete currentFilterValues[identifierToDelete];

            const deletedFilter = filters.find((row) => row.id === identifierToDelete);
            if (deletedFilter && deletedFilter.side_effects) {
                currentFilterValues = recursivelyApplySideEffects(filterIdentifier, filterState, filters, currentFilterValues, meta);
            }
        }
    });

    Object.keys(calculatedSideEffects.set).forEach((identifierToMutate) => {
        const replacementValue = calculatedSideEffects.set[identifierToMutate as keyof typeof calculatedSideEffects.set];
        if (replacementValue !== undefined && initialFilterValues[identifierToMutate] !== replacementValue) {
            currentFilterValues[identifierToMutate] = replacementValue;

            const mutatedFilter = filters.find((row) => row.id === identifierToMutate);
            if (mutatedFilter && mutatedFilter.side_effects) {
                currentFilterValues = recursivelyApplySideEffects(filterIdentifier, filterState, filters, currentFilterValues, meta);
            }
        }
    });

    return currentFilterValues;
}

/**
 * Filters are static arrays, and may not all be active.
 * This method identifies which filters have matching filterValues that make them relevant.
 */
export function composeActiveFilterDefinitions<Item>(
    filterDefinitions: FinderFilterDefinition<Item>[] = [],
    filterValues: FinderStateSnapshot["filters"] = {},
) {
    return filterDefinitions.filter((definition) => {
        const filterState = filterValues?.[definition.id];

        if (definition.required) {
            return true;
        }

        // The filter is inactive if no value is set.
        if (filterState === undefined) {
            return false;
        }

        // If the value array is empty, the filter is inactive.
        if (definition.multiple && Array.isArray(filterState) && filterState.length === 0) {
            return false;
        }

        if (definition.is_boolean && filterState === false) {
            return false;
        }

        // Empty strings are considered inactive.
        if (typeof filterState === "string" && filterState.trim() === "") {
            return false;
        }
        return true;
    });
}
