import { isGroupByRule } from "./utils/rule-utils";
import { groupBy, orderBy } from "lodash";
import { GroupByRule } from "./types/rule-types";
import { FinderResultGroup, MixinInjectedDependencies, SerializedGroupByMixin, SortDirection } from "./types/core-types";
import { ERRORS, EVENT_SOURCE, EVENTS } from "./core-constants";
import { FinderError } from "./errors/finder-error";

interface InitialValues {
    initialGroupBy: string | undefined;
    requireGroup: boolean;
}

class GroupByMixin<FItem, FContext> {
    #groupBy;

    requireGroup;

    groupIdSortDirection?: SortDirection;

    #deps;

    constructor({ initialGroupBy, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem, FContext>) {
        this.#deps = deps;
        if (initialGroupBy) {
            this.#groupBy = this.getRule(initialGroupBy);
        }
        this.requireGroup = requireGroup;
    }

    getRule(identifier: string | GroupByRule) {
        const rule = this.#deps.getRuleBook().getRule(identifier);
        if (isGroupByRule(rule) === false) {
            throw new FinderError(ERRORS.WRONG_RULE_TYPE_FOR_MIXIN, { rule });
        }
        return rule;
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isGroupByRule);
    }

    get activeRule() {
        const defaultRule = this.requireGroup ? this.rules.at(0) : undefined;
        return this.#groupBy ?? defaultRule;
    }

    get hasGroupByRule() {
        return this.activeRule !== undefined;
    }

    set(identifier?: string | GroupByRule) {
        if (this.#deps.isDisabled()) {
            return;
        }

        const previousRule = this.#groupBy;

        let rule: GroupByRule | undefined;
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
        this.groupIdSortDirection = undefined;

        this.#deps.touch({
            source: EVENT_SOURCE.GROUP_BY,
            event: EVENTS.SET_GROUP_BY,
            current: rule?.id,
            initial: previousRule?.id,
            rule,
        });
    }

    setGroupIdSortDirection(direction?: SortDirection) {
        const previousValue = this.groupIdSortDirection;
        this.groupIdSortDirection = direction;

        this.#deps.touch({
            source: EVENT_SOURCE.GROUP_BY,
            event: EVENTS.SET_GROUP_SORT_BY_DIRECTION,
            current: { groupIdSortDirection: direction },
            initial: { groupIdSortDirection: previousValue },
            rule: this.activeRule,
        });
    }

    toggle(identifier: GroupByRule | string) {
        const rule = this.getRule(identifier);
        if (this.activeRule === rule) {
            this.set(undefined);
            return;
        }
        this.set(rule);
    }

    reset() {
        this.setGroupIdSortDirection(undefined);
        this.set(undefined);
    }

    serialize(): SerializedGroupByMixin {
        return {
            rule: this.activeRule,
            sortDirection: this.groupIdSortDirection,
        };
    }

    static process<FItem, FContext>(options: SerializedGroupByMixin, items: FItem[], context?: FContext): FinderResultGroup<FItem>[] {
        const groupObject = groupBy(items, (item) => options.rule?.groupFn(item, context));

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
            orderByCallbacks.push(options.rule.sortGroupFn);
            orderSortDirection.push(options.sortDirection ?? "asc");
        }

        if (orderByCallbacks.length > 0) {
            const direction = (orderSortDirection ?? "desc") as SortDirection;
            return orderBy(groups, orderByCallbacks, direction);
        }

        return groups;
    }
}

/**
 * Creates a sorting method for groupBy rule with 'sticky' header/footer groups.
 */
function composeStickyGroupOrderCallback<FItem>(groupByRule: GroupByRule<FItem>) {
    let stickyHeaderGroupIds: string[] = [];
    if (groupByRule?.sticky?.header !== undefined) {
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
