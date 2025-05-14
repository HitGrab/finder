import { FinderSortDirection } from "../../types";
import { SortByMixin } from "./sort-by";

/**
 * Public surface for the SortBy mixin
 */
function sortByAPI<FItem>(mixin: SortByMixin<FItem>) {
    return {
        activeRule: mixin.activeRule,
        activeRuleId: mixin.activeRule?.id,
        sortDirection: mixin.sortDirection,
        rules: mixin.rules,
        set: mixin.set.bind(mixin),
        setSortDirection: mixin.setSortDirection.bind(mixin),
        cycleSortDirection: () => {
            if (mixin.sortDirection === undefined) {
                mixin.setSortDirection("desc");
            }
            if (mixin.sortDirection === "desc") {
                mixin.setSortDirection("asc");
            }
            if (mixin.sortDirection === "asc") {
                mixin.setSortDirection(undefined);
            }
        },
        reset() {
            mixin.set(undefined, undefined);
        },
    };
}

export { sortByAPI };
