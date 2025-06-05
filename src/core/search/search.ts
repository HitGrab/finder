import { FinderMeta } from "../../types";
import { FINDER_EVENTS } from "../events/event-constants";
import { MixinInjectedDependencies } from "../types/core-types";
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
        if (this.#deps.debouncer.has("search") === false) {
            this.#deps.debouncer.register("search", rule?.debounceDelay);
        }

        this.#deps.debouncer.call("search", () => {
            if (this.#deps.isDisabled()) {
                return;
            }
            this.#searchTerm = incomingSearchTerm;
            this.#deps.eventEmitter.emit(FINDER_EVENTS.SET_SEARCH_TERM, { rule, searchTerm: this.#searchTerm });
            this.#deps.touch({ searchTerm: incomingSearchTerm });
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
