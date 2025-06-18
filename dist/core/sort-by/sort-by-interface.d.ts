import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function readonlySortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../..").SortByRule<unknown> | undefined;
    sortDirection: import("../..").SortDirection;
    userHasSetSortDirection: boolean;
    rules: import("../..").SortByRule<unknown>[];
};
declare function sortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    set: (identifier?: string | import("../..").SortByRule, incomingSortDirection?: import("../..").SortDirection) => void;
    setSortDirection: (incomingSortDirection?: import("../..").SortDirection) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
    reset(): void;
    activeRule: import("../..").SortByRule<unknown> | undefined;
    sortDirection: import("../..").SortDirection;
    userHasSetSortDirection: boolean;
    rules: import("../..").SortByRule<unknown>[];
};
export { readonlySortByInterface, sortByInterface };
