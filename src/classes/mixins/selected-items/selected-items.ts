import { FinderInjectedHandlers } from "../../../types";
import { FINDER_EVENTS } from "../../finder-events";

class SelectedItemsMixin<FItem> {
    selectedItems: FItem[];

    maxSelectedItems?: number;

    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialSelectedItems: FItem[] | undefined, maxSelectedItems: number | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.selectedItems = initialSelectedItems || [];
        this.maxSelectedItems = maxSelectedItems;
        this.#handlers = handlers;
    }

    setMaxSelectedItems(value?: number) {
        if (value !== this.maxSelectedItems) {
            this.maxSelectedItems = value;
            this.#handlers.emit(FINDER_EVENTS.CHANGE, { maxSelectedItems: this.maxSelectedItems });
        }
    }

    set(items: FItem[]) {
        this.selectedItems = items;
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { selectedItems: this.selectedItems });
    }

    select(item: FItem) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        if (this.maxSelectedItems !== undefined && this.selectedItems.length >= this.maxSelectedItems) {
            throw new Error("Finder cannot select this item without exceeding the selected items limit.");
        }
        this.#handlers.emit(FINDER_EVENTS.TOGGLE_SELECTED_ITEM, { item, isSelected: true });
        this.set([...this.selectedItems.filter((row) => item !== row), item]);
    }

    delete(item: FItem) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.#handlers.emit(FINDER_EVENTS.TOGGLE_SELECTED_ITEM, { item, isSelected: false });
        this.set(this.selectedItems?.filter((row) => row !== item));
    }

    reset() {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.set([]);
    }
}

export { SelectedItemsMixin };
