import { ElementType, ReactNode, isValidElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";

interface FinderLoadingProps {
    children: ElementType | ReactNode;
}
function FinderLoading({ children: renderProp }: FinderLoadingProps) {
    const finder = useFinderContext();
    if (finder.state === "loading" && renderProp) {
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

export { FinderLoading };
