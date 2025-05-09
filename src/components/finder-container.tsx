import { PropsWithChildren, useImperativeHandle } from "react";
import { useFinderFactory } from "src/hooks/use-finder-factory";
import { FinderCoreContext } from "src/store/finder-core-context";
import { FinderRootProps } from "src/types/types";

interface FinderContainerProps<FItem, FMeta> extends FinderRootProps<FItem, FMeta>, PropsWithChildren {}
function FinderContainer<FItem, FMeta>({
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
}: FinderContainerProps<FItem, FMeta>) {
    const finderInstance = useFinderFactory<FItem, FMeta>(items, { config, disabled, isLoading, initialMeta, initialValues, page, onChange, numItemsPerPage });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderCoreContext.Provider value={finderInstance}>{children}</FinderCoreContext.Provider>;
}
export { FinderContainer };
