import { StringMatchSegment } from "../../types/string-match-types";
/**
 * Helper function to determine which specfic characters are matched inside a string.
 */
export declare function calculateStringMatchSegments(haystack: string | string[], needle: string): StringMatchSegment[] | undefined;
/**
 * Determine if a characterIndexFn would return a result for a haystack.
 */
export declare function hasCharacterIndexMatches(haystack: string | string[], needle: string, exact?: boolean): boolean;
