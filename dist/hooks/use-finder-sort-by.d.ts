import { FinderSortByDefinition, FinderSortDirection, FinderStateSnapshot } from "../types";
interface useFinderSortByOptions<FItem> {
    initialSortby: FinderStateSnapshot["sortBy"];
    initialSortDirection?: FinderSortDirection;
    definitions?: FinderSortByDefinition<FItem>[];
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
declare function useFinderSortBy<FItem>(options: useFinderSortByOptions<FItem>): {
    state: string | undefined;
    direction: FinderSortDirection;
    definitions: FinderSortByDefinition<FItem>[];
    set: (incomingSortByIdentifier?: string, incomingSortDirection?: FinderSortDirection) => void;
    cycleDirection: () => void;
    reset: () => void;
};
export { useFinderSortBy };
