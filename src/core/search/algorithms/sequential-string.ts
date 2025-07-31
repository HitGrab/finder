import { range } from "lodash";
import { Haystack } from "../haystack";

export function calculateSequentialStringCharacterIndexes(haystack: Haystack, needle: string) {
    const index = haystack.transformed.indexOf(needle);
    if (index === -1) {
        return undefined;
    }
    return range(index, index + needle.length).map((characterIndex) => characterIndex);
}
