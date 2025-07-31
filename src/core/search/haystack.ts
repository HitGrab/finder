export class Haystack {
    source;

    #transformedSegments;

    transformed;

    constructor(haystack: string) {
        this.source = haystack;
        const segments = Haystack.composeTransformedHaystackSegments(haystack);
        this.#transformedSegments = segments;

        // stringified for quick testing
        this.transformed = segments
            .map((segment) => segment.value)
            .join("")
            .toLowerCase();
    }

    getSourceCharacterIndex(transformedCharacterIndex: number) {
        let segmentStart = 0;
        let sourceIndex: number = Infinity;
        this.#transformedSegments.forEach((segment) => {
            const segmentEnd = segmentStart + segment.value.length;
            if (transformedCharacterIndex >= segmentStart && transformedCharacterIndex <= segmentEnd) {
                const relativeIndex = transformedCharacterIndex - segmentStart;
                sourceIndex = segment.start + relativeIndex;
            }
            segmentStart += segment.value.length;
        });
        return sourceIndex;
    }

    /**
     * We need to preserve the relationship between the source and the transformed results.
     */
    static composeTransformedHaystackSegments(haystack: string) {
        const safeCharacters = haystack.matchAll(/[\w\d]+/g);
        let segments = [];
        for (const match of safeCharacters) {
            segments.push({ value: match[0], start: match.index, end: match.index + match[0].length });
        }
        return segments;
    }
}
