import { Haystack } from "../haystack";

export function calculateUnorderedCharacterIndexes(haystack: Haystack, needle: string) {
    const needleAsCharacterArray = Array.from(needle);
    let hayStackAsArray = Array.from(haystack.transformed);
    let hasMismatch = false;
    const uniqueNeedleCharacterSet = new Set(needleAsCharacterArray);
    let characterMatches: number[] = [];
    Array.from(uniqueNeedleCharacterSet).forEach((character) => {
        const currentCharacterMatches = hayStackAsArray.reduce<number[]>((acc, hayChar, index) => {
            if (hayChar === character) {
                acc.push(index);
            }
            return acc;
        }, []);

        if (currentCharacterMatches.length === 0) {
            hasMismatch = true;
        }

        characterMatches = [...characterMatches, ...currentCharacterMatches];
    });

    if (hasMismatch) {
        return undefined;
    }

    characterMatches.sort((a, b) => a - b);
    return characterMatches;
}
