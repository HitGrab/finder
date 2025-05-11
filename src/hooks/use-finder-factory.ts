import { useMemo, useState } from "react";
import { useFinderFactoryOptions, FinderCore, FinderStateSnapshot } from "../types";
import { useFinderSelectedItems } from "./use-finder-selected-items";
import { useFinderFilters } from "./use-finder-filters";
import { useFinderGroupBy } from "./use-finder-group-by";
import { useFinderSortBy } from "./use-finder-sort-by";
import { useFinderSearch } from "./use-finder-search";
import { useFinderMeta } from "./use-finder-meta";
import { findResults } from "../utils/finder-logic";

/**
 * TODO:
 * Validate filter options
 * Filters need onChange recursive callback
 * 'prequisite' filter function?
 * debounce onChange?
 * Actually implement 'disabled'
 */

/**
 * Create a finder instance with contained state and controllers.
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
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const finderMetaHook = useFinderMeta({ initialValue: initialMeta, onChange: emitChange, onInit: initializeOnce });
    const finderSearchHook = useFinderSearch({
        initialSearchTerm: initialValues?.searchTerm,
        searchFn: config.searchFn,
        onChange: emitChange,
        onInit: initializeOnce,
    });
    const finderSortByHook = useFinderSortBy({
        initialSortby: initialValues?.sortBy,
        initialSortDirection: initialValues?.sortDirection,
        definitions: config.sortBy,
        onChange: emitChange,
        onInit: initializeOnce,
    });
    const finderGroupByHook = useFinderGroupBy({
        initialGroupBy: initialValues?.groupBy,
        definitions: config.groupBy,
        requireGroup: config.requireGroup,
        onChange: emitChange,
        onInit: initializeOnce,
    });
    const finderFilterHook = useFinderFilters(items, {
        initialFilterState: initialValues?.filters,
        definitions: config.filters,
        meta: finderMetaHook.state,
        onChange: emitChange,
        onInit: initializeOnce,
    });
    const selectedItemsHook = useFinderSelectedItems({
        initialSelectedItems,
        maxSelectedItems: config?.maxSelectedItems,
        onChange: emitChange,
    });

    const snapshot: FinderStateSnapshot = {
        filters: finderFilterHook.state,
        sortBy: finderSortByHook.state,
        sortDirection: finderSortByHook.direction,
        groupBy: finderGroupByHook.state,
        searchTerm: finderSearchHook.state,
        selectedItems: selectedItemsHook.state,
        meta: finderMetaHook.state,
    };

    function emitChange(diff: FinderStateSnapshot) {
        onChange(diff, { ...snapshot, ...diff });
    }

    function initializeOnce() {
        if (!isInitialized) {
            config?.onInit && config.onInit();
            setIsInitialized(true);
        }
    }

    const results = useMemo(() => {
        return findResults(items, config, snapshot, page, numItemsPerPage);
    }, [items, config, snapshot, page, numItemsPerPage]);

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

    return {
        results,
        isEmpty: Array.isArray(items) && items.length === 0,
        isLoading: !!isLoading,
        disabled: !!disabled,
        pagination,
        search: finderSearchHook,
        filters: finderFilterHook,
        sortBy: finderSortByHook,
        groupBy: finderGroupByHook,
        selectedItems: selectedItemsHook,
        meta: finderMetaHook,
    };
}

export { useFinderFactory };
