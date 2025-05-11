import { FinderFilterDefinition, FinderFilterOption, FinderMeta, FinderStateSnapshot } from "../types";
interface useFinderFiltersOptions<FItem> {
    initialFilterState: FinderStateSnapshot["filters"];
    definitions?: FinderFilterDefinition<FItem>[];
    maxSelectedItems?: number;
    meta?: FinderMeta;
    onInit?: () => void;
    onChange: (diff: FinderStateSnapshot) => void;
}
declare function useFinderFilters<FItem>(items: FItem[] | null | undefined, options: useFinderFiltersOptions<FItem>): {
    state: Record<string, any> | undefined;
    definitions: FinderFilterDefinition<FItem, any>[] | undefined;
    set: (filterIdentifier: string, incomingFilterState: any) => void;
    get: (filterIdentifier: string) => any;
    delete: (filterIdentifier: string) => void;
    toggle: (filterIdentifier: string) => void;
    test: (filterDefinition: FinderFilterDefinition<FItem>, filterState: any, incomingMeta?: FinderMeta | undefined) => FItem[];
    testOptions: (filterDefinition: FinderFilterDefinition<FItem>, incomingMeta?: FinderMeta | undefined) => Map<boolean | FinderFilterOption, any>;
};
export { useFinderFilters };
