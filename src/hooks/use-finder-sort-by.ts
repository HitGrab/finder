import { useState } from "react";
import { FinderSortByDefinition, FinderSortDirection, FinderStateSnapshot } from "../types";

interface useFinderSortByOptions<FItem> {
    initialSortby: FinderStateSnapshot["sortBy"];
    initialSortDirection?: FinderSortDirection;
    definitions?: FinderSortByDefinition<FItem>[];
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
function useFinderSortBy<FItem>(options: useFinderSortByOptions<FItem>) {
    const [sortBy, setSortBy] = useState<FinderStateSnapshot["sortBy"]>(options.initialSortby);
    const [sortDirection, setSortDirection] = useState<FinderSortDirection>(options?.initialSortDirection);
    const defaultSortByDefinition = Array.isArray(options.definitions) ? options.definitions.at(0) : undefined;

    return {
        state: sortBy ?? defaultSortByDefinition?.id,
        direction: sortDirection,
        definitions: options.definitions || [],
        set: (incomingSortByIdentifier?: string, incomingSortDirection?: FinderSortDirection) => {
            options.onInit && options.onInit();

            const sortByDefinition = options.definitions?.find(({ id }) => incomingSortByIdentifier === id);
            if (sortByDefinition === undefined) {
                throw new Error(`Finder could not locate the sortBy definition for ${sortByDefinition}.`);
            }

            setSortBy(incomingSortByIdentifier);
            setSortDirection(incomingSortDirection);
            options.onChange({ sortBy: incomingSortByIdentifier, sortDirection: incomingSortDirection });
        },
        cycleDirection: () => {
            options.onInit && options.onInit();
            let incomingSortDirection: FinderSortDirection;

            if (sortDirection === null) {
                incomingSortDirection = "desc";
            }
            if (sortDirection === "desc") {
                incomingSortDirection = "asc";
            }
            if (sortDirection === "asc") {
                incomingSortDirection = null;
            }

            options.onChange({ sortDirection: incomingSortDirection });
        },
        reset: () => {
            options.onInit && options.onInit();
            setSortBy(undefined);
            setSortDirection(undefined);
        },
    };
}

export { useFinderSortBy };
