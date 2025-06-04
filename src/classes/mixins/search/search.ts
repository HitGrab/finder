import { FinderInjectedHandlers, FinderMeta } from "../../../types";
import { DebounceCallbackRegistry } from "../../../utils/debounce-callback-registry";
import { isSearchRule } from "../../../utils/finder-utils";
import { FINDER_EVENTS } from "../../finder-events";

class SearchMixin<FItem> {
    #searchTerm: string;

    #handlers: FinderInjectedHandlers<FItem>;

    #debouncer = new DebounceCallbackRegistry();

    constructor(initialSearchTerm: string | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#searchTerm = initialSearchTerm || "";
        this.#handlers = handlers;
    }

    get searchTerm() {
        return this.#searchTerm;
    }

    get rule() {
        return this.#handlers.getRules().find(isSearchRule);
    }

    get hasSearchRule() {
        return this.#handlers.getRules().some(isSearchRule);
    }

    setSearchTerm(incomingSearchTerm: string) {
        const rule = this.#handlers.getRules().find(isSearchRule);
        if (!rule) {
            throw new Error("Finder could not locate a searchRule.");
        }
        if (this.#debouncer.has("search") === false) {
            this.#debouncer.register("search", rule?.debounceDelay);
        }

        this.#debouncer.call("search", () => {
            if (this.#handlers.isDisabled()) {
                return;
            }
            this.#searchTerm = incomingSearchTerm;
            this.#handlers.emit(FINDER_EVENTS.SET_SEARCH_TERM, { rule, searchTerm: this.#searchTerm });
            this.#handlers.emit(FINDER_EVENTS.CHANGE, { searchTerm: incomingSearchTerm });
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
