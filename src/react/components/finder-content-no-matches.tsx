import { FinderContentProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";
import { ElementType, ReactElement, ReactNode } from "react";

interface FinderContentNoMatchesProps<FItem, FContext> {
    children:
        | ElementType<FinderContentProps<FItem, FContext>["noMatches"]>
        | ReactElement<FinderContentProps<FItem, FContext>["noMatches"]>
        | Iterable<ReactNode>;
}
function FinderContentNoMatches<FItem = any, FContext = any>({ children: Component }: FinderContentNoMatchesProps<FItem, FContext>) {
    const finder = useFinder();
    if (finder.isEmpty === false && finder.hasMatches === false) {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return Component;
    }
    return null;
}

export { FinderContentNoMatches };
