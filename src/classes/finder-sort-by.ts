import { FinderSortByRule, FinderSortDirection, FinderSnapshot, isSortByRule, FinderRule, FinderRuleFilterFunction, FinderInjectedHandlers } from "../types";
import { getRuleFromIdentifier } from "../utils/finder-utils";

class FinderSortBy<FItem> {
    #sortBy?: FinderSortByRule;
    #sortDirection?: FinderSortDirection;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialSortby: string | undefined, initialSortDirection: FinderSortDirection | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#handlers = handlers;
        this.#sortBy = getRuleFromIdentifier<FinderSortByRule>(initialSortby, this.rules);
        this.#sortDirection = initialSortDirection;
    }

    get rules() {
        return this.#handlers.getRules().filter(isSortByRule);
    }

    get value() {
        const defaultSortByRule = this.rules.at(0);
        return this.#sortBy?.id ?? defaultSortByRule?.id;
    }

    get sortDirection() {
        return this.#sortDirection;
    }

    set(identifier: FinderSortByRule | string, incomingSortDirection?: FinderSortDirection) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();

        const rule = getRuleFromIdentifier<FinderSortByRule>(identifier, this.rules);
        this.#sortBy = rule;
        this.#sortDirection = incomingSortDirection;
        this.#handlers.onChange({ sortBy: rule?.id, sortDirection: incomingSortDirection });
    }

    cycleDirection() {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();
        let incomingSortDirection: FinderSortDirection;

        if (this.#sortDirection === null) {
            incomingSortDirection = "desc";
        }
        if (this.#sortDirection === "desc") {
            incomingSortDirection = "asc";
        }
        if (this.#sortDirection === "asc") {
            incomingSortDirection = null;
        }

        this.#sortDirection = incomingSortDirection;
        this.#handlers.onChange({ sortDirection: incomingSortDirection });
    }

    reset() {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();
        this.#sortBy = undefined;
        this.#sortDirection = undefined;
        this.#handlers.onChange({ sortBy: undefined, sortDirection: undefined });
    }
}

export { FinderSortBy };
