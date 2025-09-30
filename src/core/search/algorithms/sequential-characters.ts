export function calculateSequentialCharacterIndexes(haystack: string, needle: string) {
    const needleAsCharacterArray = Array.from(needle);
    let characterMatches: number[] = [];
    let hayStackToIterateThrough = haystack;
    let numProcessedCharacters = 0;
    let hasMismatch = false;
    for (const character of needleAsCharacterArray) {
        const indexInHaystack = hayStackToIterateThrough.indexOf(character);
        if (indexInHaystack === -1) {
            hasMismatch = true;
        }

        if (hasMismatch === false) {
            characterMatches.push(numProcessedCharacters + indexInHaystack);

            // remove processed characters from haystack
            const numCharactersToRemove = indexInHaystack + 1;
            numProcessedCharacters += numCharactersToRemove;
            hayStackToIterateThrough = hayStackToIterateThrough.substring(numCharactersToRemove);
        }
    }

    if (hasMismatch) {
        return undefined;
    }
    return characterMatches;
}
