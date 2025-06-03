import { useImperativeHandle } from "react";
import { FinderContext } from "../context/finder-context";
import { FinderProps } from "../types";
import { useFinder } from "../hooks/use-finder";

function Finder<FItem>({
    items,
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
    requireGroup,
    onInit,
    onChange,
    children,
    controllerRef,
}: FinderProps<FItem>) {
    const finderInstance = useFinder<FItem>(items, {
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
        requireGroup,
        onInit,
        onChange,
    });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderContext.Provider value={[finderInstance, finderInstance.updatedAt]}>{children}</FinderContext.Provider>;
}
export { Finder };
