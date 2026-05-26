import { range } from "lodash";

import { SearchToken } from "../types/string-match-types";
import { StringMatchTester } from "./string-match-tester";

export function calculateCharacterMatchIndexes(haystack: SearchToken, needle: SearchToken) {
    const subqueryRegex = new RegExp(/"(.*?)"/g);
    let needleWithoutSubqueries = needle.raw;
    let characterIndexes: number[] = [];

    // Match any quoted strings inside the needle that need to be exactly matched, like 'apple "Bob" mustard'.
    let subquery;
    let hasFailedSubquery = false;
    while ((subquery = subqueryRegex.exec(needle.raw)) !== null && hasFailedSubquery === false) {
        const subqueryNeedle = StringMatchTester.transformStringForComparison(String(subquery[1]));
        const subqueryCharacterIndexes = calculateExactStringCharacterIndexes(haystack.transformed, subqueryNeedle);

        // early exit if a subquery fails
        if (subqueryCharacterIndexes === undefined) {
            hasFailedSubquery = true;
        } else {
            characterIndexes = characterIndexes.concat(subqueryCharacterIndexes);

            // remove subquery from needle so future checks don't duplicate it.
            needleWithoutSubqueries = needleWithoutSubqueries.replace(subquery[0], "");
        }
    }

    if (hasFailedSubquery) {
        return undefined;
    }

    const transformedNeedle = StringMatchTester.transformStringForComparison(needleWithoutSubqueries);
    const sequentialCharacterIndexes = calculateSequentialCharacterIndexes(haystack.transformed, transformedNeedle);
    if (sequentialCharacterIndexes === undefined) {
        return undefined;
    }
    characterIndexes = characterIndexes.concat(sequentialCharacterIndexes);
    const sortedCharacterIndexes = characterIndexes.sort((a, b) => a - b);
    return sortedCharacterIndexes;
}

function calculateExactStringCharacterIndexes(haystack: string, needle: string) {
    // impossible to return a match
    if (haystack.length < needle.length) {
        return undefined;
    }
    const index = haystack.indexOf(needle);
    if (index === -1) {
        return undefined;
    }
    return range(index, index + needle.length).map((characterIndex) => characterIndex);
}

function calculateSequentialCharacterIndexes(haystack: string, needle: string) {
    // impossible to return a match
    if (haystack.length < needle.length) {
        return undefined;
    }
    const needleAsCharacterArray = Array.from(needle);
    const characterMatches: number[] = [];
    let hayStackToIterateThrough = haystack;
    let numProcessedCharacters = 0;
    let hasMismatch = false;
    for (const character of needleAsCharacterArray) {
        const indexInHaystack = hayStackToIterateThrough.indexOf(character);
        if (indexInHaystack === -1) {
            hasMismatch = true;
        }

        if (hasMismatch === false) {
            characterMatches.push(numProcessedCharacters + indexInHaystack);

            // remove processed characters from haystack
            const numCharactersToRemove = indexInHaystack + 1;
            numProcessedCharacters += numCharactersToRemove;
            hayStackToIterateThrough = hayStackToIterateThrough.substring(numCharactersToRemove);
        }
    }

    if (hasMismatch) {
        return undefined;
    }
    return characterMatches;
}
