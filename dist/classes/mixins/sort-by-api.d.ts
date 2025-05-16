import { SortByMixin } from "./sort-by";
/**
 * Public surface for the SortBy mixin
 */
declare function sortByAPI<FItem>(mixin: SortByMixin<FItem>): {
    activeRule: import("../..").HydratedSortByRule<any, any> | undefined;
    activeRuleId: any;
    sortDirection: string | undefined;
    rules: import("../..").HydratedSortByRule<unknown, any>[];
    set: (identifier?: string | import("../..").SortByRule | import("../..").HydratedSortByRule, incomingSortDirection?: string) => void;
    setSortDirection: (incomingSortDirection?: string) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
    reset(): void;
};
export { sortByAPI };
