import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderLoadingProps {
    children: FinderContentRenderProp;
}
function FinderLoading({ children: Component }: FinderLoadingProps) {
    const finder = useFinder();
    if (finder.state === "loading" && Component) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }
    return null;
}

export { FinderLoading };
