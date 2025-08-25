/**
 * Ensure haystacks and needles are formatted consistently.
 *
 * Transforming includes:
 * 1. Convert to lowercase.
 * 2. Strip all non-word and non-digit characters.
 */
export function transformStringForComparison(value: string) {
    return value.toLowerCase().replace(/[^\w\d]+/g, "");
}
