import { FinderInjectedHandlers } from "../../../types";
declare class SelectedItemsMixin<FItem> {
    #private;
    selectedItems: FItem[];
    maxSelectedItems?: number;
    constructor(initialSelectedItems: FItem[] | undefined, maxSelectedItems: number | undefined, handlers: FinderInjectedHandlers<FItem>);
    setMaxSelectedItems(value?: number): void;
    set(items: FItem[]): void;
    select(item: FItem): void;
    delete(item: FItem): void;
    reset(): void;
}
export { SelectedItemsMixin };
