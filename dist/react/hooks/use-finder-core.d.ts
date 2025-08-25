import { FinderConstructorOptions } from "../../types";
import { FinderCore } from "../../core/finder-core";
/**
 * Create a finder instance with contained state and controllers.
 */
declare function useFinderCore<FItem>(items: FItem[] | null | undefined, { rules, initialSearchTerm, initialSortBy, initialSortDirection, initialGroupBy, initialFilters, initialSelectedItems, context, page, numItemsPerPage, layoutVariants, initialLayout, plugins, isLoading, disabled, requireGroup, maxSelectedItems, onInit, onReady, onFirstUserInteraction, onChange, }: FinderConstructorOptions<FItem>): FinderCore<FItem>;
export { useFinderCore };
