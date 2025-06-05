import { SortByMixin } from "./sort-by";

/**
 * Public surface for the SortBy mixin
 */
function sortByInterface<FItem>(mixin: SortByMixin<FItem>) {
    return {
        activeRule: mixin.activeRule,
        activeRuleId: mixin.activeRule?.id,
        sortDirection: mixin.sortDirection,
        rules: mixin.rules,
        set: mixin.set.bind(mixin),
        setSortDirection: mixin.setSortDirection.bind(mixin),
        // rotate between the rule default, desc, and asc.
        cycleSortDirection: () => {
            const initialDirection = mixin.sortDirection ?? mixin.activeRule?.defaultDirection;
            if (initialDirection === undefined) {
                mixin.setSortDirection("desc");
                return;
            }
            if (initialDirection === "desc") {
                mixin.setSortDirection("asc");
                return;
            }
            mixin.setSortDirection(undefined);
            return;
        },
        // flip between desc and asc.
        toggleSortDirection: () => {
            const initialDirection = mixin.sortDirection ?? mixin.activeRule?.defaultDirection;
            if (initialDirection === "desc") {
                mixin.setSortDirection("asc");
                return;
            }
            mixin.setSortDirection("desc");
        },
        reset() {
            mixin.set(undefined, undefined);
        },
    };
}

export { sortByInterface };
