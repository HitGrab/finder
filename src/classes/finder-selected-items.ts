import { FinderInjectedHandlers } from "../types";

class FinderSelectedItems<FItem> {
    #selectedItems: FItem[];

    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialSelectedItems: FItem[] | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#selectedItems = initialSelectedItems || [];
        this.#handlers = handlers;
    }

    get value() {
        return this.#selectedItems;
    }

    select(item: FItem) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        const maxItems = this.#handlers.getMaxSelectedItems();
        if (maxItems !== undefined && this.#selectedItems.length >= maxItems) {
            throw new Error("Finder cannot select this item without exceeding the selected items limit.");
        }
        this.#selectedItems = [...this.#selectedItems.filter((row) => item !== row), item];

        this.#handlers.onChange({ selectedItems: this.#selectedItems });
    }

    delete(item: FItem) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.#selectedItems = this.#selectedItems?.filter((row) => row !== item);

        this.#handlers.onChange({ selectedItems: this.#selectedItems });
    }

    isSelected(item: FItem) {
        return this.#selectedItems.includes(item);
    }

    reset() {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.#selectedItems = [];
        this.#handlers.onChange({ selectedItems: this.#selectedItems });
    }

    get maxSelectedItems() {
        return this.#handlers.getMaxSelectedItems();
    }
}

export { FinderSelectedItems };
