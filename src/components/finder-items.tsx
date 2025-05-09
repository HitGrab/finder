import * as React from "react";
import { ElementType, isValidElement, cloneElement } from "react";
import { useFinder } from "src/hooks/use-finder";
import { FinderItemsComponentProps } from "src/types/component-types";

interface FinderItemsProps<FItem> {
    children: ElementType<FinderItemsComponentProps<FItem>>;
}
function FinderItems<FItem>({ children: renderProp }: FinderItemsProps<FItem>) {
    const finder = useFinder();

    if (Array.isArray(finder.results.items) && finder.results.items.length > 0) {
        let itemsToRender = finder.results.items;

        if (finder.pagination?.disabled === false) {
            const clampedPage = finder.pagination.page > finder.pagination?.lastPage ? finder.pagination.lastPage : finder.pagination.page;
            const offset = (clampedPage - 1) * finder.pagination.numItemsPerPage;
            itemsToRender = finder.results.items.slice(offset, offset + finder.pagination.numItemsPerPage);
        }

        if (typeof renderProp === "object" && isValidElement(renderProp)) {
            return cloneElement(renderProp, { items: itemsToRender, pagination: finder.pagination, meta: finder.meta.state });
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return <Component items={itemsToRender} pagination={finder.pagination} meta={finder.meta.state} />;
        }
    }
    return null;
}

export { FinderItems };
