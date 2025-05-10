import { jsx as _jsx } from "react/jsx-runtime";
import { isValidElement } from "react";
import { useFinder } from "./use-finder";
function FinderLoading({ children: renderProp }) {
    const finder = useFinder();
    if (finder.isLoading && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return renderProp;
        }
        if (typeof renderProp === "function") {
            const Component = renderProp;
            return _jsx(Component, {});
        }
        return renderProp;
    }
    return null;
}
export { FinderLoading };
