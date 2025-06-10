import { cloneElement, isValidElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { FinderBaseRenderProp } from "../types/react-types";

interface FinderLoadingProps {
    children: FinderBaseRenderProp;
}
function FinderLoading({ children: renderProp }: FinderLoadingProps) {
    const finder = useFinderContext();
    if (finder.state === "loading" && renderProp) {
        if (typeof renderProp === "object" && renderProp !== null && isValidElement(renderProp)) {
            return cloneElement(renderProp, { pagination: finder.pagination, meta: finder.meta.value });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component pagination={finder.pagination} meta={finder.meta.value} />;
        }

        return renderProp;
    }
    return null;
}

export { FinderLoading };
