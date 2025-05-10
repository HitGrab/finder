import { jsx as _jsx } from "react/jsx-runtime";
import { isValidElement, cloneElement } from "react";
import { useFinder } from "../hooks/use-finder";
function FinderGroups({ children: renderProp }) {
    const finder = useFinder();
    if (Array.isArray(finder.results.groups) && finder.results.groups.length > 0 && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, { groups: finder.results.groups, pagination: finder.pagination, meta: finder.meta.state });
        }
        if (typeof renderProp === "function") {
            const Component = renderProp;
            return _jsx(Component, { groups: finder.results.groups, pagination: finder.pagination, meta: finder.meta.state });
        }
    }
    return null;
}
export { FinderGroups };
