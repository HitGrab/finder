import { ElementType, ReactNode, isValidElement } from "react";
import { useFinder } from "../hooks/use-finder";

interface FinderLoadingProps {
    children: ElementType | ReactNode;
}
function FinderLoading({ children: renderProp }: FinderLoadingProps) {
    const finder = useFinder();
    if (finder.isLoading && renderProp) {
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
