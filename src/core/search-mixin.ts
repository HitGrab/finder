import { ERRORS, EVENT_SOURCE, EVENTS, WARNINGS } from "./core-constants";
import { FinderError } from "./finder-error";
import { sequentialCharacterSearchAlgorithm } from "./search/sequential-character-search-algorithm";
import { MixinInjectedDependencies, SearchRuleSuggestion, SerializedSearchMixin } from "./types/core-types";
import { isFilterRuleDefinitionWithHydratedOptions, isSearchRuleDefinition } from "./utils/rule-utils";
import { partition } from "lodash";

interface InitialValues {
    initialSearchTerm: string | undefined;
}

class SearchMixin<FItem> {
    searchTerm = "";

    #deps;

    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        if (initialSearchTerm && deps.getRuleBook().rules.find(isSearchRuleDefinition) === undefined) {
            console.warn(WARNINGS.INITIAL_SEARCH_RULE_NOT_FOUND, { initialSearchTerm });
        }
        this.searchTerm = initialSearchTerm ?? "";
        this.#deps = deps;
    }

    get rule() {
        return this.#deps.getRuleBook().rules.find(isSearchRuleDefinition);
    }

    get hasSearchRule() {
        return this.rule !== undefined;
    }

    get hasSearchTerm() {
        return this.searchTerm !== "";
    }

    get suggestedFilters() {
        const suggestions: SearchRuleSuggestion[] = [];
        const activeRule = this.rule;
        if (this.hasSearchTerm && activeRule?.suggestFiltersFrom) {
            const allFilterRules = this.#deps.getRuleBook().rules.filter(isFilterRuleDefinitionWithHydratedOptions);
            const ruleSourceAsArray = Array.isArray(activeRule.suggestFiltersFrom) ? activeRule.suggestFiltersFrom : [activeRule.suggestFiltersFrom];
            const ruleHaystack = ruleSourceAsArray.map((identifier) => {
                const rule = allFilterRules.find((row) => {
                    if (typeof identifier === "string") {
                        return row.id === identifier;
                    }
                    return identifier.id === row.id;
                });
                if (rule === undefined) {
                    throw new FinderError(ERRORS.RULE_NOT_FOUND, { rule });
                }
                return rule;
            });

            const [rulesWithOptions, rulesWithoutOptions] = partition(ruleHaystack, (rule) => rule.options !== undefined && rule.options.length > 0);
            rulesWithOptions.forEach((rule) => {
                if (rule.options && rule.options.length > 0) {
                    const optionMatches = sequentialCharacterSearchAlgorithm(
                        {
                            searchTerm: this.searchTerm,
                            rule: {
                                searchFn: (option) => option.label,
                            },
                        },
                        rule.options ?? [],
                    );
                    if (optionMatches.length > 0) {
                        suggestions.push({
                            rule,
                            optionMatches,
                        });
                    }
                }
            });

            if (rulesWithoutOptions.length > 0) {
                sequentialCharacterSearchAlgorithm(
                    {
                        searchTerm: this.searchTerm,
                        rule: {
                            searchFn: (rule) => rule.label,
                        },
                    },
                    rulesWithoutOptions,
                ).forEach((rule) => {
                    suggestions.push({ rule });
                });
            }
        }
        return suggestions;
    }

    setSearchTerm(value: string) {
        const rule = this.rule;
        if (!rule) {
            throw new FinderError(ERRORS.NO_SEARCH_RULE_SET);
        }

        if (typeof value !== "string") {
            throw new FinderError(ERRORS.INVALID_SEARCH_TERM_TYPE);
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
        return this.#deps.testItems({ search: { searchTerm, rule: this.rule } }, isAdditive);
    }

    get api() {
        return {
            rule: this.rule,
            searchTerm: this.searchTerm,
            suggestedFilters: this.suggestedFilters,
            hasSearchTerm: this.hasSearchTerm,
            hasSearchRule: this.hasSearchRule,
            setSearchTerm: this.setSearchTerm.bind(this),
            reset: this.reset.bind(this),
            test: this.test.bind(this),
        };
    }

    static process<FItem>(options: SerializedSearchMixin, items: FItem[], context: unknown) {
        if (options.rule === undefined) {
            throw new FinderError(ERRORS.NO_SEARCH_RULE_SET);
        }
        if (options.searchTerm === "") {
            return items;
        }

        return sequentialCharacterSearchAlgorithm(options, items, context);
    }
}

export { SearchMixin };
