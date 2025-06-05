import { FinderConstructorOptions } from "../../types";
import { Finder as FinderCore } from "../../core/finder";
/**
 * Create a finder instance with contained state and controllers.
 */
declare function useFinder<FItem>(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, initialMeta, page, numItemsPerPage, plugins, isLoading, disabled, requireGroup, maxSelectedItems, onInit, onChange, }: FinderConstructorOptions<FItem>): FinderCore<FItem>;
export { useFinder };
