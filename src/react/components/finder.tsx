import { useImperativeHandle, useMemo, useState } from "react";
import { FinderCoreContext } from "../providers/finder-core-context";
import { FinderCoreContextProps, FinderProps } from "../types/react-types";
import { FinderContent } from "./finder-content";
import { FinderSearchTermHaystack } from "./finder-search-term-haystack";
import { FinderCore } from "../../core/finder-core";
import { EVENTS } from "../../core/core-constants";

function Finder<FItem = any, FContext = any>({
    items,
    rules,
    effects,
    initialSearchTerm,
    initialSortBy,
    initialSortDirection,
    initialGroupBy,
    initialGroupBySortDirection,
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
    // A barebones riff on useSyncExternalStore that'll trigger a React render whenever Finder's internal state changes.
    const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
    const [instance] = useState<FinderCore<FItem, FContext>>(() => {
        const finder = new FinderCore<FItem, FContext>(items, {
            rules,
            effects,
            initialSearchTerm,
            initialSortBy,
            initialSortDirection,
            initialGroupBy,
            initialGroupBySortDirection,
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
        });
        finder.events.on(EVENTS.SYNC_UPDATED_AT, (timestamp: number) => setLastUpdatedAt(timestamp));
        return finder;
    });

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

    const value: FinderCoreContextProps = useMemo(() => {
        return [instance, lastUpdatedAt];
    }, [instance, lastUpdatedAt]);

    return <FinderCoreContext.Provider value={value}>{children}</FinderCoreContext.Provider>;
}

Finder.Content = FinderContent;

Finder.SearchTermHaystack = FinderSearchTermHaystack;

export { Finder };
