import { ResultSegment } from "./result-segment-types";
/**
 * Helper function to determine which specfic characters are matched inside a string.
 */
export declare function getSearchResultSegments(haystack: string | string[], needle: string): ResultSegment[] | undefined;
/**
 * Determine if a characterIndexFn would return a result for a haystack.
 */
export declare function hasCharacterIndexMatches(haystack: string | string[], needle: string, exact?: boolean): boolean;
