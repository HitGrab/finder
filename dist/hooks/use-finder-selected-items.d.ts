import { FinderStateSnapshot } from "../types";
interface useFinderSelectedItemsOptions<FItem> {
    initialSelectedItems: FItem[];
    maxSelectedItems?: number;
    onChange: (diff: FinderStateSnapshot) => void;
}
declare function useFinderSelectedItems<FItem>(options: useFinderSelectedItemsOptions<FItem>): {
    state: FItem[];
    select: (item: FItem) => void;
    delete: (item: FItem) => void;
    isSelected: (item: FItem) => boolean;
    reset: () => void;
    maxSelectedItems: number | undefined;
};
export { useFinderSelectedItems };
