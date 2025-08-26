# Configuration

Options shape for a new FinderCore instance:

```ts
rules: FinderRule<FItem>[];
hooks?: RuleHook[];
context?: FContext;
isLoading?: boolean;
disabled?: boolean;

// starting mixin values
initialSearchTerm?: string;
initialSortBy?: string;
initialSortDirection?: SortDirection;
initialGroupBy?: string;
initialFilters?: Record<string, any>;

// ranked search and custom search rules may conflict.
ignoreSortByRulesWhileSearchRuleIsActive?: boolean;

// Force items to use a group rule.
// If no groupBy is set, the first valid group rule will be used.
requireGroup?: boolean;

// Pagination
page?: number;
numItemsPerPage?: number;

// Triggered after Finder initializes for the first time.
onInit?: FinderOnInitCallback;

// Triggered when a valid items array is first received
onReady?: FinderOnReadyCallback;

// Triggered the first time a user interacts with the component.
onFirstUserInteraction?: FinderOnFirstUserInteractCallback;

// When Finder's internal states changes, a snapshot is emitted to listeners
onChange?: FinderOnChangeCallback;
```
