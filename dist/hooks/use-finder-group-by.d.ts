import { FinderGroupByDefinition, FinderStateSnapshot } from "../types";
interface useFinderGroupByOptions<FItem> {
    initialGroupBy: FinderStateSnapshot["groupBy"];
    definitions?: FinderGroupByDefinition<FItem>[];
    requireGroup?: boolean;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
declare function useFinderGroupBy<FItem>(options: useFinderGroupByOptions<FItem>): {
    state: string | undefined;
    definitions: FinderGroupByDefinition<FItem>[];
    required: boolean;
    set: (groupByIdentifier?: string) => void;
    toggle: (incomingGroupByIdentifier: string) => void;
    reset: () => void;
};
export { useFinderGroupBy };
