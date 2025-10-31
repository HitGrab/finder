import { isSearchRule } from "./utils/rule-utils";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./finder-error";
import { MixinInjectedDependencies, SerializedSearchMixin } from "./types/core-types";
import { defaultSearchAndSortAlgorithm } from "./search/default-search-and-sort-algorithm";

interface InitialValues {
    initialSearchTerm: string | undefined;
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

        return defaultSearchAndSortAlgorithm(options, items, context);
    }
}

export { SearchMixin };
