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
        set(identifier?: GroupByRule | string) {
            if (typeof identifier === "string" && identifier.trim() === "") {
                mixin.set(undefined);
                return;
            }
            if (identifier) {
                const rule = getRuleFromIdentifier<GroupByRule>(identifier, mixin.rules);
                mixin.set(rule);
                return;
            }
            mixin.set(undefined);
        },
        toggle: (identifier: GroupByRule | string) => {
            const rule = getRuleFromIdentifier<GroupByRule>(identifier, mixin.rules);
            if (mixin.activeRule === rule?.id) {
                mixin.set(undefined);
                return;
            }
            mixin.set(rule);
        },
        reset: () => {
            return mixin.set(undefined);
        },
    };
}

export { groupByAPI };
