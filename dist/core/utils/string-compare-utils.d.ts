/**
 * Case-insensitive sequential string comparison with line breaks and white spaces removed.
 * If the method receive an optional aliases array, each of those aliases will be compared as well.
 */
export declare function finderStringCompare(haystack: string, needle: string, aliases?: string[] | null): boolean;
/**
 * Compare if the same characters are all represented in a string.
 */
export declare function finderCharacterCompare(haystack: string, needle: string, aliases?: string[] | null): boolean;
/**
 * Compare if the same characters are represented sequentially in a string.
 */
export declare function finderSequentialCharacterCompare(haystack: string, needle: string, aliases?: string[] | null): boolean;
