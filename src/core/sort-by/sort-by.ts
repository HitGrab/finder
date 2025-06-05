import { Many, orderBy } from "lodash";
import { SortByRule } from "../../types";
import { FINDER_EVENTS } from "../events/event-constants";
import { getRuleFromIdentifier, isSortByRule } from "../utils/rule-utils";
import { MixinInjectedDependencies } from "../types/core-types";

type InitialValues = {
    initialSortBy: string | undefined;
    initialSortDirection: "asc" | "desc" | undefined;
};
class SortByMixin<FItem> {
    #sortBy;

    sortDirection?: string;

    #deps;

    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.#deps = deps;
        this.#sortBy = getRuleFromIdentifier(initialSortBy, this.rules);
        this.sortDirection = initialSortDirection;
    }

    get rules() {
        return this.#deps.getRules().filter(isSortByRule);
    }

    get activeRule() {
        const defaultSortByRule = this.rules.at(0);
        return this.#sortBy ?? defaultSortByRule;
    }

    setSortDirection(incomingSortDirection?: string) {
        if (this.#deps.isDisabled() || !this.activeRule) {
            return;
        }
        // TODO: Should use a type guard here.
        this.sortDirection = incomingSortDirection;
        this.#deps.eventEmitter.emit(FINDER_EVENTS.SET_SORT_BY, { rule: this.activeRule, sortDirection: incomingSortDirection });
        this.#deps.touch({ sortDirection: incomingSortDirection });
    }

    set(identifier?: string | SortByRule, incomingSortDirection?: string) {
        if (this.#deps.isDisabled() || !this.activeRule) {
            return;
        }

        const rule = getRuleFromIdentifier<SortByRule>(identifier, this.rules);
        this.#sortBy = rule;
        this.sortDirection = incomingSortDirection;
        this.#deps.eventEmitter.emit(FINDER_EVENTS.SET_SORT_BY, { rule, sortDirection: incomingSortDirection });
        this.#deps.touch({ sortBy: rule?.id, sortDirection: incomingSortDirection });
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
