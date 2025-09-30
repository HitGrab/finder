import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderContentEmptyProps {
    children: FinderContentRenderProp;
}
function FinderContentEmpty({ children: Component }: FinderContentEmptyProps) {
    const finder = useFinder();
    if (finder.isEmpty && Component) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }
    return null;
}

export { FinderContentEmpty };
