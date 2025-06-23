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
});
