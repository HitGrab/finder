import { useImperativeHandle } from "react";
import { useFinderFactory } from "./use-finder-factory";
import { FinderProps } from "./types";
import { FinderContext } from "./finder-context";

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

    return <FinderContext.Provider value={finderInstance}>{children}</FinderContext.Provider>;
}
export { Finder };
