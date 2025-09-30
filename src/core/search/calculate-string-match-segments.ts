import { StringMatchSegment } from "../types/string-match-types";
import { calculateSequentialCharacterIndexes } from "./algorithms/sequential-characters";
import { calculateSequentialStringCharacterIndexes } from "./algorithms/sequential-string";
import { transformStringForComparison } from "./search-string-transform";
import { StringMatchHaystack } from "./string-match-haystack";

/**
 * Helper function to determine which specfic characters are matched inside a string.
 */
export function calculateStringMatchSegments(haystack: string | string[], needle: string) {
    const transformedNeedle = transformStringForComparison(needle);
    const haystackAsArray = Array.isArray(haystack) ? haystack : [haystack];

    // StringMatchHaystack will build a map between the source and transformed strings.
    const haystacks = haystackAsArray.map((hay) => new StringMatchHaystack(hay));

    return haystacks.reduce<StringMatchSegment[] | undefined>((match, haystack) => {
        // stop looking once a match is found
        if (match !== undefined) {
            return match;
        }

        const matchedCharacterIndexes = calculateSequentialCharacterIndexes(haystack.transformed, transformedNeedle);

        // if no matching character indexes were found, this particular needle did not succeed.
        if (matchedCharacterIndexes === undefined) {
            return match;
        }

        // build segments based on the transformed haystack
        const transformedHaystackMatches = prepareResultSegments(matchedCharacterIndexes, haystack.transformed);

        // map the segments back to the source haystack
        const firstPassSegments = processResultSegments(haystack, transformedHaystackMatches);

        return prettifyResultSegments(firstPassSegments);
    }, undefined);
}

/**
 * Find result segments based on the transformed Haystack value
 */
function prepareResultSegments(characterMatches: number[], transformedHaystackString: string) {
    const stringToProcess = [...characterMatches];
    const matches: StringMatchSegment[] = [];

    // Escape hatch to make sure we don't get caught in an infinite loop.
    let iterationCount = 0;

    while (stringToProcess.length > 0 && iterationCount < 100) {
        const characterMatchIndex = stringToProcess.at(0);

        if (characterMatchIndex === undefined) {
            throw new Error("Should never get here");
        }

        let numSequentialIndexes = 1;
        for (let x = 1; x <= stringToProcess.length; x += 1) {
            const nextChar = stringToProcess.at(x);
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
        });

        // remove this character range now that we've processed them
        stringToProcess.splice(0, numSequentialIndexes);
        iterationCount += 1;
    }

    return matches;
}

/**
 * Map the transformed haystack matches back to the source string.
 */
function processResultSegments(haystack: StringMatchHaystack, matches: StringMatchSegment[]) {
    return matches.reduce<StringMatchSegment[]>((acc, match, x) => {
        /**
         * If our first postive match does not begin at index zero, we prefix a negative result segment ending where the first positive match begins.
         */
        if (x === 0 && match.index !== 0) {
            const value = haystack.source.substring(0, haystack.getSourceCharacterIndex(match.index));
            acc.push({
                index: 0,
                value,
                is_match: false,
                length: value.length,
            });
        }

        const currentSegmentStart = haystack.getSourceCharacterIndex(match.index);
        const currentSegmentEnd = haystack.getSourceCharacterIndex(match.index + match.length);
        const currentSegmentValue = haystack.source.substring(currentSegmentStart, currentSegmentEnd);
        acc.push({
            index: currentSegmentStart,
            value: currentSegmentValue,
            is_match: true,
            length: currentSegmentValue.length,
        });

        // look ahead for the next match, and add a 'missing' match for characters between here and there
        const nextMatch = matches.at(x + 1);
        if (nextMatch) {
            const negativeSegmentStart = haystack.getSourceCharacterIndex(match.index + match.length);
            const negativeSegmentEnd = haystack.getSourceCharacterIndex(nextMatch.index);
            const negativeSegmentValue = haystack.source.substring(negativeSegmentStart, negativeSegmentEnd);
            acc.push({
                index: negativeSegmentStart,
                value: negativeSegmentValue,
                is_match: false,
                length: negativeSegmentValue.length,
            });
        } else if (currentSegmentStart + currentSegmentValue.length !== haystack.source.length) {
            const finalSegmentStart = currentSegmentStart + currentSegmentValue.length;
            const finalSegmentValue = haystack.source.substring(finalSegmentStart);
            acc.push({
                index: finalSegmentStart,
                value: finalSegmentValue,
                is_match: false,
                length: finalSegmentValue.length,
            });
        }

        return acc;
    }, []);
}

/** Adjust whitespaces around segments to tightly match positive segments. */
function prettifyResultSegments(segments: StringMatchSegment[]) {
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
