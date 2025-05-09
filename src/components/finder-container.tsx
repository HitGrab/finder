import { PropsWithChildren, useImperativeHandle } from "react";
import { useFinderFactory } from "../hooks/use-finder-factory.js";
import { FinderCoreContext } from "../store/finder-core-context.js";
import { FinderRootProps } from "../types/types.js";

interface FinderContainerProps<FItem> extends FinderRootProps<FItem>, PropsWithChildren {}
function FinderContainer<FItem>({
    items,
    config,
    disabled,
    isLoading,
    page,
    numItemsPerPage,
    initialMeta,
    initialValues,
    onChange,
    children,
    controllerRef,
}: FinderContainerProps<FItem>) {
    const finderInstance = useFinderFactory<FItem>(items, { config, disabled, isLoading, initialMeta, initialValues, page, onChange, numItemsPerPage });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderCoreContext.Provider value={finderInstance}>{children}</FinderCoreContext.Provider>;
}
export { FinderContainer };
