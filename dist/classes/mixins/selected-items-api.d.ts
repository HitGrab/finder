import { SelectedItemsMixin } from "./selected-items";
/**
 * Public surface for the Selected Items mixin
 */
declare function selectedItemsAPI<FItem>(mixin: SelectedItemsMixin<FItem>): {
    items: FItem[];
    maxSelectedItems: number | undefined;
    setMaxSelectedItems: (value?: number) => void;
    select: (item: FItem) => void;
    delete: (item: FItem) => void;
    isSelected: (item: FItem) => boolean;
    reset: () => void;
};
export { selectedItemsAPI };
