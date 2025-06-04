import { FinderConstructorOptions } from "../types";
import { Finder } from "../classes/finder";
/**
 * Create a finder instance with contained state and controllers.
 */
declare function useFinder<FItem>(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, initialMeta, page, numItemsPerPage, plugins, isLoading, disabled, requireGroup, maxSelectedItems, onInit, onChange, }: FinderConstructorOptions<FItem>): Finder<FItem>;
export { useFinder };
