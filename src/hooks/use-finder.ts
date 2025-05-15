import { useState, useSyncExternalStore } from "react";
import { FinderInstance, FinderConstructorOptions } from "../types";
import { FinderSyncExternalStore } from "../classes/finder-store";

/**
 * Create a finder instance with contained state and controllers.
 */
function useFinder<FItem>(
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
        onChange,
    }: FinderConstructorOptions<FItem>,
): FinderInstance<FItem> {
    const [finderStore] = useState(
        () =>
            new FinderSyncExternalStore(items, {
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
        (l) => finderStore.subscribe(l),
        () => finderStore.getSnapshot(),
    );

    // Finder will only render a new snapshot if these values have changed.
    finderStore.instance.setItems(items);
    finderStore.instance.setIsLoading(isLoading);
    finderStore.instance.setDisabled(disabled);
    finderStore.instance.pagination.setPage(page);
    finderStore.instance.pagination.setNumItemsPerPage(numItemsPerPage);
    finderStore.instance.selectedItems.setMaxSelectedItems(maxSelectedItems);
    return finderStore.instance;
}

export { useFinder };
