import { ElementType, isValidElement, cloneElement } from "react";
import { useFinder } from "../hooks/use-finder";
import { FinderGroupsComponentProps } from "../types";

interface FinderGroupsProps<FItem> {
    children: ElementType<FinderGroupsComponentProps<FItem>>;
}
function FinderGroups<FItem>({ children: renderProp }: FinderGroupsProps<FItem>) {
    const finder = useFinder();

    if (Array.isArray(finder.results.groups) && finder.results.groups.length > 0 && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, { groups: finder.results.groups, pagination: finder.pagination, meta: finder.meta.state });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component groups={finder.results.groups} pagination={finder.pagination} meta={finder.meta.state} />;
        }
    }

    return null;
}

export { FinderGroups };
