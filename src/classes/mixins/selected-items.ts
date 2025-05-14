import { FinderInjectedHandlers } from "../../types";

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
            this.#handlers.onChange({ maxSelectedItems: this.maxSelectedItems });
        }
    }

    select(item: FItem) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        if (this.maxSelectedItems !== undefined && this.selectedItems.length >= this.maxSelectedItems) {
            throw new Error("Finder cannot select this item without exceeding the selected items limit.");
        }
        this.selectedItems = [...this.selectedItems.filter((row) => item !== row), item];

        this.#handlers.onChange({ selectedItems: this.selectedItems });
    }

    delete(item: FItem) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.selectedItems = this.selectedItems?.filter((row) => row !== item);
        this.#handlers.onChange({ selectedItems: this.selectedItems });
    }

    reset() {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.selectedItems = [];
        this.#handlers.onChange({ selectedItems: this.selectedItems });
    }
}

export { SelectedItemsMixin };
