import { orderBy } from "lodash";
import { SerializedSearchMixin } from "../types/core-types";
import { calculateCharacterMatchIndexes } from "./calculate-character-match-indexes";
import { calculateSearchScore } from "./search-score";
import { transformStringForComparison } from "./search-string-transform";

interface SearchScoreItem<FItem> {
    item: FItem;
    score: SearchScore;
}

interface SearchScore {
    percentOfHaystackMatched: number;
    longestSequentialSequence: number;
}

export function defaultSearchAndSortAlgorithm<FItem>(options: SerializedSearchMixin, items: FItem[], context: unknown) {
    const matches = items.reduce<SearchScoreItem<FItem>[]>((acc, item) => {
        if (options.rule?.searchFn === undefined) {
            return acc;
        }

        // Retrieve this item's array of haystack strings to compare the search needle against
        const itemHaystackStringOrStrings = options.rule.searchFn(item, context);
        const itemHaystacks = Array.isArray(itemHaystackStringOrStrings)
            ? itemHaystackStringOrStrings.map(transformStringForComparison)
            : [transformStringForComparison(itemHaystackStringOrStrings)];

        // an item may have multiple matches if it has multiple haystack strings.
        const itemHaystackScores = itemHaystacks.reduce<ReturnType<typeof calculateSearchScore>[]>((scores, haystack) => {
            const indexes = calculateCharacterMatchIndexes(haystack, options.searchTerm);
            if (indexes !== undefined) {
                scores.push(calculateSearchScore(indexes, haystack));
            }
            return scores;
        }, []);

        // determine which ( if any ) of the aliases have the best score.
        if (itemHaystackScores.length > 0) {
            const sortedItemHaystackScores = orderBy(itemHaystackScores, ["percentOfHaystackMatched", "longestSequentialSequence"], ["desc", "asc"]);
            const bestScore = sortedItemHaystackScores.at(0);

            if (bestScore) {
                acc.push({ item, score: bestScore });
            }
        }

        return acc;
    }, []);

    const overallLongestSequentialSequence = matches.reduce((length, match) => {
        if (match.score.longestSequentialSequence > length) {
            length = match.score.longestSequentialSequence;
        }
        return length;
    }, 0);

    // sort all results by their search score.
    const sortedMatches = orderBy(
        matches,
        [
            (match) => {
                // A ratio of matched characters to haystack length. ( 0 - 100 )
                // With the needle 'ap', 'app' has a score of 66, while 'apple' is 40.
                const percentMatchScore = match.score.percentOfHaystackMatched * 100;

                // Rank all matches by their relative number of sequential matches. ( 0 - 100)
                // With the needle 'orange', 'orc angel' has a score of 80, while 'delicious oranges' is 100.
                const sequenceScore = (match.score.longestSequentialSequence / overallLongestSequentialSequence) * 100;

                // Equally weight both results for a score between 0 - 200.
                return percentMatchScore + sequenceScore;
            },
        ],
        ["desc"],
    );

    return sortedMatches.map((match) => match.item);
}
