import { SortDirection } from "../../types";
import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function readonlySortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../..").SortByRule<unknown, any> | undefined;
    sortDirection: SortDirection;
    userHasSetSortDirection: boolean;
    rules: import("../..").SortByRule<unknown, any>[];
};
declare function sortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    set: (identifier?: string | import("../..").SortByRule, incomingSortDirection?: SortDirection) => void;
    setSortDirection: (incomingSortDirection?: SortDirection) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
    reset(): void;
    activeRule: import("../..").SortByRule<unknown, any> | undefined;
    sortDirection: SortDirection;
    userHasSetSortDirection: boolean;
    rules: import("../..").SortByRule<unknown, any>[];
};
export { readonlySortByInterface, sortByInterface };
