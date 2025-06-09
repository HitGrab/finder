import { GroupByRule } from "../../types";
import { getRuleFromIdentifier } from "../utils/rule-utils";
import { GroupByMixin } from "./group-by";

/**
 * Public surface for the Group By mixin
 */

function readonlyGroupByInterface<FItem>(mixin: GroupByMixin<FItem>) {
    return {
        activeRule: mixin.activeRule,
        requireGroup: mixin.requireGroup,
        rules: mixin.rules,
        groupIdSortDirection: mixin.groupIdSortDirection,
    };
}
function groupByInterface<FItem>(mixin: GroupByMixin<FItem>) {
    return {
        ...readonlyGroupByInterface(mixin),
        set: mixin.set.bind(mixin),
        toggle: (identifier: GroupByRule | string) => {
            const rule = getRuleFromIdentifier<GroupByRule>(identifier, mixin.rules);
            if (mixin.activeRule === rule) {
                mixin.set(undefined);
                return;
            }
            mixin.set(rule);
        },
        setGroupIdSortDirection: mixin.setGroupIdSortDirection.bind(mixin),
        reset: () => {
            mixin.setGroupIdSortDirection(undefined);
            mixin.set(undefined);
        },
    };
}

export { readonlyGroupByInterface, groupByInterface };
