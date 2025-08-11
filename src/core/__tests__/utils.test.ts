import { calculateSequentialCharacterIndexes } from "../search/algorithms/sequential-characters";
import { calculateSequentialStringCharacterIndexes } from "../search/algorithms/sequential-string";
import { calculateUnorderedCharacterIndexes } from "../search/algorithms/unordered-characters";
import { getSearchResultSegments } from "../search/result-segments/search-result-segments";
import { finderStringCompare, finderCharacterCompare, finderSequentialCharacterCompare } from "../utils/string-compare-utils";

describe("Utils", () => {
    test("finderStringCompare performs case-insensitive search and strips non-digit and non-word characters", () => {
        const searchTerm = "AB    C\nD\r    E";

        const positiveHaystack = "a b c d e";
        const positiveMatch = finderStringCompare(positiveHaystack, searchTerm);
        expect(positiveMatch).toBe(true);

        const negativeHaystack = "aaccd";
        const negativeMatch = finderStringCompare(negativeHaystack, searchTerm);
        expect(negativeMatch).toBe(false);
    });

    test("finderCharacterCompare checks that every digit or word character is present in a haystack", () => {
        const searchTerm = "AB    C\nD\r    E";
        const haystackWithReversedCharacters = "e d c b a";
        const positiveMatch = finderCharacterCompare(haystackWithReversedCharacters, searchTerm);
        expect(positiveMatch).toBe(true);

        const negativeHaystack = "aaccd";
        const negativeMatch = finderCharacterCompare(negativeHaystack, searchTerm);
        expect(negativeMatch).toBe(false);
    });

    test("finderCharacterCompare checks that every digit or word character is sequentially present in a haystack,", () => {
        const searchTerm = "AB    C\nD\r    E";

        const positiveHaystack = "aabciop[cde";
        const positiveMatch = finderSequentialCharacterCompare(positiveHaystack, searchTerm);
        expect(positiveMatch).toBe(true);

        const haystackWithReversedCharacters = "e d c b a";
        const negativeMatch = finderSequentialCharacterCompare(haystackWithReversedCharacters, searchTerm);
        expect(negativeMatch).toBe(false);
    });

    test("getSearchResultSegments generates correct segments", () => {
        const stringMatches = getSearchResultSegments(calculateSequentialStringCharacterIndexes, " Robert?", "bert");
        expect(stringMatches).toEqual([
            { start: 0, end: 3, value: " Ro", is_match: false, length: 3 },
            { start: 3, end: 7, value: "bert", is_match: true, length: 4 },
            { start: 7, end: 8, value: "?", is_match: false, length: 1 },
        ]);

        const unorderedCharacterMatches = getSearchResultSegments(calculateUnorderedCharacterIndexes, " Robert!", "bert");
        expect(unorderedCharacterMatches).toEqual([
            { start: 1, end: 2, value: "R", is_match: true, length: 1 },
            { start: 2, end: 3, value: "o", is_match: false, length: 1 },
            { start: 3, end: 7, value: "bert", is_match: true, length: 4 },
            { start: 7, end: 8, value: "!", is_match: false, length: 1 },
        ]);

        const sequentialCharacterMatches = getSearchResultSegments(calculateSequentialCharacterIndexes, " Robert?!", "bert");
        expect(sequentialCharacterMatches).toEqual([
            { start: 0, end: 3, value: " Ro", is_match: false, length: 3 },
            { start: 3, end: 7, value: "bert", is_match: true, length: 4 },
            { start: 7, end: 9, value: "?!", is_match: false, length: 2 },
        ]);
    });
});
