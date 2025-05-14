import { orderBy } from "lodash";
import { getRuleFromIdentifier } from "../../utils/finder-utils";
import { FinderSortByRule, FinderSortDirection, FinderInjectedHandlers, FinderMeta } from "../../types";
import { isSortByRule } from "../../utils/type-enforcers";

class SortByMixin<FItem> {
    #sortBy?: FinderSortByRule;
    sortDirection?: FinderSortDirection;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialSortby: string | undefined, initialSortDirection: FinderSortDirection | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#handlers = handlers;
        this.#sortBy = getRuleFromIdentifier<FinderSortByRule>(initialSortby, this.rules);
        this.sortDirection = initialSortDirection;
    }

    get rules() {
        return this.#handlers.getRules().filter(isSortByRule);
    }

    get activeRule() {
        const defaultSortByRule = this.rules.at(0);
        return this.#sortBy ?? defaultSortByRule;
    }

    setSortDirection(incomingSortDirection: FinderSortDirection) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();
        this.sortDirection = incomingSortDirection;
        this.#handlers.onChange({ sortDirection: incomingSortDirection });
    }

    set(identifier: FinderSortByRule | string | undefined, incomingSortDirection?: FinderSortDirection) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();

        const rule = getRuleFromIdentifier<FinderSortByRule>(identifier, this.rules);
        this.#sortBy = rule;
        this.sortDirection = incomingSortDirection;
        this.#handlers.onChange({ sortBy: rule?.id, sortDirection: incomingSortDirection });
    }

    process(items: FItem[], meta?: FinderMeta) {
        const defaultSortByRule = this.rules.at(0);
        const activeSortByRule = this.#sortBy ?? defaultSortByRule;
        if (activeSortByRule === undefined) {
            return items;
        }

        return orderBy(items, activeSortByRule.sortFn, this.sortDirection ?? activeSortByRule.defaultDirection) as FItem[];
    }
}

export { SortByMixin };
