import { range } from "lodash";
import { transformStringForComparison } from "./search-string-transform";

export function calculateCharacterMatchIndexes(haystack: string, needle: string) {
    const subqueryRegex = new RegExp(/"(.*?)"/g);
    let needleWithoutSubqueries = needle;
    let characterIndexes: number[] = [];

    // Match any quoted strings inside the needle that need to be exactly matched, like 'apple "Bob" mustard'.
    let subquery;
    let hasFailedSubquery = false;
    while ((subquery = subqueryRegex.exec(needle)) !== null && hasFailedSubquery === false) {
        const subqueryNeedle = transformStringForComparison(String(subquery[1]));
        const subqueryCharacterIndexes = calculateExactStringCharacterIndexes(haystack, subqueryNeedle);

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

    const transformedNeedle = transformStringForComparison(needleWithoutSubqueries);
    const sequentialCharacterIndexes = calculateSequentialCharacterIndexes(haystack, transformedNeedle);
    if (sequentialCharacterIndexes === undefined) {
        return undefined;
    }
    characterIndexes = characterIndexes.concat(sequentialCharacterIndexes);
    const sortedCharacterIndexes = characterIndexes.sort((a, b) => a - b);
    return sortedCharacterIndexes;
}

function calculateExactStringCharacterIndexes(haystack: string, needle: string) {
    const index = haystack.indexOf(needle);
    if (index === -1) {
        return undefined;
    }
    return range(index, index + needle.length).map((characterIndex) => characterIndex);
}

function calculateSequentialCharacterIndexes(haystack: string, needle: string) {
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
