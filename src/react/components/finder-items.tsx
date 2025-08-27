import { ElementType } from "react";
import { FinderContentItemProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderItemsProps<FItem = any> {
    children: ElementType<FinderContentItemProps<FItem>>;
}
function FinderItems<FItem>({ children: Component }: FinderItemsProps<FItem>) {
    const finder = useFinder();
    if (finder.state === "items" && finder.matches.items && Component) {
        if (typeof Component === "function") {
            return <Component items={finder.matches.items} pagination={finder.pagination} context={finder.context} />;
        }
        return Component;
    }
    return null;
}

export { FinderItems };
