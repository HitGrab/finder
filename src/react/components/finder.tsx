import { useEffect, useImperativeHandle, useState } from "react";
import { FinderCoreContext } from "../providers/finder-core-context";
import { FinderProps } from "../types/react-types";
import { FinderCore } from "../../core/finder-core";
import { FinderContent } from "./finder-content";
import { FinderSearchTerm } from "./finder-search-term";

function Finder<FItem = any, FContext = any>({
    items,
    rules,
    effects,
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
    ignoreSortByRulesWhileSearchRuleIsActive,
    onInit,
    onReady,
    onFirstUserInteraction,
    onChange,
    controllerRef,
    children,
}: FinderProps<FItem, FContext>) {
    const [instance] = useState<FinderCore<FItem, FContext>>(
        () =>
            new FinderCore<FItem, FContext>(items, {
                rules,
                effects,
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
                ignoreSortByRulesWhileSearchRuleIsActive,
                onInit,
                onReady,
                onFirstUserInteraction,
                onChange,
            }),
    );

    // A barebones riff on useSyncExternalStore that'll trigger a React render whenever Finder's internal state changes.
    const [, setLastUpdatedAt] = useState<number | undefined>(undefined);
    useEffect(() => {
        instance.events.on("change", ({ snapshot }) => setLastUpdatedAt(snapshot.updatedAt));
    }, []);

    // Finder will only render a new snapshot if these values have changed.
    instance.setItems(items);
    instance.setIsLoading(isLoading);
    instance.setIsDisabled(disabled);
    instance.setRules(rules);
    if (context !== undefined) {
        instance.setContext(context);
    }

    if (page !== undefined) {
        instance.pagination.setPage(page);
    }
    if (numItemsPerPage !== undefined) {
        instance.pagination.setNumItemsPerPage(numItemsPerPage);
    }

    useImperativeHandle(controllerRef, () => instance, [instance]);

    return <FinderCoreContext value={[instance, instance.updatedAt]}>{children}</FinderCoreContext>;
}

Finder.Content = FinderContent;

Finder.SearchTerm = FinderSearchTerm;

export { Finder };
