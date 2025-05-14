import { SelectedItemsMixin } from "./selected-items";

/**
 * Public surface for the Selected Items mixin
 */
function selectedItemsAPI<FItem>(mixin: SelectedItemsMixin<FItem>) {
    return {
        items: mixin.selectedItems,
        maxSelectedItems: mixin.maxSelectedItems,
        setMaxSelectedItems: mixin.setMaxSelectedItems.bind(mixin),
        select: mixin.select.bind(mixin),
        delete: mixin.delete.bind(mixin),
        isSelected: (item: FItem) => mixin.selectedItems.includes(item),
        reset: mixin.reset.bind(mixin),
    };
}

export { selectedItemsAPI };
