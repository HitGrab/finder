import { FinderConfig, FinderStateSnapshot, FinderCore, FinderGroupByDefinition, FinderResultGroup, FinderFilterDefinition, FinderMeta } from "../types";
export declare function findResults<FItem>(items: FItem[] | null | undefined, config: FinderConfig<FItem> | undefined, snapshot: FinderStateSnapshot, page?: number, numItemsPerPage?: number): FinderCore<FItem>["results"];
export declare function findItems<FItem>(items: FItem[] | undefined, config: FinderConfig<FItem> | undefined, snapshot: FinderStateSnapshot): FItem[];
export declare function groupItems<FItem>(items: FItem[] | undefined, groupByDefinition: FinderGroupByDefinition<FItem>): FinderResultGroup<FItem>[];
export declare function composeFilterValuesWithSideEffects<FItem>(filterIdentifier: string, filterState: any, filters: FinderFilterDefinition<FItem>[], initialFilterValues?: FinderStateSnapshot["filters"], meta?: FinderMeta): Record<string, any>;
/**
 * Filters are static arrays, and may not all be active.
 * This method identifies which filters have matching filterValues that make them relevant.
 */
export declare function composeActiveFilterDefinitions<Item>(filterDefinitions?: FinderFilterDefinition<Item>[], filterValues?: FinderStateSnapshot["filters"]): FinderFilterDefinition<Item, any>[];
