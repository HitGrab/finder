import { hasCharacterIndexMatches, calculateStringMatchSegments } from "../search/string-matches/calculate-string-match-segments";

describe("Utils", () => {
    test("Every digit or word character is sequentially present in a haystack,", () => {
        const searchTerm = "AB    C\nD\r    E";

        const positiveHaystack = "aabciop[cde";
        const positiveMatch = hasCharacterIndexMatches(positiveHaystack, searchTerm);
        expect(positiveMatch).toBe(true);

        const haystackWithReversedCharacters = "e d c b a";
        const negativeMatch = hasCharacterIndexMatches(haystackWithReversedCharacters, searchTerm);
        expect(negativeMatch).toBe(false);
    });

    test("getSearchResultSegments generates correct segments", () => {
        const sequentialCharacterMatches = calculateStringMatchSegments(" Robert?!", "bert");
        expect(sequentialCharacterMatches).toEqual([
            { index: 0, value: " Ro", is_match: false, length: 3 },
            { index: 3, value: "bert", is_match: true, length: 4 },
            { index: 7, value: "?!", is_match: false, length: 2 },
        ]);
    });

    test("getSearchResultSegments trims whitespace", () => {
        const sequentialCharacterMatches = calculateStringMatchSegments(" Totally sweet hotdog mobile", "hotdog");
        expect(sequentialCharacterMatches).toEqual([
            { index: 0, value: " Totally sweet ", is_match: false, length: 15 },
            { index: 15, value: "hotdog", is_match: true, length: 7 },
            { index: 21, value: " mobile", is_match: false, length: 7 },
        ]);
    });
});
