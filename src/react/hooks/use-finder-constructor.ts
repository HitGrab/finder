import { useEffect, useState } from "react";
import { FinderConstructorOptions } from "../../types";
import { FinderCore } from "../../core/finder-core";

/**
 * Create a finder instance with contained state and controllers.
 */
function useFinderConstructor<FItem>(
    items: FItem[] | null | undefined,
    {
        rules,
        initialSearchTerm,
        initialSortBy,
        initialSortDirection,
        initialGroupBy,
        initialFilters,
        context,
        page,
        numItemsPerPage,
        isLoading,
        disabled,
        requireGroup,
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
                context,
                isLoading,
                disabled,
                page,
                numItemsPerPage,
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
        instance.events.on("change", ({ snapshot }) => setLastUpdatedAt(snapshot.updatedAt));
    }, []);

    // Finder will only render a new snapshot if these values have changed.
    instance.setItems(items);
    instance.setIsLoading(isLoading);
    instance.setIsDisabled(disabled);
    instance.setContext(context);

    if (page !== undefined) {
        instance.pagination.setPage(page);
    }
    if (numItemsPerPage !== undefined) {
        instance.pagination.setNumItemsPerPage(numItemsPerPage);
    }

    return instance;
}

export { useFinderConstructor };
