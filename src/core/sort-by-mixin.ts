import { orderBy } from "lodash";
import { SortByRuleDefinition } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedSortByMixin, SortDirection } from "./types/core-types";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./finder-error";
import { isSortByRuleDefinition } from "./utils/rule-utils";

const SORT_CYCLE_ORDER: (SortDirection | undefined)[] = [undefined, "desc", "asc"] as const;

interface InitialValues {
    initialSortBy: string | undefined;
    initialSortDirection?: SortDirection;
}

class SortByMixin<FItem> {
    #sortBy;

    #sortDirection?: SortDirection;

    #deps;

    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.#deps = deps;
        if (initialSortBy) {
            this.#sortBy = this.getRule(initialSortBy);
        }
        this.#sortDirection = initialSortDirection;
    }

    getRule(identifier: string | SortByRuleDefinition) {
        const rule = this.#deps.getRuleBook().getRule(identifier);
        if (isSortByRuleDefinition(rule) === false) {
            throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
        }
        return rule;
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isSortByRuleDefinition);
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
            source: EVENT_SOURCE.SORT_BY,
            event: EVENTS.SET_SORT_BY_DIRECTION,
            current: { sortDirection: incomingSortDirection },
            initial: { sortDirection: previousValue },
            rule: this.activeRule,
        });
    }

    cycleSortDirection() {
        const initialIndex = SORT_CYCLE_ORDER.findIndex((direction) => direction === this.#sortDirection);
        if (initialIndex !== -1) {
            const currentIndex = initialIndex + (1 % (SORT_CYCLE_ORDER.length - 1));
            this.setSortDirection(SORT_CYCLE_ORDER[currentIndex]);
        }
    }

    toggleSortDirection() {
        const initialDirection = this.#sortDirection ?? this.activeRule?.defaultSortDirection;
        if (initialDirection === "desc") {
            this.setSortDirection("asc");
            return;
        }
        this.setSortDirection("desc");
    }

    set(identifier?: string | SortByRuleDefinition, incomingSortDirection?: SortDirection) {
        if (this.#deps.isDisabled() || !this.activeRule) {
            return;
        }

        const previousSortDirection = this.#sortDirection;
        const previousRule = this.#sortBy;
        const rule = identifier ? this.getRule(identifier) : undefined;
        this.#sortBy = rule;
        this.#sortDirection = incomingSortDirection;
        this.#deps.touch({
            source: EVENT_SOURCE.SORT_BY,
            event: EVENTS.SET_SORT_BY,
            current: { rule: rule?.id, sortDirection: incomingSortDirection },
            initial: { rule: previousRule?.id, sortDirection: previousSortDirection },
            rule: this.activeRule,
        });
    }

    reset() {
        this.set(undefined, undefined);
    }

    serialize(): SerializedSortByMixin {
        return {
            rule: this.activeRule,
            sortDirection: this.sortDirection,
        };
    }

    static process<FItem>(options: SerializedSortByMixin, items: FItem[], context: unknown) {
        if (options.rule === undefined) {
            return items;
        }

        return orderBy(
            items,
            (item) => {
                if (typeof options.rule?.sortFn === "function") {
                    return options.rule.sortFn(item, context);
                }
                return Number.NEGATIVE_INFINITY;
            },
            options.sortDirection,
        );
    }
}

export { SortByMixin };
