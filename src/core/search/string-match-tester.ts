import { SearchToken, StringMatchSegment } from "../types/string-match-types";
import { calculateCharacterMatchIndexes } from "./calculate-character-match-indexes";
import { calculateStringMatchSegments } from "./calculate-string-match-segments";
import { calculateSearchScore } from "./search-score";
import { transformStringForComparison } from "./search-string-transform";

export class StringMatchTester {
    #needle: SearchToken;
    #haystack: SearchToken;
    #characterIndexes: number[] | undefined = [];
    #isProcessed = false;
    #score: { percentOfHaystackMatched: number; longestSequentialSequence: number } | undefined;
    #segments: StringMatchSegment[] | undefined;

    constructor(haystack: string, needle: string) {
        this.#needle = {
            raw: needle,
            transformed: transformStringForComparison(needle),
        };
        this.#haystack = {
            raw: haystack,
            transformed: transformStringForComparison(haystack),
        };
    }

    #process() {
        if (this.#isProcessed) {
            return;
        }
        this.#characterIndexes = calculateCharacterMatchIndexes(this.#haystack.transformed, this.#needle.raw);
    }

    get hasMatch() {
        this.#process();
        return this.#characterIndexes !== undefined;
    }

    get score() {
        this.#process();
        if (this.#score === undefined && this.#characterIndexes !== undefined) {
            this.#score = calculateSearchScore(this.#characterIndexes, this.#haystack);
        }
        return this.#score;
    }

    get segments() {
        if (this.#segments === undefined) {
            this.#segments = calculateStringMatchSegments(this.#haystack, this.#needle);
        }
        return this.#segments;
    }
}
