import { ElementType } from "react";
import { FinderContentGroupProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderContentGroupsProps<FItem = any> {
    children: ElementType<FinderContentGroupProps<FItem>>;
}
function FinderContentGroups<FItem>({ children: Component }: FinderContentGroupsProps<FItem>) {
    const finder = useFinder();
    if (finder.hasMatches && finder.matches.groups) {
        if (typeof Component === "function") {
            return <Component groups={finder.matches.groups} pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }

    return null;
}

export { FinderContentGroups };
