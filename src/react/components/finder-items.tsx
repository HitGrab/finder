import { ElementType, isValidElement } from "react";
import { FinderContentItemProps } from "../types/react-types";
import { useFinder } from "../hooks/use-finder";

interface FinderItemsProps<FItem = any> {
    children: ElementType<FinderContentItemProps<FItem>>;
}
function FinderItems<FItem>({ children: renderProp }: FinderItemsProps<FItem>) {
    const finder = useFinder();
    if (finder.state === "items" && finder.matches.items && renderProp) {
        if (typeof renderProp === "object" && renderProp !== null && isValidElement(renderProp)) {
            return renderProp;
        }

        if (typeof renderProp === "function") {
            const Component = renderProp;
            return (
                <Component
                    items={finder.matches.items}
                    selectedItems={finder.selectedItems}
                    pagination={finder.pagination}
                    context={finder.context}
                    layout={finder.layout}
                />
            );
        }
    }
    return null;
}

export { FinderItems };
