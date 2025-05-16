import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function sortByAPI<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../..").SortByRule<unknown> | undefined;
    activeRuleId: string | undefined;
    sortDirection: string | undefined;
    rules: import("../..").SortByRule<unknown>[];
    set: (identifier?: string | import("../..").SortByRule, incomingSortDirection?: string) => void;
    setSortDirection: (incomingSortDirection?: string) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
    reset(): void;
};
export { sortByAPI };
