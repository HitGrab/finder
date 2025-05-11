import { useState } from "react";
import { FinderGroupByDefinition, FinderStateSnapshot } from "../types";

interface useFinderGroupByOptions<FItem> {
    initialGroupBy: FinderStateSnapshot["groupBy"];
    definitions?: FinderGroupByDefinition<FItem>[];
    requireGroup?: boolean;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
function useFinderGroupBy<FItem>(options: useFinderGroupByOptions<FItem>) {
    const [groupBy, setGroupBy] = useState<FinderStateSnapshot["groupBy"]>(options.initialGroupBy);
    const defaultGroupByDefinition = options?.requireGroup && Array.isArray(options.definitions) ? options.definitions?.at(0) : undefined;

    function wrappedSetGroupBy(groupByIdentifier?: string) {
        options.onInit && options.onInit();

        const groupByDefinition = options.definitions?.find(({ id }) => groupByIdentifier === id);
        if (groupByDefinition === undefined) {
            throw new Error(`Finder could not locate the groupBy definition for ${groupByIdentifier}.`);
        }

        // early exit if nothing changed
        if (groupBy === groupByIdentifier) {
            return;
        }

        setGroupBy(groupByIdentifier);
        options.onChange({ groupBy: groupByIdentifier });
    }

    return {
        state: groupBy ?? defaultGroupByDefinition?.id,
        definitions: options.definitions || [],
        required: !!options?.requireGroup,
        set: wrappedSetGroupBy,
        toggle: (incomingGroupByIdentifier: string) => {
            if (groupBy === incomingGroupByIdentifier) {
                wrappedSetGroupBy(undefined);
                return;
            }
            wrappedSetGroupBy(incomingGroupByIdentifier);
        },
        reset: () => {
            wrappedSetGroupBy(undefined);
        },
    };
}

export { useFinderGroupBy };
