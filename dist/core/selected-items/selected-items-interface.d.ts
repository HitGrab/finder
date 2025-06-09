import { SelectedItemsMixin } from "./selected-items";
/**
 * Public surface for the Selected Items mixin
 */
declare function readonlySelectedItemsInterface<FItem>(mixin: SelectedItemsMixin<FItem>): {
    items: FItem[];
    maxSelectedItems: number | undefined;
    isSelected: (item: FItem) => boolean;
};
declare function selectedItemsInterface<FItem>(mixin: SelectedItemsMixin<FItem>): {
    setMaxSelectedItems: (value?: number) => void;
    select: (item: FItem) => void;
    selectOnly: (item: FItem) => void;
    delete: (item: FItem) => void;
    toggle: (item: FItem) => void;
    toggleOnly: (item: FItem) => void;
    reset: () => void;
    items: FItem[];
    maxSelectedItems: number | undefined;
    isSelected: (item: FItem) => boolean;
};
export { readonlySelectedItemsInterface, selectedItemsInterface };
