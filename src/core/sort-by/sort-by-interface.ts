import { SortDirection } from "../../types";
import { SortByMixin } from "./sort-by";

const cycleOrder: (SortDirection | undefined)[] = [undefined, "desc", "asc"] as const;

/**
 * Public surface for the SortBy mixin
 */
function readonlySortByInterface<FItem>(mixin: SortByMixin<FItem>) {
    return {
        activeRule: mixin.activeRule,
        sortDirection: mixin.sortDirection,
        userHasSetSortDirection: mixin.userHasSetSortDirection,
        rules: mixin.rules,
    };
}

function sortByInterface<FItem>(mixin: SortByMixin<FItem>) {
    return {
        ...readonlySortByInterface(mixin),
        set: mixin.set.bind(mixin),
        setSortDirection: mixin.setSortDirection.bind(mixin),
        // rotate between the rule default, desc, and asc.
        cycleSortDirection: () => {
            const initialIndex = cycleOrder.findIndex((direction) => direction === mixin.sortDirection);
            if (initialIndex !== -1) {
                const currentIndex = initialIndex + (1 % (cycleOrder.length - 1));
                mixin.setSortDirection(cycleOrder[currentIndex]);
            }
        },
        // flip between desc and asc.
        toggleSortDirection: () => {
            const initialDirection = mixin.sortDirection ?? mixin.activeRule?.defaultSortDirection;
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

export { readonlySortByInterface, sortByInterface };
