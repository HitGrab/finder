import { PropsWithChildren, RefObject, useImperativeHandle, useState, useSyncExternalStore } from "react";
import { FinderContext } from "../context/finder-context";

import { useFinderFactoryOptions, FinderCore } from "../types";
import { useFinderCore } from "../hooks/use-finder-core";
export interface FinderProps<FItem> extends useFinderFactoryOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}

function Finder<FItem>({
    items,
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
    children,
    controllerRef,
}: FinderProps<FItem>) {
    const finderInstance = useFinderCore<FItem>(items, {
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
    });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderContext.Provider value={finderInstance}>{children}</FinderContext.Provider>;
}
export { Finder };
