import { useState, useSyncExternalStore } from "react";
import { useFinderFactoryOptions, FinderCore } from "../types";
import { Finder } from "../classes/Finder";

/**
 * TODO:
 * 'prequisite' filter function?
 * debounce onChange?
 */

/**
 * Create a finder instance with contained state and controllers.
 */
function useFinderCore<FItem>(
    items: FItem[] | null | undefined,
    {
        rules,
        initialSearchTerm,
        initialSortby,
        initialSortDirection,
        initialGroupBy,
        initialFilters,
        initialSelectedItems,
        initialMeta,
        page,
        numItemsPerPage,
        isLoading,
        disabled,
        requireGroup,
        maxSelectedItems,
        onInit,
        onChange = () => {},
    }: useFinderFactoryOptions<FItem>,
): FinderCore<FItem> {
    const [finder] = useState(
        () =>
            new Finder(items, {
                rules,
                initialSearchTerm,
                initialSortby,
                initialSortDirection,
                initialGroupBy,
                initialFilters,
                initialMeta,
                initialSelectedItems,
                maxSelectedItems,
                isLoading,
                disabled,
                page,
                numItemsPerPage,
                requireGroup,
                onInit,
                onChange,
            }),
    );
    const snapshot = useSyncExternalStore(
        (l) => finder.subscribe(l),
        () => finder.getSnapshot(),
    );

    // sync finder internal state
    // Finder will check equality, and only render a new snapshot if the values have changed.
    finder.setItems(items);
    finder.setPage(page);
    finder.setNumItemsPerPage(page);
    finder.setIsLoading(isLoading);
    finder.setDisabled(disabled);
    finder.setMaxSelectedItems(maxSelectedItems);

    return snapshot;
}

export { useFinderCore };
