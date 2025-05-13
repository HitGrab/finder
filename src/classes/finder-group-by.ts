import { FinderGroupByRule, FinderInjectedHandlers, isGroupByRule } from "../types";
import { getRuleFromIdentifier } from "../utils/finder-utils";

class FinderGroupBy<FItem> {
    #groupBy?: FinderGroupByRule;
    #requireGroup: boolean;
    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialGroupBy: string | undefined, requireGroup: boolean, handlers: FinderInjectedHandlers<FItem>) {
        this.#handlers = handlers;
        this.#groupBy = getRuleFromIdentifier(initialGroupBy, this.rules);
        this.#requireGroup = requireGroup;
    }

    get value() {
        const defaultRule = this.rules.at(0);
        return this.#groupBy?.id ?? defaultRule?.id;
    }

    #wrappedSetGroupBy(rule?: FinderGroupByRule) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        this.#handlers.onInit();

        // early exit if nothing changed
        if (this.#groupBy === rule?.id) {
            return;
        }

        this.#groupBy = rule;
        this.#handlers.onChange({ groupBy: rule?.id });
    }

    get rules() {
        return this.#handlers.getRules().filter(isGroupByRule);
    }

    get requireGroup() {
        return this.#requireGroup;
    }

    set(identifier?: FinderGroupByRule | string) {
        if (identifier) {
            const rule = getRuleFromIdentifier<FinderGroupByRule>(identifier, this.rules);
            this.#wrappedSetGroupBy(rule);
        }
        this.#wrappedSetGroupBy(undefined);
    }

    toggle(identifier: FinderGroupByRule | string) {
        const rule = getRuleFromIdentifier<FinderGroupByRule>(identifier, this.rules);
        if (this.#groupBy === rule?.id) {
            this.#wrappedSetGroupBy(undefined);
            return;
        }
        this.#wrappedSetGroupBy(rule);
    }

    reset() {
        return this.#wrappedSetGroupBy(undefined);
    }
}

export { FinderGroupBy };
