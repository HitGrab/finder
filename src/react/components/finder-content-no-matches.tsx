import { FinderContentRenderProp } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderContentNoMatchesProps {
    children: FinderContentRenderProp;
}
function FinderContentNoMatches({ children: Component }: FinderContentNoMatchesProps) {
    const finder = useFinder();
    if (finder.isEmpty === false && finder.hasMatches === false) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }
    return null;
}

export { FinderContentNoMatches };
