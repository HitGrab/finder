import { SortDirection } from "../../types";
import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function readonlySortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../..").SortByRule<unknown> | undefined;
    sortDirection: SortDirection;
    userHasSetSortDirection: boolean;
    rules: import("../..").SortByRule<unknown>[];
};
declare function sortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    set: (identifier?: string | import("../..").SortByRule, incomingSortDirection?: SortDirection) => void;
    setSortDirection: (incomingSortDirection?: SortDirection) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
    reset(): void;
    activeRule: import("../..").SortByRule<unknown> | undefined;
    sortDirection: SortDirection;
    userHasSetSortDirection: boolean;
    rules: import("../..").SortByRule<unknown>[];
};
export { readonlySortByInterface, sortByInterface };
