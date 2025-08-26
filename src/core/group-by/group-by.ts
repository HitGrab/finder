import { GroupByRule, FinderResultGroup, SortDirection } from "../../types";
import { isGroupByRule } from "../utils/rule-utils";
import { MixinInjectedDependencies } from "../types/internal-types";
import { groupBy, orderBy } from "lodash";

type InitialValues = {
    initialGroupBy: string | undefined;
    requireGroup: boolean;
};
class GroupByMixin<FItem, FContext> {
    #groupBy;

    requireGroup;
    groupIdSortDirection?: SortDirection;

    #deps;

    constructor({ initialGroupBy, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem>) {
        this.#deps = deps;
        if (initialGroupBy) {
            this.#groupBy = this.#deps.getRuleBook().getRule<GroupByRule>(initialGroupBy);
        }
        this.requireGroup = requireGroup;
    }

    get rules() {
        return this.#deps.getRuleBook().rules.filter(isGroupByRule);
    }

    get activeRule() {
        const defaultRule = this.requireGroup ? this.rules.at(0) : undefined;
        return this.#groupBy ?? defaultRule;
    }

    set(identifier?: GroupByRule | string) {
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
            rule = this.#deps.getRuleBook().getRule<GroupByRule>(identifier);
        }

        // early exit if nothing changed
        if (this.#groupBy === rule) {
            return;
        }

        this.#groupBy = rule;
        this.groupIdSortDirection = undefined;

        this.#deps.touch({
            source: "groupBy",
            event: "change.groupBy.set",
            current: { rule },
            initial: { rule: previousRule },
            rule,
        });
    }

    setGroupIdSortDirection(direction?: SortDirection) {
        const previousValue = this.groupIdSortDirection;
        this.groupIdSortDirection = direction;

        this.#deps.touch({
            source: "groupBy",
            event: "change.groupBy.setGroupIdSortDirection",
            current: { groupIdSortDirection: direction },
            initial: { groupIdSortDirection: previousValue },
            rule: this.activeRule,
        });
    }

    toggle(identifier: GroupByRule | string) {
        const rule = this.#deps.getRuleBook().getRule<GroupByRule>(identifier);
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

    process(items: FItem[], context?: FContext) {
        if (this.activeRule === undefined) {
            return [];
        }

        const groupObject = groupBy(items, (item) => {
            const value = this.activeRule?.groupFn(item, context);
            if (value === undefined) {
                throw new Error("groupFn did not return a value.");
            }
            return value;
        });

        // transform the object into a sortable array
        const groups = Object.keys(groupObject).map((id) => {
            return {
                id: String(id),
                items: groupObject[id] ?? [],
            };
        });

        const hasStickyGroups = this.activeRule.sticky !== undefined;
        const orderByCallbacks = [];
        const orderSortDirection = [];
        if (hasStickyGroups) {
            orderByCallbacks.push(composeStickyGroupOrderCallback(this.activeRule));
            orderSortDirection.push("asc");
        }

        if (this.activeRule?.sortGroupIdFn) {
            orderByCallbacks.push(this.activeRule.sortGroupIdFn);
            orderSortDirection.push(this.groupIdSortDirection ?? "asc");
        }

        if (orderByCallbacks.length > 0) {
            const direction = (orderSortDirection ?? "desc") as SortDirection;
            return orderBy(groups, orderByCallbacks, direction) as FinderResultGroup<FItem>[];
        }

        return groups as FinderResultGroup<FItem>[];
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
            stickyHeaderGroupIds = [groupByRule?.sticky?.header];
        }
    }

    let stickyFooterGroupIds: string[] = [];
    if (groupByRule?.sticky?.footer !== undefined) {
        if (Array.isArray(groupByRule.sticky.footer)) {
            stickyFooterGroupIds = groupByRule.sticky.footer;
        }
        if (typeof groupByRule.sticky.footer === "string") {
            stickyFooterGroupIds = [groupByRule?.sticky?.footer];
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
