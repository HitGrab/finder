import { ElementType } from "react";
import { FinderContentItemProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderContentItemsProps<FItem = any> {
    children: ElementType<FinderContentItemProps<FItem>>;
}
function FinderContentItems<FItem>({ children: Component }: FinderContentItemsProps<FItem>) {
    const finder = useFinder();
    if (finder.hasMatches && finder.matches.items) {
        if (typeof Component === "function") {
            return <Component items={finder.matches.items} pagination={finder.pagination} context={finder.context} />;
        }
        return Component;
    }
    return null;
}

export { FinderContentItems };
