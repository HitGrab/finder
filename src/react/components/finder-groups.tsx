import { ElementType, isValidElement, cloneElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { FinderGroupsComponentProps } from "../types/react-types";

interface FinderGroupsProps<FItem = any> {
    children: ElementType<FinderGroupsComponentProps<FItem>>;
}
function FinderGroups<FItem>({ children: renderProp }: FinderGroupsProps<FItem>) {
    const finder = useFinderContext();
    if (finder.state === "groups" && finder.matches.groups && finder.groupBy.activeRule && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, {
                groups: finder.matches.groups,
                rule: finder.groupBy.activeRule,
                selectedItems: finder.selectedItems,
                pagination: finder.pagination,
                meta: finder.meta,
                layout: finder.layout,
            });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return (
                <Component
                    groups={finder.matches.groups}
                    rule={finder.groupBy.activeRule}
                    selectedItems={finder.selectedItems}
                    pagination={finder.pagination}
                    meta={finder.meta}
                    layout={finder.layout}
                />
            );
        }
    }

    return null;
}

export { FinderGroups };
