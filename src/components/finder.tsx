import { PropsWithChildren, RefObject, useImperativeHandle } from "react";
import { FinderContext } from "../context/finder-context";
import { useFinderFactory } from "..//hooks/use-finder-factory";
import { useFinderFactoryOptions, FinderCore } from "../types";

export interface FinderProps<FItem> extends useFinderFactoryOptions<FItem>, PropsWithChildren {
    items: FItem[] | undefined | null;
    controllerRef?: RefObject<FinderCore<FItem> | null>;
}

function Finder<FItem>({
    items,
    config,
    disabled,
    isLoading,
    page,
    numItemsPerPage,
    initialMeta,
    initialSelectedItems,
    initialValues,
    onChange,
    children,
    controllerRef,
}: FinderProps<FItem>) {
    const finderInstance = useFinderFactory<FItem>(items, {
        config,
        disabled,
        isLoading,
        initialMeta,
        initialSelectedItems,
        initialValues,
        page,
        onChange,
        numItemsPerPage,
    });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderContext.Provider value={finderInstance}>{children}</FinderContext.Provider>;
}
export { Finder };
