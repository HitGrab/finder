import { useImperativeHandle } from "react";
import { useFinder } from "../hooks/use-finder";
import { FinderContext } from "../providers/finder-context";
import { FinderProps } from "../..";

function Finder<FItem = any>({
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
    plugins,
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
        plugins,
        onInit,
        onChange,
    });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderContext.Provider value={[finderInstance, finderInstance.updatedAt]}>{children}</FinderContext.Provider>;
}
export { Finder };
