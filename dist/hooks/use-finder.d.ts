import { FinderInstance, FinderConstructorOptions } from "../types";
/**
 * Create a finder instance with contained state and controllers.
 */
declare function useFinder<FItem>(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortby, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, initialMeta, page, numItemsPerPage, isLoading, disabled, requireGroup, maxSelectedItems, onInit, onChange, }: FinderConstructorOptions<FItem>): FinderInstance<FItem>;
export { useFinder };
