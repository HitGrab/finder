/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { orderBy } from "lodash";
import { GroupByRuleDefinition } from "./types/rule-types";
import { FinderResultGroup, MixinInjectedDependencies, SerializedGroupByMixin, SortDirection } from "./types/core-types";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./finder-error";
import { isGroupByRuleDefinition } from "./utils/rule-utils";

interface InitialValues {
    initialGroupBy: string | undefined;
    initialGroupBySortDirection?: SortDirection;
    requireGroup: boolean;
}

type GroupByRuleIdentifier = string | GroupByRuleDefinition;

class GroupByMixin<FItem> {
    #groupBy;

    requireGroup;

    #groupBySortDirection?: SortDirection;

    #deps;

    constructor({ initialGroupBy, initialGroupBySortDirection, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.#deps = deps;
        if (initialGroupBy) {
            this.#groupBy = this.getRule(initialGroupBy);
        }
        this.#groupBySortDirection = initialGroupBySortDirection;
        this.requireGroup = requireGroup;
    }

    getRule(identifier: GroupByRuleIdentifier) {
        const rule = this.#deps.getRuleBook().getRule(identifier);
        if (isGroupByRuleDefinition(rule) === false) {
            throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
        }
        return rule;
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isGroupByRuleDefinition);
    }

    get activeRule() {
        const defaultRule = this.requireGroup ? this.rules.at(0) : undefined;
        return this.#groupBy ?? defaultRule;
    }

    get hasGroupByRule() {
        return this.activeRule !== undefined;
    }

    get groupBySortDirection() {
        return this.#groupBySortDirection ?? this.activeRule?.defaultGroupSortDirection;
    }

    set(identifier?: GroupByRuleIdentifier) {
        if (this.#deps.isDisabled()) {
            return;
        }

        const previousRule = this.#groupBy;

        let rule: GroupByRuleDefinition | undefined;
        const isBlankString = typeof identifier === "string" && identifier.trim() === "";
        if (isBlankString) {
            rule = undefined;
        }
        if (isBlankString === false && identifier !== undefined) {
            rule = this.getRule(identifier);
        }

        // early exit if nothing changed
        if (this.#groupBy === rule) {
            return;
        }

        this.#groupBy = rule;
        this.#groupBySortDirection = undefined;

        this.#deps.touch({
            source: EVENT_SOURCE.GROUP_BY,
            event: EVENTS.SET_GROUP_BY,
            current: rule?.id,
            initial: previousRule?.id,
            rule,
        });
    }

    setGroupSortDirection(direction?: SortDirection) {
        const previousValue = this.#groupBySortDirection;
        this.#groupBySortDirection = direction;

        this.#deps.touch({
            source: EVENT_SOURCE.GROUP_BY,
            event: EVENTS.SET_GROUP_SORT_BY_DIRECTION,
            current: direction,
            initial: previousValue,
            rule: this.activeRule,
        });
    }

    toggle(identifier: GroupByRuleIdentifier) {
        const rule = this.getRule(identifier);
        if (this.activeRule === rule) {
            this.set(undefined);
            return;
        }
        this.set(rule);
    }

    reset() {
        this.setGroupSortDirection(undefined);
        this.set(undefined);
    }

    serialize(): SerializedGroupByMixin {
        return {
            rule: this.activeRule,
            groupBySortDirection: this.#groupBySortDirection,
        };
    }

    static process<FItem>(options: SerializedGroupByMixin, items: FItem[], context: unknown): FinderResultGroup<FItem>[] {
        // similar to lodash's groupBy, except that it supports multiple keys.
        // If multiple keys are provided, Items may appear in multiple groups.
        const groupObject = items.reduce<Record<string | number, FItem[]>>((acc, item) => {
            const keys = options.rule?.groupFn(item, context);
            if (!keys) {
                return acc;
            }
            const keysAsArray = Array.isArray(keys) ? keys : [keys];
            keysAsArray.forEach((key) => {
                acc[key] ??= [];
                acc[key].push(item);
            });

            return acc;
        }, {});

        // transform the object into a sortable array
        const groups = Object.entries(groupObject).map(([id, items]) => ({
            id,
            items,
        }));

        const hasStickyGroups = options.rule?.sticky !== undefined;
        const orderByCallbacks = [];
        const orderSortDirection = [];
        if (hasStickyGroups && options.rule) {
            orderByCallbacks.push(composeStickyGroupOrderCallback(options.rule));
            orderSortDirection.push("asc");
        }

        if (options.rule?.sortGroupFn) {
            orderByCallbacks.push((group: FinderResultGroup<FItem>) => {
                if (options.rule?.sortGroupFn === undefined) {
                    return 0;
                }
                // ensure context is provided to the sort method
                return options.rule.sortGroupFn(group, context);
            });
            orderSortDirection.push(options.groupBySortDirection ?? "asc");
        }

        if (orderByCallbacks.length > 0) {
            const direction = orderSortDirection as SortDirection;
            return orderBy(groups, orderByCallbacks, direction);
        }
        return groups;
    }
}

/**
 * Creates a sorting method for groupBy rule with 'sticky' header/footer groups.
 */
function composeStickyGroupOrderCallback<FItem>(groupByRule: GroupByRuleDefinition<FItem>) {
    let stickyHeaderGroupIds: string[] = [];
    if (groupByRule.sticky?.header !== undefined) {
        if (Array.isArray(groupByRule.sticky.header)) {
            stickyHeaderGroupIds = groupByRule.sticky.header;
        }
        if (typeof groupByRule.sticky.header === "string") {
            stickyHeaderGroupIds = [groupByRule.sticky.header];
        }
    }

    let stickyFooterGroupIds: string[] = [];
    if (groupByRule.sticky?.footer !== undefined) {
        if (Array.isArray(groupByRule.sticky.footer)) {
            stickyFooterGroupIds = groupByRule.sticky.footer;
        }
        if (typeof groupByRule.sticky.footer === "string") {
            stickyFooterGroupIds = [groupByRule.sticky.footer];
        }
    }

    return (group: FinderResultGroup<FItem>) => {
        if (stickyHeaderGroupIds.includes(group.id)) {
            const index = stickyHeaderGroupIds.findIndex((groupId) => group.id === groupId);
            const sortOrder = (stickyHeaderGroupIds.length - index) * -1;
            return sortOrder;
        }
        if (stickyFooterGroupIds.includes(group.id)) {
            const index = stickyFooterGroupIds.findIndex((groupId) => group.id === groupId);
            return 1 + index;
        }
        return 0;
    };
}

export { GroupByMixin };
