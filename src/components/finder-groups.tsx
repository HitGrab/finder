import * as React from "react";
import { ElementType, isValidElement, cloneElement } from "react";
import { useFinder } from "src/hooks/use-finder";
import { FinderGroupsComponentProps } from "src/types/component-types";

interface FinderGroupsProps<FItem> {
    children: ElementType<FinderGroupsComponentProps<FItem>>;
}
function FinderGroups<FItem>({ children: renderProp }: FinderGroupsProps<FItem>) {
    const finder = useFinder();

    if (finder.results.groups && finder.results.groups.length > 0 && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, { groups: finder.results.groups });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component groups={finder.results.groups} />;
        }
    }

    return null;
}

export { FinderGroups };
