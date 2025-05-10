import { FinderConfig, FinderStateSnapshot, FinderCore, FinderGroupByDefinition, FinderResultGroup, FinderFilterDefinition } from "../types";
export declare function findResults<FItem>(items: FItem[] | null | undefined, config: FinderConfig<FItem> | undefined, snapshot: FinderStateSnapshot, meta?: Map<any, any>, page?: number, numItemsPerPage?: number): FinderCore<FItem>["results"];
export declare function findItems<FItem>(items: FItem[] | undefined, config: FinderConfig<FItem> | undefined, snapshot: FinderStateSnapshot, meta?: Map<any, any>): FItem[];
export declare function groupItems<FItem>(items: FItem[] | undefined, groupByDefinition: FinderGroupByDefinition<FItem>): FinderResultGroup<FItem>[];
export declare function composeFilterValuesWithSideEffects<FItem>(filterIdentifier: string, filterState: any, filters: FinderFilterDefinition<FItem>[], initialFilterValues?: FinderStateSnapshot["filters"], meta?: Map<any, any>): Record<string, any>;
/**
 * Filters are static arrays, and may not all be active.
 * This method identifies which filters have matching filterValues that make them relevant.
 */
export declare function composeActiveFilterDefinitions<Item>(filterDefinitions?: FinderFilterDefinition<Item>[], filterValues?: FinderStateSnapshot["filters"]): FinderFilterDefinition<Item, any>[];
