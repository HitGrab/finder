import { useImperativeHandle } from "react";
import { useFinderFactory } from "../hooks/use-finder-factory.js";
import { FinderCoreContext } from "../store/finder-core-context.js";
import { FinderProps } from "src/types/types.js";

function Finder<FItem>({
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
}: FinderProps<FItem>) {
    const finderInstance = useFinderFactory<FItem>(items, { config, disabled, isLoading, initialMeta, initialValues, page, onChange, numItemsPerPage });

    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);

    return <FinderCoreContext.Provider value={finderInstance}>{children}</FinderCoreContext.Provider>;
}
export { Finder };
