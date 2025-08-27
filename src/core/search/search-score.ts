export function calculateSearchScore(indexes: number[], haystack: string) {
    const percentOfHaystackMatched = indexes.length / haystack.length;

    let longestSequentialSequence = 1;
    let numSequentialIndexes = 1;
    let lastIndex: number | undefined = 0;
    for (let x = 0; x < indexes.length; x += 1) {
        if (lastIndex !== undefined && indexes.at(x) === lastIndex + 1) {
            numSequentialIndexes += 1;
            if (numSequentialIndexes >= longestSequentialSequence) {
                longestSequentialSequence = numSequentialIndexes;
            }
        }
        lastIndex = indexes.at(x);
    }

    return { percentOfHaystackMatched, longestSequentialSequence };
}
