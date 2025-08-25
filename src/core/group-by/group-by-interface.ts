import { GroupByMixin } from "./group-by";

/**
 * Public surface for the Group By mixin
 */

function readonlyGroupByInterface<FItem, FContext>(mixin: GroupByMixin<FItem, FContext>) {
    return {
        activeRule: mixin.activeRule,
        requireGroup: mixin.requireGroup,
        rules: mixin.rules,
        groupIdSortDirection: mixin.groupIdSortDirection,
    };
}
function groupByInterface<FItem, FContext>(mixin: GroupByMixin<FItem, FContext>) {
    return {
        ...readonlyGroupByInterface(mixin),
        set: mixin.set.bind(mixin),
        toggle: mixin.toggle.bind(mixin),
        setGroupIdSortDirection: mixin.setGroupIdSortDirection.bind(mixin),
        reset: mixin.reset.bind(mixin),
    };
}

export { readonlyGroupByInterface, groupByInterface };
