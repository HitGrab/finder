import { cloneElement, ElementType, isValidElement, ReactElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { FinderBaseComponentProps } from "../types/react-types";

interface FinderNoMatchesProps {
    children: ElementType<FinderBaseComponentProps> | ReactElement<FinderBaseComponentProps> | string;
}
function FinderNoMatches({ children: renderProp }: FinderNoMatchesProps) {
    const finder = useFinderContext();
    if (finder.state === "noMatches" && renderProp) {
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

export { FinderNoMatches };
