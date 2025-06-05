import { ElementType, isValidElement, cloneElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { FinderGroupsComponentProps } from "../types/react-types";

interface FinderGroupsProps<FItem = any> {
    children: ElementType<FinderGroupsComponentProps<FItem>>;
}
function FinderGroups<FItem>({ children: renderProp }: FinderGroupsProps<FItem>) {
    const finder = useFinderContext();

    if (Array.isArray(finder.matches.groups) && finder.matches.groups.length > 0 && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, {
                groups: finder.matches.groups,
                pagination: finder.pagination,
                meta: finder.meta.value,
                rule: finder.groupBy.activeRule,
            });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component groups={finder.matches.groups} pagination={finder.pagination} meta={finder.meta.value} rule={finder.groupBy.activeRule} />;
        }
    }

    return null;
}

export { FinderGroups };
