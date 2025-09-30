/**
 *  These values all point to the transformed haystack.
 */
export interface StringMatchSegment {
    index: number;
    length: number;
    is_match: boolean;
    value: string;
}
export type SearchCharacterIndexFn = (haystack: string, needle: string) => number[] | undefined;
