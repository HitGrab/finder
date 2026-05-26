import { StringMatchTester } from "../search/string-match-tester";

describe("Utils", () => {
    test("Every digit or word character is sequentially present in a haystack,", () => {
        const searchTerm = "AB    C\nD\r    E";

        const positiveHaystack = "aabciop[cde";
        const positiveMatch = new StringMatchTester(positiveHaystack, searchTerm);
        expect(positiveMatch.hasMatch).toBe(true);

        const haystackWithReversedCharacters = "e d c b a";
        const negativeMatch = new StringMatchTester(haystackWithReversedCharacters, searchTerm);
        expect(negativeMatch.hasMatch).toBe(false);
    });

    test("getSearchResultSegments generates correct segments", () => {
        const tester = new StringMatchTester(" Robert?!", "bert");
        expect(tester.segments).toEqual([
            { index: 0, value: " Ro", is_match: false, length: 3 },
            { index: 3, value: "bert", is_match: true, length: 4 },
            { index: 7, value: "?!", is_match: false, length: 2 },
        ]);
    });

    test("getSearchResultSegments trims whitespace", () => {
        const tester = new StringMatchTester(" Totally sweet hotdog mobile", "hotdog");
        expect(tester.segments).toEqual([
            { index: 0, value: " Totally sweet ", is_match: false, length: 15 },
            { index: 15, value: "hotdog", is_match: true, length: 7 },
            { index: 21, value: " mobile", is_match: false, length: 7 },
        ]);
    });

    test("getSearchResultSegments correctly groups subqueries", () => {
        const tester = new StringMatchTester("Light Leisure Suit", '"suit"');
        expect(tester.segments).toEqual([
            { index: 0, value: "Light Leisure ", is_match: false, length: 14 },
            { index: 14, value: "Suit", is_match: true, length: 5 },
        ]);
    });
});
