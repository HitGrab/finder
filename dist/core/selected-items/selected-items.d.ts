import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues<FItem> = {
    initialSelectedItems: FItem[] | undefined;
    maxSelectedItems: number | undefined;
};
declare class SelectedItemsMixin<FItem> {
    selectedItems: FItem[];
    maxSelectedItems: number | undefined;
    deps: MixinInjectedDependencies<FItem>;
    constructor({ initialSelectedItems, maxSelectedItems }: InitialValues<FItem>, handlers: MixinInjectedDependencies<FItem>);
    setMaxSelectedItems(value?: number): void;
    set(items: FItem[]): void;
    select(item: FItem): void;
    /**
     * Select a single item and clear any other selected items.
     */
    selectOnly(item: FItem): void;
    toggle(item: FItem): void;
    toggleOnly(item: FItem): void;
    delete(item: FItem): void;
    reset(): void;
}
export { SelectedItemsMixin };
