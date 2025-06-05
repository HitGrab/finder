/**
 * Case-insensitive string comparison with line breaks and white spaces removed.
 * If the method receive an optional aliases array, each of those aliases will be compared as well.
 */
export function finderStringCompare(haystack: string, needle: string, aliases?: string[] | null) {
    const transformedNeedle = transformStringForComparison(needle);
    const haystackArray = transformHaystackArray(haystack, aliases);
    return haystackArray.some((hay) => hay.includes(transformedNeedle));
}

/**
 * Compare if the same characters are all represented in a string.
 */
export function finderCharacterCompare(haystack: string, needle: string, aliases?: string[] | null) {
    const transformedNeedle = transformStringForComparison(needle);
    const haystackArray = transformHaystackArray(haystack, aliases);

    return Array.from(transformedNeedle).every((character) => {
        return haystackArray.some((hay) => {
            return hay.includes(character);
        });
    });
}

/**
 * Compare if the same characters are represented sequentially in a string.
 */
export function finderSequentialCharacterCompare(haystack: string, needle: string, aliases?: string[] | null) {
    const transformedNeedle = transformStringForComparison(needle);
    const haystackArray = transformHaystackArray(haystack, aliases);

    const needleAsArray = Array.from(transformedNeedle);
    return haystackArray.some((hay) => {
        let hayStackToIterateThrough = hay;
        let hasMatch = true;
        needleAsArray.forEach((character) => {
            if (hasMatch) {
                const index = hayStackToIterateThrough.indexOf(character);
                if (index !== -1) {
                    hayStackToIterateThrough = hayStackToIterateThrough.substring(index);
                } else {
                    hasMatch = false;
                }
            }
        });
        return hasMatch;
    });
}

function transformHaystackArray(haystack: string, aliases: string[] | null = []) {
    if (!aliases) {
        return [transformStringForComparison(haystack)];
    }
    return [transformStringForComparison(haystack), ...aliases.map(transformStringForComparison)];
}

/**
 * Ensure haystacks and needles are formatted consistently.
 *
 * Transforming includes:
 * 1. Convert to lowercase.
 * 2. Strip all non-word and non-digit characters.
 */
function transformStringForComparison(value: string) {
    return value.toLowerCase().replace(/[^\w\d]+/g, "");
}
