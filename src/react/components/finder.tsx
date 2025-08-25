import { useImperativeHandle } from "react";
import { FinderContext } from "../providers/finder-context";
import { FinderProps } from "../types/react-types";
import { useFinderCore } from "../hooks/use-finder-core";

function Finder<FItem = any>({
    items,
    rules,
    initialSearchTerm,
    initialSortBy,
    initialSortDirection,
    initialGroupBy,
    initialFilters,
    context,
    initialSelectedItems,
    maxSelectedItems,
    isLoading,
    disabled,
    page,
    numItemsPerPage,
    requireGroup,
    layoutVariants,
    initialLayout,
    plugins,
    onInit,
    onReady,
    onFirstUserInteraction,
    onChange,
    children,
    controllerRef,
}: FinderProps<FItem>) {
    const finderInstance = useFinderCore<FItem>(items, {
        rules,
        initialSearchTerm,
        initialSortBy,
        initialSortDirection,
        initialGroupBy,
        initialFilters,
        context,
        initialSelectedItems,
        maxSelectedItems,
        isLoading,
        disabled,
        page,
        numItemsPerPage,
        requireGroup,
        layoutVariants,
        initialLayout,
        plugins,
        onInit,
        onReady,
        onFirstUserInteraction,
        onChange,
    });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderContext value={[finderInstance, finderInstance.updatedAt]}>{children}</FinderContext>;
}
export { Finder };
