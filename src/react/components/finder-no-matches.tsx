import { cloneElement, isValidElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { FinderBaseRenderProp } from "../types/react-types";

interface FinderNoMatchesProps {
    children: FinderBaseRenderProp;
}
function FinderNoMatches({ children: renderProp }: FinderNoMatchesProps) {
    const finder = useFinderContext();
    if (finder.state === "noMatches" && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, {
                pagination: finder.pagination,
                meta: finder.meta,
                selectedItems: finder.selectedItems,
                layout: finder.layout,
            });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component pagination={finder.pagination} meta={finder.meta} selectedItems={finder.selectedItems} layout={finder.layout} />;
        }

        return renderProp;
    }
    return null;
}

export { FinderNoMatches };
