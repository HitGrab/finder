export declare class StringMatchHaystack {
    #private;
    source: string;
    transformed: string;
    constructor(haystack: string);
    getSourceCharacterIndex(transformedCharacterIndex: number): number;
    /**
     * We need to preserve the relationship between the source and the transformed results.
     */
    static composeTransformedHaystackSegments(haystack: string): {
        value: string;
        index: number;
        length: number;
    }[];
}
