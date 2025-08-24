import { range } from "lodash";

export function calculateSequentialStringCharacterIndexes(haystack: string, needle: string) {
    const index = haystack.indexOf(needle);
    if (index === -1) {
        return undefined;
    }
    return range(index, index + needle.length).map((characterIndex) => characterIndex);
}
