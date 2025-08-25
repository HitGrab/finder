import { useImperativeHandle } from "react";
import { FinderContext } from "../providers/finder-context";
import { FinderProps } from "../types/react-types";
import { useFinderConstructor } from "../hooks/use-finder-constructor";

function Finder<FItem = any>({
    items,
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
    plugins,
    onInit,
    onReady,
    onFirstUserInteraction,
    onChange,
    children,
    controllerRef,
}: FinderProps<FItem>) {
    const finderInstance = useFinderConstructor<FItem>(items, {
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
