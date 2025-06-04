import { Many, orderBy } from "lodash";
import { SortByRule, FinderInjectedHandlers } from "../../../types";
import { getRuleFromIdentifier, isSortByRule } from "../../../utils/finder-utils";
import { FINDER_EVENTS } from "../../finder-events";

class SortByMixin<FItem> {
    #sortBy?: SortByRule;
    sortDirection?: string;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialSortBy: string | undefined, initialSortDirection: "asc" | "desc" | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#handlers = handlers;
        this.#sortBy = getRuleFromIdentifier<SortByRule>(initialSortBy, this.rules);
        this.sortDirection = initialSortDirection;
    }

    get rules() {
        return this.#handlers.getRules().filter(isSortByRule);
    }

    get activeRule() {
        const defaultSortByRule = this.rules.at(0);
        return this.#sortBy ?? defaultSortByRule;
    }

    setSortDirection(incomingSortDirection?: string) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        // TODO: Should use a type guard here.
        this.sortDirection = incomingSortDirection;
        this.#handlers.emit(FINDER_EVENTS.SET_SORT_BY, [this.activeRule, incomingSortDirection]);
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { sortDirection: incomingSortDirection });
    }

    set(identifier?: string | SortByRule, incomingSortDirection?: string) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        const rule = getRuleFromIdentifier<SortByRule>(identifier, this.rules);
        this.#sortBy = rule;
        this.sortDirection = incomingSortDirection;
        this.#handlers.emit(FINDER_EVENTS.SET_SORT_BY, [rule, incomingSortDirection]);
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { sortBy: rule?.id, sortDirection: incomingSortDirection });
    }

    process(items: FItem[]) {
        const defaultSortByRule = this.rules.at(0);
        const activeSortByRule = this.#sortBy ?? defaultSortByRule;
        if (activeSortByRule === undefined) {
            return items;
        }

        // HACK: Lodash type import isn't great
        const direction = (this.sortDirection ?? activeSortByRule.defaultSortDirection) as Many<boolean | "asc" | "desc">;
        return orderBy(items, activeSortByRule.sortFn, direction) as FItem[];
    }
}

export { SortByMixin };
