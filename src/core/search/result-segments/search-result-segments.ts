import { calculateSequentialCharacterIndexes } from "../algorithms/sequential-characters";
import { calculateSequentialStringCharacterIndexes } from "../algorithms/sequential-string";
import { transformStringForComparison } from "../search-string-transform";
import { ResultSegmentHaystack } from "./result-segment-haystack";
import { ResultSegment, ResultSegmentInternal } from "./result-segment-types";

/**
 * Helper function to determine which specfic characters are matched inside a string.
 */
export function getSearchResultSegments(haystack: string | string[], needle: string) {
    const transformedNeedle = transformStringForComparison(needle);
    const haystackAsArray = Array.isArray(haystack) ? haystack : [haystack];

    // ResultSegmentHaystack will transform the haystack and build a map between source and transformed strings.
    const haystacks = haystackAsArray.map((hay) => new ResultSegmentHaystack(hay));

    return haystacks.reduce<ResultSegment[] | undefined>((match, haystack) => {
        // stop looking once a match is found
        if (match !== undefined) {
            return match;
        }

        // if no matches are found, this particular needle did not succeed.
        const matchedCharacterIndexes = calculateSequentialCharacterIndexes(haystack.transformed, transformedNeedle);

        if (matchedCharacterIndexes !== undefined) {
            // build segments based on the transformed haystack
            const transformedHaystackMatches = prepareResultSegments(matchedCharacterIndexes, haystack.transformed);

            // map the segments back to the source haystack
            const firstPassSegments = processResultSegments(haystack, transformedHaystackMatches);

            match = prettifyResultSegments(firstPassSegments);
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

        const index = characterMatchIndex;
        const end = characterMatchIndex + numSequentialIndexes;
        const value = transformedHaystackString.substring(index, end);

        // append the positive match
        matches.push({
            index,
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
function processResultSegments(haystack: ResultSegmentHaystack, matches: ResultSegment[]) {
    let segments: ResultSegment[] = [];

    const firstMatch = matches.at(0);
    if (firstMatch && firstMatch.index !== 0) {
        const value = haystack.source.substring(0, haystack.getSourceCharacterIndex(firstMatch.index));
        segments.push({
            index: 0,
            value,
            is_match: false,
            length: value.length,
        });
    }

    matches.forEach((segment, x) => {
        const start = haystack.getSourceCharacterIndex(segment.index);
        const end = haystack.getSourceCharacterIndex(segment.index + segment.length);
        const value = haystack.source.substring(start, end);
        segments.push({
            index: start,
            value,
            is_match: true,
            length: value.length,
        });

        // look ahead for the next match, and add a 'missing' match for characters between here and there
        const nextMatch = matches.at(x + 1);
        if (nextMatch) {
            const start = haystack.getSourceCharacterIndex(segment.index + segment.length);
            const end = haystack.getSourceCharacterIndex(nextMatch.index);
            const value = haystack.source.substring(start, end);
            segments.push({
                index: start,
                value,
                is_match: false,
                length: value.length,
            });
        }
    });

    const lastMatch = matches.at(matches.length - 1);
    if (lastMatch && lastMatch.index + lastMatch.length !== haystack.source.length) {
        const start = haystack.getSourceCharacterIndex(lastMatch.index + lastMatch.length);
        const value = haystack.source.substring(start);

        segments.push({
            index: start,
            value,
            is_match: false,
            length: value.length,
        });
    }

    return segments;
}

/** Adjust whitespaces around segments to tightly match positive segments. */
function prettifyResultSegments(segments: ResultSegment[]) {
    const regexp = /\S/;
    const prettySegments = [...segments];
    prettySegments.forEach((segment, index) => {
        if (segment.is_match) {
            const firstNonWhitespaceIndex = segment.value.search(regexp);
            if (firstNonWhitespaceIndex !== 0) {
                const previousSegment = prettySegments.at(index - 1);
                if (previousSegment) {
                    previousSegment.length += firstNonWhitespaceIndex;
                    // append whitespace or line-breaks to previous segment
                    previousSegment.value += segment.value.substring(0, firstNonWhitespaceIndex);

                    // trim start of the current segment
                    segment.value = segment.value.substring(firstNonWhitespaceIndex);
                    segment.index = segment.index + firstNonWhitespaceIndex;
                }
            }
        }
    });

    return prettySegments;
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
