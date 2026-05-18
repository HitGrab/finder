# FinderConstructorOptions

```ts
export interface FinderConstructorOptions<FItem, FContext = any> {
    rules: RuleDefinition<FItem>[];
    effects?: (RuleEffect | SearchEffect)[];
    context?: FContext;
    isLoading?: boolean;
    disabled?: boolean;

    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: SortDirection;
    initialGroupBy?: string;
    initialGroupBySortDirection?: SortDirection;
    initialFilters?: Record<string, any>;

    // maybe a little verbose
    ignoreSortByRulesWhileSearchRuleIsActive?: boolean;

    // Force items to use a group rule.
    // If no groupBy is set, the first valid group rule will be used.
    requireGroup?: boolean;

    // Pagination properties
    page?: number;
    numItemsPerPage?: number;
    resetPaginationOn?: ("change" | "search" | "filter" | "sortBy" | "groupBy")[];

    // Triggered after Finder initializes for the first time.
    onInit?: FinderOnInitCallback;

    // A valid items array was received
    onReady?: FinderOnReadyCallback;

    // Triggered the first time a user interacts with the component.
    onFirstUserInteraction?: FinderOnFirstUserInteractCallback;

    // When values are changed, a snapshot is emitted to listeners
    onChange?: FinderOnChangeCallback;
}
```
