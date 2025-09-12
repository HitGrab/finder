import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderContentLoadingProps {
    children: FinderContentRenderProp;
}
function FinderContentLoading({ children: Component }: FinderContentLoadingProps) {
    const finder = useFinder();
    if (finder.isLoading && Component) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }
    return null;
}

export { FinderContentLoading };
