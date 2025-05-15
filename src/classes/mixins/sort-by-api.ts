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
        reset() {
            mixin.set(undefined, undefined);
        },
    };
}

export { sortByAPI };
