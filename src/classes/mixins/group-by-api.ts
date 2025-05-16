import { GroupByRule } from "../../types";
import { getRuleFromIdentifier } from "../../utils/finder-utils";
import { GroupByMixin } from "./group-by";

/**
 * Public surface for the Group By mixin
 */
function groupByAPI<FItem>(mixin: GroupByMixin<FItem>) {
    return {
        activeRule: mixin.activeRule,
        activeRuleId: mixin.activeRule?.id,
        requireGroup: mixin.requireGroup,
        rules: mixin.rules,
        groupIdSortDirection: mixin.groupIdSortDirection,
        set: mixin.set.bind(mixin),
        toggle: (identifier: GroupByRule | string) => {
            const rule = getRuleFromIdentifier<GroupByRule>(identifier, mixin.rules);
            if (mixin.activeRule === rule?.id) {
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

export { groupByAPI };
