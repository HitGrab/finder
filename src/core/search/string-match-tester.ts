import { SearchToken, StringMatchSegment } from "../types/string-match-types";
import { calculateCharacterMatchIndexes } from "./calculate-character-match-indexes";
import { calculateStringMatchSegments } from "./calculate-string-match-segments";

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
            transformed: StringMatchTester.transformStringForComparison(needle),
        };
        this.#haystack = {
            raw: haystack,
            transformed: StringMatchTester.transformStringForComparison(haystack),
        };
    }

    #process() {
        if (this.#isProcessed) {
            return;
        }
        this.#characterIndexes = calculateCharacterMatchIndexes(this.#haystack, this.#needle);
    }

    get hasMatch() {
        this.#process();
        return this.#characterIndexes !== undefined;
    }

    get score() {
        this.#process();
        if (this.#score === undefined && this.#characterIndexes !== undefined) {
            const percentOfHaystackMatched = this.#characterIndexes.length / this.#haystack.raw.length;

            let longestSequentialSequence = 1;
            let numSequentialIndexes = 1;
            let lastIndex: number | undefined = 0;
            for (let x = 0; x < this.#characterIndexes.length; x += 1) {
                if (lastIndex !== undefined && this.#characterIndexes.at(x) === lastIndex + 1) {
                    numSequentialIndexes += 1;
                    if (numSequentialIndexes >= longestSequentialSequence) {
                        longestSequentialSequence = numSequentialIndexes;
                    }
                }
                lastIndex = this.#characterIndexes.at(x);
            }

            this.#score = { percentOfHaystackMatched, longestSequentialSequence };
        }
        return this.#score;
    }

    get segments() {
        if (this.#segments === undefined) {
            this.#segments = calculateStringMatchSegments(this.#haystack, this.#needle);
        }
        return this.#segments;
    }

    /**
     * Ensure haystacks and needles are formatted consistently.
     *
     * Transforming includes:
     * 1. Convert to lowercase.
     * 2. Strip all non-word and non-digit characters.
     */
    static transformStringForComparison(value: string) {
        return value.toLowerCase().replace(/[^\w\d]+/g, "");
    }
}
