import { calculateSequentialCharacterIndexes } from "../search/algorithms/sequential-characters";
import { getSearchResultSegments } from "../search/result-segments/search-result-segments";
import { finderSequentialCharacterCompare } from "../utils/string-compare-utils";

describe("Utils", () => {
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
        const sequentialCharacterMatches = getSearchResultSegments(calculateSequentialCharacterIndexes, " Robert?!", "bert");
        expect(sequentialCharacterMatches).toEqual([
            { start: 0, end: 3, value: " Ro", is_match: false, length: 3 },
            { start: 3, end: 7, value: "bert", is_match: true, length: 4 },
            { start: 7, end: 9, value: "?!", is_match: false, length: 2 },
        ]);
    });
});
