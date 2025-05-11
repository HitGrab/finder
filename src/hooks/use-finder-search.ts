import { useState } from "react";
import { FinderSearchFunction, FinderStateSnapshot } from "../types";

interface useFinderSearchOptions<FItem> {
    initialSearchTerm: FinderStateSnapshot["searchTerm"];
    searchFn?: FinderSearchFunction<FItem>;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
function useFinderSearch<FItem>(options: useFinderSearchOptions<FItem>) {
    const [searchTerm, setSearchTerm] = useState<FinderStateSnapshot["searchTerm"]>(options.initialSearchTerm);
    return {
        state: searchTerm,
        disabled: options?.searchFn === undefined,
        set: (incomingSearchTerm?: string) => {
            options.onInit && options.onInit();
            setSearchTerm(incomingSearchTerm);
            options.onChange({ searchTerm: incomingSearchTerm });
        },
    };
}

export { useFinderSearch };
