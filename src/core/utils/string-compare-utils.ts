import { calculateSequentialCharacterIndexes } from "../search/algorithms/sequential-characters";
import { calculateSequentialStringCharacterIndexes } from "../search/algorithms/sequential-string";
import { calculateUnorderedCharacterIndexes } from "../search/algorithms/unordered-characters";
import { hasCharacterIndexMatches } from "../search/result-segments/search-result-segments";

/**
 * Case-insensitive sequential string comparison with line breaks and white spaces removed.
 * If the method receive an optional aliases array, each of those aliases will be compared as well.
 */
export function finderStringCompare(haystack: string, needle: string, aliases?: string[] | null) {
    return hasCharacterIndexMatches(calculateSequentialStringCharacterIndexes, haystack, needle, aliases);
}

/**
 * Compare if the same characters are all represented in a string.
 */
export function finderCharacterCompare(haystack: string, needle: string, aliases?: string[] | null) {
    return hasCharacterIndexMatches(calculateUnorderedCharacterIndexes, haystack, needle, aliases);
}

/**
 * Compare if the same characters are represented sequentially in a string.
 */
export function finderSequentialCharacterCompare(haystack: string, needle: string, aliases?: string[] | null) {
    return hasCharacterIndexMatches(calculateSequentialCharacterIndexes, haystack, needle, aliases);
}
