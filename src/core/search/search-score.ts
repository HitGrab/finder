import { SearchToken } from "../types/string-match-types";

export function calculateSearchScore(indexes: number[], haystack: SearchToken) {
    const percentOfHaystackMatched = indexes.length / haystack.raw.length;

    let longestSequentialSequence = 1;
    let numSequentialIndexes = 1;
    let lastIndex: number | undefined = 0;
    for (let x = 0; x < indexes.length; x += 1) {
        if (lastIndex !== undefined && indexes.at(x) === lastIndex + 1) {
            numSequentialIndexes += 1;
            if (numSequentialIndexes >= longestSequentialSequence) {
                longestSequentialSequence = numSequentialIndexes;
            }
        }
        lastIndex = indexes.at(x);
    }

    return { percentOfHaystackMatched, longestSequentialSequence };
}
