import { SelectedItemsMixin } from "./selected-items";

/**
 * Public surface for the Selected Items mixin
 */
function readonlySelectedItemsInterface<FItem>(mixin: SelectedItemsMixin<FItem>) {
    return { items: mixin.selectedItems, maxSelectedItems: mixin.maxSelectedItems, isSelected: (item: FItem) => mixin.selectedItems.includes(item) };
}

function selectedItemsInterface<FItem>(mixin: SelectedItemsMixin<FItem>) {
    return {
        ...readonlySelectedItemsInterface(mixin),
        setMaxSelectedItems: mixin.setMaxSelectedItems.bind(mixin),
        select: mixin.select.bind(mixin),
        selectOnly: mixin.selectOnly.bind(mixin),
        delete: mixin.delete.bind(mixin),
        toggle: mixin.toggle.bind(mixin),
        toggleOnly: mixin.toggleOnly.bind(mixin),
        reset: mixin.reset.bind(mixin),
    };
}

export { readonlySelectedItemsInterface, selectedItemsInterface };
