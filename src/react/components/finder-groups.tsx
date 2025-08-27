import { ElementType } from "react";
import { FinderContentGroupProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderGroupsProps<FItem = any> {
    children: ElementType<FinderContentGroupProps<FItem>>;
}
function FinderGroups<FItem>({ children: Component }: FinderGroupsProps<FItem>) {
    const finder = useFinder();
    if (finder.state === "groups" && finder.matches.groups && finder.groupBy.activeRule && Component) {
        if (typeof Component === "function") {
            return <Component groups={finder.matches.groups} rule={finder.groupBy.activeRule} pagination={finder.pagination} context={finder.context} />;
        }

        return Component;
    }

    return null;
}

export { FinderGroups };
