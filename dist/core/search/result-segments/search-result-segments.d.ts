import { ResultSegment, SearchCharacterIndexFn } from "./result-segment-types";
/**
 * Helper function to determine which specfic characters are matched inside a string.
 */
export declare function getSearchResultSegments(characterIndexFn: SearchCharacterIndexFn, haystack: string, needle: string, aliases?: string[] | null): ResultSegment[] | undefined;
/**
 * Determine if a characterIndexFn would return a result for a haystack.
 */
export declare function hasCharacterIndexMatches(characterIndexFn: SearchCharacterIndexFn, haystack: string, needle: string, aliases?: string[] | null): boolean;
/**
 * Ensure haystacks and needles are formatted consistently.
 *
 * Transforming includes:
 * 1. Convert to lowercase.
 * 2. Strip all non-word and non-digit characters.
 */
export declare function transformStringForComparison(value: string): string;
