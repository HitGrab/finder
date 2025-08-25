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
        return this.#deps.getRules().find(isSearchRule);
    }

    get hasSearchRule() {
        return this.#deps.getRules().some(isSearchRule);
    }

    get hasSearchTerm() {
        return this.searchTerm !== "";
    }

    setSearchTerm(incomingSearchTerm: string) {
        const rule = this.#deps.getRules().find(isSearchRule);
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
        });
    }

    process(items: FItem[], context?: FContext) {
        if (this.searchTerm === "" || this.rule === undefined) {
            return items;
        }

        if (this.rule.searchFn) {
            return items.filter((item) => {
                if (this.rule?.searchFn === undefined) {
                    return false;
                }
                return this.rule.searchFn(item, this.searchTerm, context);
            });
        }

        const transformedNeedle = transformStringForComparison(this.searchTerm);
        const matches = items.reduce<SearchScoreItem<FItem>[]>((acc, item) => {
            if (this.rule?.haystackFn === undefined) {
                return acc;
            }

            // Retrieve this item's array of haystack strings to compare the search needle against
            const itemHaystackStringOrStrings = this.rule.haystackFn(item, context);
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

        // sort all results by their search score.
        const sortedMatches = orderBy(
            matches,
            [(match) => match.score.percentOfHaystackMatched, (match) => match.score.longestSequentialSequence],
            ["desc", "asc"],
        );

        return sortedMatches.map((match) => match.item);
    }
}

export { SearchMixin };
