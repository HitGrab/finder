import { FinderSortDirection } from "../../types";
import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function sortByAPI<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../../types").FinderSortByRule<unknown> | undefined;
    activeRuleId: string | undefined;
    sortDirection: FinderSortDirection;
    rules: import("../../types").FinderSortByRule<unknown>[];
    set: (identifier: import("../../types").FinderSortByRule | string | undefined, incomingSortDirection?: FinderSortDirection) => void;
    setSortDirection: (incomingSortDirection: FinderSortDirection) => void;
    cycleSortDirection: () => void;
    reset(): void;
};
export { sortByAPI };
