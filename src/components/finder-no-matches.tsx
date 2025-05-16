import { ElementType, isValidElement, ReactNode } from "react";
import { useFinderContext } from "../hooks/use-finder-context";

interface FinderNoMatchesProps<FItem> {
    children: ElementType | ReactNode;
}
function FinderNoMatches<FItem>({ children: renderProp }: FinderNoMatchesProps<FItem>) {
    const finder = useFinderContext();
    if (Array.isArray(finder.matches.items) && finder.matches.items.length === 0 && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return renderProp;
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component />;
        }

        return renderProp;
    }
    return null;
}

export { FinderNoMatches };
