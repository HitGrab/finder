import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function readonlySortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../..").SortByRule<unknown> | undefined;
    sortDirection: string | undefined;
    rules: import("../..").SortByRule<unknown>[];
};
declare function sortByInterface<FItem>(mixin: SortByMixin<FItem>): {
    set: (identifier?: string | import("../..").SortByRule, incomingSortDirection?: string) => void;
    setSortDirection: (incomingSortDirection?: string) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
    reset(): void;
    activeRule: import("../..").SortByRule<unknown> | undefined;
    sortDirection: string | undefined;
    rules: import("../..").SortByRule<unknown>[];
};
export { readonlySortByInterface, sortByInterface };
