import { orderBy } from "lodash";
import { isSearchRule } from "./utils/rule-utils";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./finder-error";
import { calculateSearchScore } from "./search/search-score";
import { transformStringForComparison } from "./search/search-string-transform";
import { SearchScore, MixinInjectedDependencies, SerializedSearchMixin } from "./types/core-types";
import { calculateCharacterMatchIndexes } from "./search/calculate-character-match-indexes";

interface InitialValues {
    initialSearchTerm: string | undefined;
}
interface SearchScoreItem<FItem> {
    item: FItem;
    score: SearchScore;
}

class SearchMixin<FItem> {
    searchTerm: string;

    #deps;

    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.searchTerm = initialSearchTerm ?? "";
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

    setSearchTerm(value: string) {
        const rule = this.rule;
        if (!rule) {
            throw new FinderError(ERRORS.NO_SEARCH_RULE_SET);
        }

        if (this.#deps.isDisabled()) {
            return;
        }

        const previousValue = this.searchTerm;
        this.searchTerm = value;

        // early exit if nothing changed
        if (previousValue === value) {
            return;
        }

        this.#deps.debouncer(rule, () => {
            this.#deps.touch({
                source: EVENT_SOURCE.SEARCH,
                event: EVENTS.SET_SEARCH_TERM,
                current: value,
                initial: previousValue,
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
            source: EVENT_SOURCE.SEARCH,
            event: EVENTS.RESET_SEARCH_TERM,
            current: "",
            initial: previousValue,
            rule: this.rule,
        });
    }

    serialize(): SerializedSearchMixin {
        return {
            searchTerm: this.searchTerm,
            rule: this.rule,
        };
    }

    test(searchTerm: string, isAdditive = false) {
        return this.#deps.test({ search: { searchTerm, rule: this.rule } }, isAdditive);
    }

    static process<FItem>(options: SerializedSearchMixin, items: FItem[], context: unknown) {
        if (options.rule === undefined || options.searchTerm === "") {
            return items;
        }

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
}

export { SearchMixin };
