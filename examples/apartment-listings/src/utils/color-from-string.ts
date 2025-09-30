/**
 * Randomly choose a colour based on string.
 */
export function composeColorFromString(string: string) {
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    const stringUniqueHash = [...string].reduce((acc, char) => {
        // eslint-disable-next-line no-bitwise
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return `hsl(${stringUniqueHash % 360}, 100%, 70%)`;
}
