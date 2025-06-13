import { MixinInjectedDependencies } from "../types/internal-types";

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
            const previousValue = this.maxSelectedItems;
            this.maxSelectedItems = value;
            this.deps.touch({
                source: "selectedItems",
                event: "change.selectedItems.setMaxSelectedItems",
                current: { maxSelectedItems: this.maxSelectedItems },
                initial: { maxSelectedItems: previousValue },
            });
        }
    }

    set(items: FItem[]) {
        const previousValue = this.selectedItems;
        this.selectedItems = items;
        this.deps.touch({
            source: "selectedItems",
            event: "change.selectedItems.set",
            current: { selectedItems: this.selectedItems },
            initial: { selectedItems: previousValue },
        });
    }

    select(item: FItem) {
        if (this.deps.isDisabled()) {
            return;
        }

        const selectionLimitReached = this.maxSelectedItems !== undefined && this.selectedItems.length >= this.maxSelectedItems;
        const isAlreadySelected = this.selectedItems.includes(item);
        if (selectionLimitReached || isAlreadySelected) {
            return;
        }

        this.selectedItems = [...this.selectedItems.filter((row) => item !== row), item];
        this.deps.touch({
            source: "selectedItems",
            event: "change.selectedItems.select",
            current: { item },
            initial: { item },
        });
    }

    /**
     * Select a single item and clear any other selected items.
     */
    selectOnly(item: FItem) {
        if (this.deps.isDisabled()) {
            return;
        }

        const isAlreadySelected = this.selectedItems.includes(item);
        if (isAlreadySelected) {
            return;
        }

        // silently empty out all other selected items
        this.selectedItems = [];
        this.select(item);
    }

    toggle(item: FItem) {
        if (this.deps.isDisabled()) {
            return;
        }
        const wasSelected = this.selectedItems.includes(item);
        if (wasSelected) {
            // delete it if found
            this.selectedItems = this.selectedItems?.filter((row) => row !== item);
        } else {
            // add it otherwise
            this.selectedItems = [...this.selectedItems, item];
        }

        this.deps.touch({
            source: "selectedItems",
            event: "change.selectedItems.toggle",
            current: { item, is_selected: !wasSelected },
            initial: { item, is_selected: wasSelected },
        });
    }

    toggleOnly(item: FItem) {
        if (this.deps.isDisabled()) {
            return;
        }
        const wasSelected = this.selectedItems.includes(item);
        if (wasSelected) {
            // delete it if found
            this.selectedItems = [];
        } else {
            // add it otherwise
            this.selectedItems = [item];
        }

        this.deps.touch({
            source: "selectedItems",
            event: "change.selectedItems.toggle",
            current: { item, is_selected: !wasSelected },
            initial: { item, is_selected: wasSelected },
        });
    }

    delete(item: FItem) {
        if (this.deps.isDisabled()) {
            return;
        }
        this.deps.touch({
            source: "selectedItems",
            event: "change.selectedItems.delete",
            current: { item, is_selected: false },
            initial: { item, is_selected: true },
        });
        this.set(this.selectedItems?.filter((row) => row !== item));
    }

    reset() {
        if (this.deps.isDisabled()) {
            return;
        }
        const previousValue = this.selectedItems;
        this.selectedItems = [];
        this.deps.touch({
            source: "selectedItems",
            event: "change.selectedItems.reset",
            current: { selectedItems: [] },
            initial: { selectedItems: previousValue },
        });
    }
}

export { SelectedItemsMixin };
