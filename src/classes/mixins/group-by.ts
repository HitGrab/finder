import { groupBy, orderBy, Many } from "lodash";
import { FinderGroupByRule, FinderInjectedHandlers, FinderResultGroup, FinderMeta } from "../../types";
import { getRuleFromIdentifier } from "../../utils/finder-utils";
import { isGroupByRule } from "../../utils/type-enforcers";

class GroupByMixin<FItem> {
    #groupBy?: FinderGroupByRule;

    requireGroup: boolean;

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

    set(rule?: FinderGroupByRule) {
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

    process(items: FItem[], meta?: FinderMeta) {
        if (this.activeRule === undefined) {
            return [];
        }

        const groupObject = groupBy(items, (item) => this.activeRule?.groupFn(item, meta));

        // transform the object into a sortable array
        const groups = Object.keys(groupObject).map((id) => {
            return {
                id: String(id),
                items: groupObject[id],
            };
        });

        const hasStickyGroups = this.activeRule.sticky !== undefined;
        const orderByCallbacks = [];
        const orderDirection = [];
        if (hasStickyGroups) {
            orderByCallbacks.push(composeStickyGroupOrderCallback(this.activeRule));
            orderDirection.push("asc");
        }
        if (this.#groupBy?.sortGroupIdFn) {
            orderByCallbacks.push(this.#groupBy.sortGroupIdFn);
            orderDirection.push(this.#groupBy.direction ?? "asc");
        }

        // TODO: Figure out group sorting
        // HACK: Lodash type import is bad
        return orderBy(groups, orderByCallbacks, orderDirection as Many<boolean | "asc" | "desc">) as FinderResultGroup<FItem>[];
    }
}

/**
 * Creates a sorting method for groupBy rule with 'sticky' header/footer groups.
 */
function composeStickyGroupOrderCallback<FItem>(groupByRule: FinderGroupByRule<FItem>) {
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
