import { groupBy, orderBy, Many } from "lodash";
import { GroupByRule, FinderInjectedHandlers, FinderMeta, FinderResultGroup } from "../../../types";
import { getRuleFromIdentifier, isGroupByRule } from "../../../utils/finder-utils";
import { FINDER_EVENTS } from "../../finder-events";

class GroupByMixin<FItem> {
    #groupBy?: GroupByRule;

    requireGroup: boolean;
    groupIdSortDirection?: string;

    #handlers: FinderInjectedHandlers<FItem>;

    constructor(initialGroupBy: string | undefined, requireGroup: boolean, handlers: FinderInjectedHandlers<FItem>) {
        this.#handlers = handlers;
        this.#groupBy = getRuleFromIdentifier(initialGroupBy, this.rules);
        this.requireGroup = requireGroup;
    }

    get rules() {
        return this.#handlers.getRules().filter(isGroupByRule);
    }

    get activeRule() {
        const defaultRule = this.requireGroup ? this.rules.at(0) : undefined;
        return this.#groupBy ?? defaultRule;
    }

    set(identifier?: GroupByRule | string) {
        if (this.#handlers.isDisabled()) {
            return;
        }

        let rule: GroupByRule | undefined;
        const isBlankString = typeof identifier === "string" && identifier.trim() === "";
        if (isBlankString) {
            rule = undefined;
        }
        if (isBlankString === false && identifier !== undefined) {
            rule = getRuleFromIdentifier<GroupByRule>(identifier, this.rules);
        }

        // early exit if nothing changed
        if (this.#groupBy === rule) {
            return;
        }

        this.#groupBy = rule;
        this.groupIdSortDirection = undefined;

        this.#handlers.emit(FINDER_EVENTS.SET_GROUP_BY, { rule });
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { groupBy: rule?.id, groupIdSortDirection: undefined });
    }

    setGroupIdSortDirection(direction?: string) {
        this.groupIdSortDirection = direction;
        this.#handlers.emit(FINDER_EVENTS.SET_GROUP_BY, { rule: this.activeRule, direction });
        this.#handlers.emit(FINDER_EVENTS.CHANGE, { groupIdSortDirection: direction });
    }

    process(items: FItem[], meta?: FinderMeta) {
        if (this.activeRule === undefined) {
            return [];
        }

        const groupObject = groupBy(items, (item) => this.activeRule?.groupFn(item, meta));

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
            // HACK: Lodash type import isn't great
            return orderBy(groups, orderByCallbacks, orderSortDirection as Many<boolean | "asc" | "desc">) as FinderResultGroup<FItem>[];
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
