/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderBy, groupBy, Many } from "lodash";
import {
    FinderSnapshot,
    FinderCore,
    FinderGroupByRule,
    FinderResultGroup,
    FinderFilterRule,
    FinderRule,
    isGroupByRule,
    isFilterRule,
    isSearchRule,
    isSortByRule,
} from "../types";

export function findResults<FItem>(
    items: FItem[] | null | undefined,
    rules: FinderRule<FItem>[] | undefined,
    snapshot: FinderSnapshot,
    page?: number,
    numItemsPerPage?: number,
): FinderCore<FItem>["results"] {
    if (!items) {
        return {
            numTotalItems: undefined,
        };
    }

    let itemMatches = findItems(items, rules, snapshot);
    const numTotalMatchedItems = itemMatches.length;

    if (page !== undefined && numItemsPerPage) {
        const lastPage = Math.ceil(itemMatches.length / numItemsPerPage);
        const clampedPage = page > lastPage ? lastPage : page;
        const offset = (clampedPage - 1) * numItemsPerPage;

        itemMatches = itemMatches.slice(offset, offset + numItemsPerPage);
    }

    if (snapshot.groupBy !== undefined) {
        const groupByRule = rules?.filter(isGroupByRule).find(({ id }) => id === snapshot.groupBy);

        if (groupByRule) {
            return {
                groups: groupItems(items, groupByRule),
                numTotalItems: numTotalMatchedItems,
            };
        }
    }

    return {
        items: itemMatches,
        numTotalItems: numTotalMatchedItems,
    };
}

export function findItems<FItem>(items: FItem[] | undefined, rules: FinderRule<FItem>[] | undefined, snapshot: FinderSnapshot) {
    if (items === undefined || Array.isArray(items) === false) {
        throw new TypeError("Finder.findItems() received an invalid collection.");
    }

    if (items.length === 0 || rules === undefined) {
        return items;
    }

    const allDefinedFilters = rules.filter(isFilterRule);
    const searchRule = rules.find(isSearchRule);

    const filters = composeActiveFilterRules(allDefinedFilters, snapshot?.filters);
    const matches = items.filter((item) => {
        if (snapshot?.searchTerm && searchRule && searchRule.searchFn(item, snapshot.searchTerm) === false) {
            return false;
        }

        // An item must pass ALL filters to match.
        return filters.every((rule) => {
            const filterValue = snapshot?.filters?.[rule.id];

            if (rule.required && filterValue === undefined) {
                const firstOption = Array.isArray(rule.options) && rule.options.at(0);
                if (firstOption) {
                    return rule.filterFn(item, firstOption.value, snapshot.meta);
                }
            }

            return rule.filterFn(item, filterValue, snapshot.meta);
        });
    });

    const allDefinedSortByRules = rules.filter(isSortByRule);
    const sortByRule = allDefinedSortByRules?.find((option) => option.id === snapshot?.sortBy) ?? allDefinedSortByRules?.[0];
    if (sortByRule) {
        return orderBy(matches, sortByRule.sortFn, snapshot?.sortDirection ?? sortByRule.defaultDirection);
    }

    return matches;
}

export function groupItems<FItem>(items: FItem[] | undefined, groupByRule: FinderGroupByRule<FItem>) {
    const groupObject = groupBy(items, groupByRule.groupFn);

    // transform the object into a sortable array
    const groups = Object.keys(groupObject).map((id) => {
        return {
            id: String(id),
            items: groupObject[id],
        };
    });

    const hasStickyGroups = groupByRule?.sticky !== undefined;
    const orderByCallbacks = [];
    const orderDirection = [];
    if (hasStickyGroups) {
        orderByCallbacks.push(composeStickyGroupOrderCallback(groupByRule));
        orderDirection.push("asc");
    }
    if (groupByRule?.sortGroupIdFn) {
        orderByCallbacks.push(groupByRule.sortGroupIdFn);
        orderDirection.push(groupByRule.direction ?? "asc");
    }

    // TODO: Figure out group sorting
    // HACK: Lodash type import is bad
    return orderBy(groups, orderByCallbacks, orderDirection as Many<boolean | "asc" | "desc">) as FinderResultGroup<FItem>[];
}

/**
 * Creates a sorting method for groupBy rule with 'sticky' header/footer groups.
 */
function composeStickyGroupOrderCallback<FItem>(groupByRule: FinderGroupByRule<FItem>) {
    let stickyHeaderGroupIds: string[] = [];
    if (groupByRule?.sticky?.header !== undefined) {
        if (Array.isArray(groupByRule.sticky.header)) {
            stickyHeaderGroupIds = groupByRule.sticky.header;
        }
        if (typeof groupByRule.sticky.header === "string") {
            stickyHeaderGroupIds = [groupByRule?.sticky?.header];
        }
    }

    let stickyFooterGroupIds: string[] = [];
    if (groupByRule?.sticky?.footer !== undefined) {
        if (Array.isArray(groupByRule.sticky.footer)) {
            stickyFooterGroupIds = groupByRule.sticky.footer;
        }
        if (typeof groupByRule.sticky.footer === "string") {
            stickyFooterGroupIds = [groupByRule?.sticky?.footer];
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

/**
 * Filters are static arrays, and may not all be active.
 * This method identifies which filters have matching filterValues that make them relevant.
 */
export function composeActiveFilterRules<Item>(rules: FinderFilterRule<Item>[] = [], filterValues: FinderSnapshot["filters"] = {}) {
    return rules.filter((rule) => {
        const filterState = filterValues?.[rule.id];

        if (rule.required) {
            return true;
        }

        // The filter is inactive if no value is set.
        if (filterState === undefined) {
            return false;
        }

        // If the value array is empty, the filter is inactive.
        if (rule.multiple && Array.isArray(filterState) && filterState.length === 0) {
            return false;
        }

        if (rule.is_boolean && filterState === false) {
            return false;
        }

        // Empty strings are considered inactive.
        if (typeof filterState === "string" && filterState.trim() === "") {
            return false;
        }
        return true;
    });
}
