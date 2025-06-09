import { ElementType, isValidElement, ReactNode } from "react";
import { useFinderContext } from "../hooks/use-finder-context";

interface FinderNoMatchesProps {
    children: ElementType | ReactNode;
}
function FinderNoMatches({ children: renderProp }: FinderNoMatchesProps) {
    const finder = useFinderContext();
    const isReady = finder.isLoading === false;
    const hasItems = Array.isArray(finder.items) && finder.items.length > 0;
    const hasNoMatches = Array.isArray(finder.matches.items) && finder.matches.items.length === 0;
    if (isReady && hasItems && hasNoMatches && renderProp) {
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
