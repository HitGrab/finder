import { jsx as _jsx } from "react/jsx-runtime";
import { isValidElement, cloneElement } from "react";
import { useFinder } from "../hooks/use-finder";
function FinderItems({ children: renderProp }) {
    const finder = useFinder();
    if (Array.isArray(finder.results.items) && finder.results.items.length > 0 && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, { items: finder.results.items, pagination: finder.pagination, meta: finder.meta.state });
        }
        if (typeof renderProp === "function") {
            const Component = renderProp;
            return _jsx(Component, { items: finder.results.items, pagination: finder.pagination, meta: finder.meta.state });
        }
    }
    return null;
}
export { FinderItems };
