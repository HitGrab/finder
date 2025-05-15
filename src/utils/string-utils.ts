/**
 * Massage and compare two strings.
 * If the method receieves an optional aliases array, each of those aliases will be compared as well.
 */
export function finderStringCompare(haystack: string, needle: string, aliases?: string[]) {
    const transformedHaystack = transformStringForComparison(haystack);
    const transformedNeedle = transformStringForComparison(needle);
    const matchesAliases = aliases?.some((aliasHaystack) => transformStringForComparison(aliasHaystack).includes(transformedNeedle)) ?? false;
    return transformedHaystack.includes(transformedNeedle) || matchesAliases;
}

/**
 * Ensure haystacks and needles are formatted consistently.
 *
 * Massaging includes:
 * 1. Removing all whitespaces, line breaks, and pipe characters ( i.e: the | in SUPER|brie+)
 * 2. Convert to lowercase.
 */
function transformStringForComparison(value: string) {
    return value.toLowerCase().replace(/[|\s]+/g, "");
}
