import { PropsWithChildren, RefObject, useImperativeHandle, useState, useSyncExternalStore } from "react";
import { FinderContext } from "../context/finder-context";
import { FinderConstructorOptions, FinderInstance } from "../types";
import { useFinder } from "../hooks/use-finder";

export interface FinderProps<FItem> extends FinderConstructorOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderInstance<FItem> | null>;
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
    const finderInstance = useFinder<FItem>(items, {
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

    return <FinderContext.Provider value={[finderInstance, finderInstance.processedAt]}>{children}</FinderContext.Provider>;
}
export { Finder };
