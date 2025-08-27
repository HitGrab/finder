import { calculateSequentialCharacterIndexes } from "../search/algorithms/sequential-characters";
import { hasCharacterIndexMatches } from "../search/result-segments/search-result-segments";

/**
 * Compare if the same characters are represented sequentially in a string.
 */
export function finderSequentialCharacterCompare(haystack: string, needle: string, aliases?: string[] | null) {
    return hasCharacterIndexMatches(calculateSequentialCharacterIndexes, haystack, needle, aliases);
}
