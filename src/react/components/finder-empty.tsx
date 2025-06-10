import { cloneElement, isValidElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { FinderBaseRenderProp } from "../types/react-types";

interface FinderEmptyProps {
    children: FinderBaseRenderProp;
}
function FinderEmpty({ children: renderProp }: FinderEmptyProps) {
    const finder = useFinderContext();
    if (finder.state === "empty" && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
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

export { FinderEmpty };
