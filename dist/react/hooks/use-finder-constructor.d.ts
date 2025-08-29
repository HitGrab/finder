import { FinderCore } from "../../core/finder-core";
import { FinderConstructorOptions } from "../../core/types/core-types";
/**
 * Create a finder instance with contained state and controllers.
 */
declare function useFinderConstructor<FItem>(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, context, page, numItemsPerPage, isLoading, disabled, requireGroup, onInit, onReady, onFirstUserInteraction, onChange, }: FinderConstructorOptions<FItem>): FinderCore<FItem>;
export { useFinderConstructor };
