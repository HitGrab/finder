import { MixinInjectedDependencies } from "../types/core-types";
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
    delete(item: FItem): void;
    reset(): void;
}
export { SelectedItemsMixin };
