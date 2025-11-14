import { FinderContentProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";
import { ElementType, ReactElement, ReactNode } from "react";

interface FinderContentEmptyProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["empty"]> | ReactElement<FinderContentProps<FItem, FContext>["empty"]> | Iterable<ReactNode>;
}
function FinderContentEmpty<FItem = any, FContext = any>({ children: Component }: FinderContentEmptyProps<FItem, FContext>) {
    const finder = useFinder();
    if (finder.state === "empty") {
        if (typeof Component === "function") {
            return <Component pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return Component;
    }
    return null;
}

export { FinderContentEmpty };
