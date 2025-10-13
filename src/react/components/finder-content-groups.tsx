import { ElementType } from "react";
import { useFinder } from "../hooks/use-finder";
import { FinderContentProps } from "../..";

interface FinderContentGroupsProps<FItem, FContext> {
    children: ElementType<FinderContentProps<FItem, FContext>["groups"]>;
}
function FinderContentGroups<FItem = any, FContext = any>({ children: Component }: FinderContentGroupsProps<FItem, FContext>) {
    const finder = useFinder();
    if (finder.hasMatches && finder.matches.groups) {
        if (typeof Component === "function") {
            return <Component groups={finder.matches.groups} pagination={finder.pagination} context={finder.context as FContext} />;
        }

        return Component;
    }

    return null;
}

export { FinderContentGroups };
