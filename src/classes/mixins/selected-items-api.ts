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
        toggle: (item: FItem) => {
            if (mixin.selectedItems.includes(item)) {
                mixin.delete(item);
                return;
            }
            mixin.select(item);
        },
        isSelected: (item: FItem) => mixin.selectedItems.includes(item),
        reset: mixin.reset.bind(mixin),
    };
}

export { selectedItemsAPI };
