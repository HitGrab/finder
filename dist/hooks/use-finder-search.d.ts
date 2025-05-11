import { FinderSearchFunction, FinderStateSnapshot } from "../types";
interface useFinderSearchOptions<FItem> {
    initialSearchTerm: FinderStateSnapshot["searchTerm"];
    searchFn?: FinderSearchFunction<FItem>;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
declare function useFinderSearch<FItem>(options: useFinderSearchOptions<FItem>): {
    state: string | undefined;
    disabled: boolean;
    set: (incomingSearchTerm?: string) => void;
};
export { useFinderSearch };
