import { isValidElement } from "react";
import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderLoadingProps {
    children: FinderContentRenderProp;
}
function FinderLoading({ children: renderProp }: FinderLoadingProps) {
    const finder = useFinder();
    if (finder.state === "loading" && renderProp) {
        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return renderProp;
    }
    return null;
}

export { FinderLoading };
