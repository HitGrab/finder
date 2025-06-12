import { ElementType, isValidElement, cloneElement } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { FinderItemsComponentProps } from "../types/react-types";

interface FinderItemsProps<FItem = any> {
    children: ElementType<FinderItemsComponentProps<FItem>>;
}
function FinderItems<FItem>({ children: renderProp }: FinderItemsProps<FItem>) {
    const finder = useFinderContext();
    if (finder.state === "items" && finder.matches.items && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, {
                items: finder.matches.items,
                selectedItems: finder.selectedItems,
                pagination: finder.pagination,
                meta: finder.meta,
            });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component items={finder.matches.items} selectedItems={finder.selectedItems} pagination={finder.pagination} meta={finder.meta} />;
        }
    }
    return null;
}

export { FinderItems };
