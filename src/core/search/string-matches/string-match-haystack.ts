export class StringMatchHaystack {
    source;

    #transformedSegments;

    transformed;

    constructor(haystack: string) {
        this.source = haystack;
        const segments = StringMatchHaystack.composeTransformedHaystackSegments(haystack);
        this.#transformedSegments = segments;

        // stringified for quick testing
        this.transformed = segments
            .map((segment) => segment.value)
            .join("")
            .toLowerCase();
    }

    getSourceCharacterIndex(transformedCharacterIndex: number) {
        let segmentStart = 0;
        return this.#transformedSegments.reduce((sourceIndex, segment) => {
            // stop looking once a match is found
            if (sourceIndex !== Infinity) {
                return sourceIndex;
            }
            const segmentEnd = segmentStart + segment.value.length;

            if (transformedCharacterIndex >= segmentStart && transformedCharacterIndex <= segmentEnd) {
                const relativeIndex = transformedCharacterIndex - segmentStart;
                sourceIndex = segment.index + relativeIndex;
            }
            segmentStart += segment.value.length;
            return sourceIndex;
        }, Infinity);
    }

    /**
     * We need to preserve the relationship between the source and the transformed results.
     */
    static composeTransformedHaystackSegments(haystack: string) {
        const safeCharacters = haystack.matchAll(/[\w\d]+/g);
        const segments = [];
        for (const match of safeCharacters) {
            segments.push({ value: match[0], index: match.index, length: match[0].length });
        }
        return segments;
    }
}
