import { Haystack } from "../haystack";

/**
 * Internal type used to prepare the result segment. These values all point to the transformed haystack.
 */
export interface ResultSegmentInternal {
    start: number;
    end: number;
    length: number;
    is_match: boolean;
    value: string;
    _internal: true;
}

/**
 * Consumabel type ready for use. All values are mapped to the haystack source.
 */
export interface ResultSegment extends Omit<ResultSegmentInternal, "_internal"> {}

export type SearchCharacterIndexFn = (haystack: Haystack, needle: string) => number[] | undefined;
