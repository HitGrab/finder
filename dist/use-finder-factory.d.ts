import { useFinderFactoryOptions, FinderCore } from './types';
/**
 * TODO:
 * Validate filter options
 * Filter onChange recursive callback
 * 'prequisite' filter function?
 * Selected layer
 */
/**
 * Utility hook to store search, filter and sorting state.
 */
declare function useFinderFactory<FItem>(items: FItem[] | null | undefined, { config, initialValues, initialMeta, page, numItemsPerPage, isLoading, disabled, onChange }: useFinderFactoryOptions<FItem>): FinderCore<FItem>;
export { useFinderFactory };
