import { useFinderFactoryOptions, FinderCore } from "../types";
/**
 * TODO:
 * Validate filter options
 * Filters need onChange recursive callback
 * 'prequisite' filter function?
 * debounce onChange?
 * Actually implement 'disabled'
 */
/**
 * Create a finder instance with contained state and controllers.
 */
declare function useFinderFactory<FItem>(items: FItem[] | null | undefined, { config, initialValues, initialSelectedItems, initialMeta, page, numItemsPerPage, isLoading, disabled, onChange, }: useFinderFactoryOptions<FItem>): FinderCore<FItem>;
export { useFinderFactory };
