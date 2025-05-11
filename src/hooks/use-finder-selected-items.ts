import { useState } from "react";
import { FinderStateSnapshot } from "../types";

interface useFinderSelectedItemsOptions<FItem> {
    initialSelectedItems: FItem[];
    maxSelectedItems?: number;
    onChange: (diff: FinderStateSnapshot) => void;
}
function useFinderSelectedItems<FItem>(options: useFinderSelectedItemsOptions<FItem>) {
    const [selectedItems, setSelectedItems] = useState<FItem[]>(options.initialSelectedItems);

    return {
        state: selectedItems,
        select: (item: FItem) => {
            if (selectedItems && options.maxSelectedItems && selectedItems?.length >= options.maxSelectedItems) {
                throw new Error("Finder cannot select this item without exceeding maxSelectedItems.");
            }
            setSelectedItems((prevSelectedItems) => {
                return [...prevSelectedItems, item];
            });
            options.onChange({ selectedItems: [...(selectedItems ?? []), item] });
        },
        delete: (item: FItem) => {
            const revisedSelectedItems = selectedItems?.filter((row) => row !== item);
            setSelectedItems(revisedSelectedItems ?? []);

            options.onChange({ selectedItems: revisedSelectedItems });
        },
        isSelected: (item: FItem) => {
            return !!selectedItems?.includes(item);
        },
        reset: () => {
            setSelectedItems([]);
            options.onChange({ selectedItems: [] });
        },
        maxSelectedItems: options.maxSelectedItems,
    };
}

export { useFinderSelectedItems };
