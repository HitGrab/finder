import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderNoMatchesProps {
    children: FinderContentRenderProp;
}
function FinderNoMatches({ children: Component }: FinderNoMatchesProps) {
    const finder = useFinder();
    if (finder.state === "noMatches" && Component) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }
    return null;
}

export { FinderNoMatches };
