import { ElementType, isValidElement } from "react";
import { FinderContentGroupProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderGroupsProps<FItem = any> {
    children: ElementType<FinderContentGroupProps<FItem>>;
}
function FinderGroups<FItem>({ children: renderProp }: FinderGroupsProps<FItem>) {
    const finder = useFinder();
    if (finder.state === "groups" && finder.matches.groups && finder.groupBy.activeRule && renderProp) {
        if (typeof renderProp === "object" && renderProp !== null && isValidElement(renderProp)) {
            return renderProp;
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component groups={finder.matches.groups} rule={finder.groupBy.activeRule} pagination={finder.pagination} context={finder.context} />;
        }
    }

    return null;
}

export { FinderGroups };
