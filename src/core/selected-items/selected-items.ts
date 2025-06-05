import { FINDER_EVENTS } from "../events/event-constants";
import { MixinInjectedDependencies } from "../types/core-types";

type InitialValues<FItem> = {
    initialSelectedItems: FItem[] | undefined;
    maxSelectedItems: number | undefined;
};
class SelectedItemsMixin<FItem> {
    selectedItems;

    maxSelectedItems;

    deps;

    constructor({ initialSelectedItems, maxSelectedItems }: InitialValues<FItem>, handlers: MixinInjectedDependencies<FItem>) {
        this.selectedItems = initialSelectedItems || [];
        this.maxSelectedItems = maxSelectedItems;
        this.deps = handlers;
    }

    setMaxSelectedItems(value?: number) {
        if (value !== this.maxSelectedItems) {
            this.maxSelectedItems = value;
            this.deps.touch({ maxSelectedItems: this.maxSelectedItems });
        }
    }

    set(items: FItem[]) {
        this.selectedItems = items;
        this.deps.touch({ selectedItems: this.selectedItems });
    }

    select(item: FItem) {
        if (this.deps.isDisabled()) {
            return;
        }
        if (this.maxSelectedItems !== undefined && this.selectedItems.length >= this.maxSelectedItems) {
            throw new Error("Finder cannot select this item without exceeding the selected items limit.");
        }
        this.deps.eventEmitter.emit(FINDER_EVENTS.TOGGLE_SELECTED_ITEM, { item, isSelected: true });
        this.set([...this.selectedItems.filter((row) => item !== row), item]);
    }

    delete(item: FItem) {
        if (this.deps.isDisabled()) {
            return;
        }
        this.deps.eventEmitter.emit(FINDER_EVENTS.TOGGLE_SELECTED_ITEM, { item, isSelected: false });
        this.set(this.selectedItems?.filter((row) => row !== item));
    }

    reset() {
        if (this.deps.isDisabled()) {
            return;
        }
        this.set([]);
    }
}

export { SelectedItemsMixin };
