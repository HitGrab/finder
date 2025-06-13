import { useEffect, useState } from "react";
import { FinderConstructorOptions } from "../../types";
import { Finder as FinderCore } from "../../core/finder";

/**
 * Create a finder instance with contained state and controllers.
 */
function useFinder<FItem>(
    items: FItem[] | null | undefined,
    {
        rules,
        initialSearchTerm,
        initialSortBy,
        initialSortDirection,
        initialGroupBy,
        initialFilters,
        initialSelectedItems,
        initialMeta,
        page,
        numItemsPerPage,
        plugins,
        isLoading,
        disabled,
        requireGroup,
        maxSelectedItems,
        onInit,
        onReady,
        onFirstUserInteraction,
        onChange,
    }: FinderConstructorOptions<FItem>,
): FinderCore<FItem> {
    const [instance] = useState(
        () =>
            new FinderCore(items, {
                rules,
                initialSearchTerm,
                initialSortBy,
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
                plugins,
                requireGroup,
                onInit,
                onReady,
                onFirstUserInteraction,
                onChange,
            }),
    );

    // An extremely simple variation on useSyncExternalStore that'll trigger a React render whenever Finder changes.
    const [, setLastUpdatedAt] = useState<number | undefined>(undefined);
    useEffect(() => {
        instance.events.on("change", ({ diff, snapshot }) => setLastUpdatedAt(snapshot.updatedAt));
    }, []);

    // Finder will only render a new snapshot if these values have changed.
    instance.setItems(items);
    instance.setIsLoading(isLoading);
    instance.setIsDisabled(disabled);
    if (page !== undefined) {
        instance.pagination.setPage(page);
    }
    if (numItemsPerPage !== undefined) {
        instance.pagination.setNumItemsPerPage(numItemsPerPage);
    }
    if (maxSelectedItems !== undefined) {
        instance.selectedItems.setMaxSelectedItems(maxSelectedItems);
    }

    return instance;
}

export { useFinder };
