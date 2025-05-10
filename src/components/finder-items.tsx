import { ElementType, isValidElement, cloneElement } from "react";
import { useFinder } from "../hooks/use-finder";
import { FinderItemsComponentProps } from "../types";

interface FinderItemsProps<FItem> {
    children: ElementType<FinderItemsComponentProps<FItem>>;
}
function FinderItems<FItem>({ children: renderProp }: FinderItemsProps<FItem>) {
    const finder = useFinder();

    if (Array.isArray(finder.results.items) && finder.results.items.length > 0 && renderProp) {
        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, { items: finder.results.items, pagination: finder.pagination, meta: finder.meta.state });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component items={finder.results.items} pagination={finder.pagination} meta={finder.meta.state} />;
        }
    }
    return null;
}

export { FinderItems };
