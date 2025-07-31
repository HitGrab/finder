import { Haystack } from "../haystack";

export function calculateSequentialCharacterIndexes(haystack: Haystack, needle: string) {
    const needleAsCharacterArray = Array.from(needle);
    let characterMatches: number[] = [];
    let hayStackToIterateThrough = haystack.transformed;
    let numProcessedCharacters = 0;
    let hasMismatch = false;
    needleAsCharacterArray.forEach((character) => {
        const indexInHaystack = hayStackToIterateThrough.indexOf(character);
        if (indexInHaystack === -1) {
            hasMismatch = true;
        }

        characterMatches.push(numProcessedCharacters + indexInHaystack);

        // remove processed characters from haystack
        const numCharactersToRemove = Math.max(1, indexInHaystack);
        numProcessedCharacters += numCharactersToRemove;
        hayStackToIterateThrough = hayStackToIterateThrough.substring(numCharactersToRemove);
    });

    if (hasMismatch) {
        return undefined;
    }
    return characterMatches;
}
