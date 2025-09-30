import { transformStringForComparison } from "../search-string-transform";
import { calculateSequentialCharacterIndexes } from "./sequential-characters";
import { calculateSequentialStringCharacterIndexes } from "./sequential-string";

export function calculateCharacterMatchIndexes(haystack: string, needle: string) {
    const regex = new RegExp(/"(.*?)"/g);

    // Match any quoted strings inside the needle that need to be exactly matched, like 'apple "Bob" mustard'.
    let subquery;
    while ((subquery = regex.exec(needle)) !== null) {
        const subqueryNeedle = transformStringForComparison(String(subquery[1]));
        if (calculateSequentialStringCharacterIndexes(haystack, subqueryNeedle) === undefined) {
            return undefined;
        }
    }

    const transformedNeedle = transformStringForComparison(needle);
    return calculateSequentialCharacterIndexes(haystack, transformedNeedle);
}
