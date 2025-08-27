import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderEmptyProps {
    children: FinderContentRenderProp;
}
function FinderEmpty({ children: Component }: FinderEmptyProps) {
    const finder = useFinder();
    if (finder.state === "empty" && Component) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }
    return null;
}

export { FinderEmpty };
