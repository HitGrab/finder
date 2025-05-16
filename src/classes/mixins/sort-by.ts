import { Many, orderBy } from "lodash";
import { getRuleFromIdentifier } from "../../utils/finder-utils";
import { SortByRule, FinderInjectedHandlers, FinderMeta, HydratedSortByRule } from "../../types";
import { isHydratedSortByRule } from "../../utils/type-enforcers";

class SortByMixin<FItem> {
    #sortBy?: HydratedSortByRule;
    sortDirection?: string;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialSortby: string | undefined, initialSortDirection: "asc" | "desc" | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#handlers = handlers;
        this.#sortBy = getRuleFromIdentifier<HydratedSortByRule>(initialSortby, this.rules);
        this.sortDirection = initialSortDirection;
    }

    get rules() {
        return this.#handlers.getHydratedRules().filter(isHydratedSortByRule);
    }

    get activeRule() {
        const defaultSortByRule = this.rules.at(0);
        return this.#sortBy ?? defaultSortByRule;
    }

    setSortDirection(incomingSortDirection?: string) {
        if (this.#handlers.isDisabled()) {
            return;
        }
        this.#handlers.onInit();
        // TODO: Should use a type guard here.
        this.sortDirection = incomingSortDirection;
        this.#handlers.onChange({ sortDirection: incomingSortDirection });
    }

    set(identifier?: string | SortByRule | HydratedSortByRule, incomingSortDirection?: string) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();

        const rule = getRuleFromIdentifier<HydratedSortByRule>(identifier, this.rules);
        this.#sortBy = rule;
        this.sortDirection = incomingSortDirection;
        this.#handlers.onChange({ sortBy: rule?.id, sortDirection: incomingSortDirection });
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
