import { calculateSequentialCharacterIndexes } from "../algorithms/sequential-characters";
import { calculateSequentialStringCharacterIndexes } from "../algorithms/sequential-string";
import { transformStringForComparison } from "../search-string-transform";
import { ResultSegmentHaystack } from "./result-segment-haystack";
import { ResultSegment, ResultSegmentInternal, SearchCharacterIndexFn } from "./result-segment-types";

/**
 * Helper function to determine which specfic characters are matched inside a string.
 */
export function getSearchResultSegments(characterIndexFn: SearchCharacterIndexFn, haystack: string, needle: string, aliases?: string[] | null) {
    const transformedNeedle = transformStringForComparison(needle);
    const haystackAndAliasArray = aliases ? [haystack, ...aliases] : [haystack];
    const haystacks = haystackAndAliasArray.map((hay) => new ResultSegmentHaystack(hay));

    return haystacks.reduce<ResultSegment[] | undefined>((match, haystack) => {
        // stop looking once a match is found
        if (match !== undefined) {
            return match;
        }

        // if no matches are found, this particular needle did not succeed.
        const matchedCharacterIndexes = characterIndexFn(haystack.transformed, transformedNeedle);

        if (matchedCharacterIndexes !== undefined) {
            // build segments based on the transformed haystack
            const transformedHaystackMatches = prepareResultSegments(matchedCharacterIndexes, haystack.transformed);

            // map the segments back to the source haystack
            match = processResultSegments(haystack, transformedHaystackMatches);
        }

        return match;
    }, undefined);
}

/**
 * Find result segments based on the transformed Haystack value
 */
function prepareResultSegments(characterMatches: number[], transformedHaystackString: string) {
    // Escape hatch to make sure we don't get caught in an infinite loop.
    let iterationCount = 0;
    let matches: ResultSegmentInternal[] = [];

    while (characterMatches.length > 0 && iterationCount < 100) {
        const characterMatchIndex = characterMatches.at(0);

        if (characterMatchIndex === undefined) {
            throw new Error("Should never get here");
        }

        let numSequentialIndexes = 1;
        for (let x = 1; x <= characterMatches.length; x += 1) {
            const nextChar = characterMatches.at(x);
            if (nextChar !== undefined && characterMatchIndex + x === nextChar) {
                numSequentialIndexes += 1;
            }
        }

        const start = characterMatchIndex;
        const end = characterMatchIndex + numSequentialIndexes;
        const value = transformedHaystackString.substring(start, end + numSequentialIndexes);

        // append the positive match
        matches.push({
            start,
            end,
            value,
            is_match: true,
            length: value.length,
            _internal: true,
        });

        // remove this character range now that we've processed them
        characterMatches.splice(0, numSequentialIndexes);
        iterationCount += 1;
    }

    return matches;
}

/**
 * Map the transformed haystack matches back to the source string.
 */
function processResultSegments(haystack: ResultSegmentHaystack, matchesFromTransformedHaystack: ResultSegment[]) {
    let matches: ResultSegment[] = [];

    const firstMatch = matchesFromTransformedHaystack.at(0);
    if (firstMatch && firstMatch.start !== 0) {
        const end = haystack.getSourceCharacterIndex(firstMatch.start);
        const value = haystack.source.substring(0, end);

        matches.push({
            start: 0,
            end,
            value,
            is_match: false,
            length: value.length,
        });
    }

    matchesFromTransformedHaystack.forEach((segment, index) => {
        const start = haystack.getSourceCharacterIndex(segment.start);
        const end = haystack.getSourceCharacterIndex(segment.end);
        const value = haystack.source.substring(start, end);
        matches.push({
            start,
            end,
            value,
            is_match: segment.is_match,
            length: value.length,
        });

        // look ahead for the next match, and add a 'missing' match for characters between here and there
        const nextMatch = matchesFromTransformedHaystack.at(index + 1);
        if (nextMatch) {
            const start = haystack.getSourceCharacterIndex(segment.end);
            const end = haystack.getSourceCharacterIndex(nextMatch.start);
            const value = haystack.source.substring(start, end);
            matches.push({
                start,
                end,
                value,
                is_match: false,
                length: value.length,
            });
        }
    });

    const lastMatch = matchesFromTransformedHaystack.at(matchesFromTransformedHaystack.length - 1);
    if (lastMatch && lastMatch.end !== haystack.source.length) {
        const start = haystack.getSourceCharacterIndex(lastMatch.end);
        const value = haystack.source.substring(start);

        matches.push({
            start,
            end: haystack.source.length,
            value,
            is_match: false,
            length: value.length,
        });
    }

    return matches;
}

/**
 * Determine if a characterIndexFn would return a result for a haystack.
 */
export function hasCharacterIndexMatches(haystack: string | string[], needle: string, exact = false) {
    const haystackAsArray = Array.isArray(haystack) ? haystack : [haystack];
    const transformedNeedle = transformStringForComparison(needle);
    const comparatorFn = exact ? calculateSequentialStringCharacterIndexes : calculateSequentialCharacterIndexes;
    return haystackAsArray.some((hay) => {
        const transformedHaystack = transformStringForComparison(hay);
        return comparatorFn(transformedHaystack, transformedNeedle) !== undefined;
    });
}
