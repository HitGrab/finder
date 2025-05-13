import { FinderInjectedHandlers, isSearchRule } from "../types";
import { DebounceCallbackRegistry } from "../utils/debounce-callback-registry";

class FinderSearch<FItem> {
    #searchTerm: string;

    #handlers: FinderInjectedHandlers<FItem>;

    #debouncer = new DebounceCallbackRegistry();

    constructor(initialSearchTerm: string | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#searchTerm = initialSearchTerm || "";
        this.#handlers = handlers;
    }

    get value() {
        return this.#searchTerm;
    }

    get hasSearchRule() {
        return this.#handlers.getRules().some(isSearchRule);
    }

    set(incomingSearchTerm: string) {
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
            this.#handlers.onInit();
            this.#searchTerm = incomingSearchTerm;
            this.#handlers.onChange({ searchTerm: incomingSearchTerm });
        });
    }
}

export { FinderSearch };
