import { orderBy } from "lodash";
import { MixinInjectedDependencies } from "../types/internal-types";
import { isSearchRule } from "../utils/rule-utils";
import { calculateSequentialCharacterIndexes } from "./algorithms/sequential-characters";
import { calculateSearchScore } from "./search-score";
import { transformStringForComparison } from "./search-string-transform";

type InitialValues = { initialSearchTerm: string | undefined };
type SearchScoreItem<FItem> = { item: FItem; score: { percentOfHaystackMatched: number; longestSequentialSequence: number } };
class SearchMixin<FItem, FContext = any> {
    searchTerm: string;

    #deps;

    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.searchTerm = initialSearchTerm || "";
        this.#deps = deps;
    }

    get rule() {
        return this.#deps.getRuleBook().rules.find(isSearchRule);
    }

    get hasSearchRule() {
        return this.#deps.getRuleBook().rules.some(isSearchRule);
    }

    get hasSearchTerm() {
        return this.searchTerm !== "";
    }

    setSearchTerm(incomingSearchTerm: string) {
        const rule = this.#deps.getRuleBook().rules.find(isSearchRule);
        if (!rule) {
            throw new Error("Finder could not locate a searchRule.");
        }
        if (this.#deps.debouncer.has("_search") === false) {
            this.#deps.debouncer.register("_search", rule?.debounceMilliseconds);
        }

        this.#deps.debouncer.call("_search", () => {
            if (this.#deps.isDisabled()) {
                return;
            }
            const previousValue = this.searchTerm;
            this.searchTerm = incomingSearchTerm;
            this.#deps.touch({
                source: "search",
                event: "change.search.setSearchTerm",
                current: { searchTerm: incomingSearchTerm },
                initial: { searchTerm: previousValue },
                rule,
            });
        });
    }

    reset() {
        if (this.#deps.isDisabled()) {
            return;
        }
        const previousValue = this.searchTerm;
        this.searchTerm = "";
        this.#deps.touch({
            source: "search",
            event: "change.search.reset",
            current: { searchTerm: "" },
            initial: { searchTerm: previousValue },
            rule: this.rule,
        });
    }

    process(items: FItem[], context?: FContext) {
        if (this.searchTerm === "" || this.rule === undefined) {
            return items;
        }

        const transformedNeedle = transformStringForComparison(this.searchTerm);
        const matches = items.reduce<SearchScoreItem<FItem>[]>((acc, item) => {
            if (this.rule?.searchFn === undefined) {
                return acc;
            }

            // Retrieve this item's array of haystack strings to compare the search needle against
            const itemHaystackStringOrStrings = this.rule.searchFn(item, context);
            const itemHaystacks = Array.isArray(itemHaystackStringOrStrings)
                ? itemHaystackStringOrStrings.map(transformStringForComparison)
                : [transformStringForComparison(itemHaystackStringOrStrings)];

            // an item may have multiple matches if it has multiple haystack strings.
            const itemHaystackScores = itemHaystacks.reduce<ReturnType<typeof calculateSearchScore>[]>((scores, haystack) => {
                const indexes = calculateSequentialCharacterIndexes(haystack, transformedNeedle);
                if (indexes !== undefined) {
                    scores.push(calculateSearchScore(indexes, haystack));
                }
                return scores;
            }, []);

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
}

export { SearchMixin };
