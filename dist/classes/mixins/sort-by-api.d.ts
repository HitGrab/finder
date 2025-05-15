import { FinderSortDirection } from "../../types";
import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function sortByAPI<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../..").SortByRule<unknown> | undefined;
    activeRuleId: string | undefined;
    sortDirection: FinderSortDirection;
    rules: import("../..").SortByRule<unknown>[];
    set: (identifier: import("../..").SortByRule | string | undefined, incomingSortDirection?: FinderSortDirection) => void;
    setSortDirection: (incomingSortDirection: string | string[] | undefined) => void;
    cycleSortDirection: () => void;
    reset(): void;
};
export { sortByAPI };
