import { ElementType, ReactNode } from "react";
import { useFinder } from "../hooks/use-finder";
import { FinderContentProps } from "../types/react-types";

interface FinderContentItemsProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["items"]> | Iterable<ReactNode>;
}
function FinderContentItems<FItem = any, FContext = any>({ children: Component }: FinderContentItemsProps<FItem, FContext>) {
    const finder = useFinder();
    if (finder.hasMatches && finder.matches.items) {
        if (typeof Component === "function") {
            return <Component items={finder.matches.items} pagination={finder.pagination} context={finder.context as FContext} />;
        }
        return Component;
    }
    return null;
}

export { FinderContentItems };
