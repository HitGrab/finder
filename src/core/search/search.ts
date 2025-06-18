import { FinderMeta } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
import { isSearchRule } from "../utils/rule-utils";

type InitialValues = { initialSearchTerm: string | undefined };
class SearchMixin<FItem> {
    #searchTerm: string;

    #deps;

    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.#searchTerm = initialSearchTerm || "";
        this.#deps = deps;
    }

    get searchTerm() {
        return this.#searchTerm;
    }

    get rule() {
        return this.#deps.getRules().find(isSearchRule);
    }

    get hasSearchRule() {
        return this.#deps.getRules().some(isSearchRule);
    }

    setSearchTerm(incomingSearchTerm: string) {
        const rule = this.#deps.getRules().find(isSearchRule);
        if (!rule) {
            throw new Error("Finder could not locate a searchRule.");
        }
        if (this.#deps.debouncer.has("_search") === false) {
            this.#deps.debouncer.register("_search", rule?.debounceDelay);
        }

        this.#deps.debouncer.call("_search", () => {
            if (this.#deps.isDisabled()) {
                return;
            }
            const previousValue = this.#searchTerm;
            this.#searchTerm = incomingSearchTerm;
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
        const previousValue = this.#searchTerm;
        this.#searchTerm = "";
        this.#deps.touch({
            source: "search",
            event: "change.search.reset",
            current: { searchTerm: "" },
            initial: { searchTerm: previousValue },
        });
    }

    process(items: FItem[], meta?: FinderMeta) {
        if (this.#searchTerm === "" || this.rule === undefined) {
            return items;
        }

        return items.filter((item) => this.rule?.searchFn(item, this.#searchTerm, meta));
    }
}

export { SearchMixin };
