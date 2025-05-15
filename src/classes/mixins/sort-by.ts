import { orderBy } from "lodash";
import { getRuleFromIdentifier } from "../../utils/finder-utils";
import { SortByRule, FinderSortDirection, FinderInjectedHandlers, FinderMeta } from "../../types";
import { isSortByRule } from "../../utils/type-enforcers";

class SortByMixin<FItem> {
    #sortBy?: SortByRule;
    sortDirection?: FinderSortDirection;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialSortby: string | undefined, initialSortDirection: FinderSortDirection | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#handlers = handlers;
        this.#sortBy = getRuleFromIdentifier<SortByRule>(initialSortby, this.rules);
        this.sortDirection = initialSortDirection;
    }

    get rules() {
        return this.#handlers.getRules().filter(isSortByRule);
    }

    get activeRule() {
        const defaultSortByRule = this.rules.at(0);
        return this.#sortBy ?? defaultSortByRule;
    }

    setSortDirection(incomingSortDirection: string | string[] | undefined) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.#handlers.onInit();
        // TODO: Should use a type guard here.
        this.sortDirection = incomingSortDirection as FinderSortDirection;
        this.#handlers.onChange({ sortDirection: incomingSortDirection as FinderSortDirection });
    }

    set(identifier: SortByRule | string | undefined, incomingSortDirection?: FinderSortDirection) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();

        const rule = getRuleFromIdentifier<SortByRule>(identifier, this.rules);
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
