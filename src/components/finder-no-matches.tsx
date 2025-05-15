import { ElementType, isValidElement, ReactNode } from "react";
import { useFinderContext } from "../hooks/use-finder-context";

interface FinderEmptyProps {
    children: ElementType | ReactNode;
}
function FinderNoMatches({ children: renderProp }: FinderEmptyProps) {
    const finder = useFinderContext();
    if (finder.matches.items?.length === 0 && renderProp) {
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
