import { SortByRule, SortDirection } from "../../types";
import { isSortByRule } from "../utils/rule-utils";
import { MixinInjectedDependencies } from "../types/internal-types";
import { orderBy } from "lodash";

type InitialValues = {
    initialSortBy: string | undefined;
    initialSortDirection?: SortDirection;
};
class SortByMixin<FItem> {
    #sortBy;

    #sortDirection?: SortDirection;

    #deps;

    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.#deps = deps;
        if (initialSortBy) {
            this.#sortBy = this.#deps.getRuleBook().getRule<SortByRule>(initialSortBy);
        }
        this.#sortDirection = initialSortDirection;
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isSortByRule);
    }

    get activeRule() {
        const defaultSortByRule = this.rules.at(0);
        return this.#sortBy ?? defaultSortByRule;
    }

    get sortDirection() {
        return this.#sortDirection ?? this.activeRule?.defaultSortDirection ?? "asc";
    }

    get userHasSetSortDirection() {
        return this.#sortDirection !== undefined;
    }

    setSortDirection(incomingSortDirection?: SortDirection) {
        if (this.#deps.isDisabled() || !this.activeRule) {
            return;
        }
        const previousValue = this.#sortDirection;
        this.#sortDirection = incomingSortDirection;
        this.#deps.touch({
            source: "sortBy",
            event: "change.sortBy.setSortDirection",
            current: { sortDirection: incomingSortDirection },
            initial: { sortDirection: previousValue },
            rule: this.activeRule,
        });
    }

    set(identifier?: string | SortByRule, incomingSortDirection?: SortDirection) {
        if (this.#deps.isDisabled() || !this.activeRule) {
            return;
        }

        const previousSortDirection = this.#sortDirection;
        const previousRule = this.#sortBy;
        const rule = identifier ? this.#deps.getRuleBook().getRule<SortByRule>(identifier) : undefined;
        this.#sortBy = rule;
        this.#sortDirection = incomingSortDirection;
        this.#deps.touch({
            source: "sortBy",
            event: "change.sortBy.set",
            current: { rule, sortDirection: incomingSortDirection },
            initial: { rule: previousRule, sortDirection: previousSortDirection },
            rule: this.activeRule,
        });
    }

    process(items: FItem[]) {
        const defaultSortByRule = this.rules.at(0);
        const activeSortByRule = this.#sortBy ?? defaultSortByRule;
        if (activeSortByRule === undefined) {
            return items;
        }

        const direction = this.#sortDirection ?? activeSortByRule.defaultSortDirection;
        return orderBy(
            items,
            (item) => {
                if (typeof activeSortByRule.sortFn === "function") {
                    return activeSortByRule.sortFn(item, this.#deps.getContext());
                }
                return Number.NEGATIVE_INFINITY;
            },
            direction,
        ) as FItem[];
    }
}

export { SortByMixin };
