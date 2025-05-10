import { jsx as _jsx } from "react/jsx-runtime";
import { useImperativeHandle } from "react";
import { FinderContext } from "../context/finder-context";
import { useFinderFactory } from "..//hooks/use-finder-factory";
function Finder({ items, config, disabled, isLoading, page, numItemsPerPage, initialMeta, initialValues, onChange, children, controllerRef, }) {
    const finderInstance = useFinderFactory(items, { config, disabled, isLoading, initialMeta, initialValues, page, onChange, numItemsPerPage });
    useImperativeHandle(controllerRef, () => finderInstance, [finderInstance]);
    return _jsx(FinderContext.Provider, { value: finderInstance, children: children });
}
export { Finder };
