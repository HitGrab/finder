---
title: Types
---

## FinderConstructorOptions

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

## SearchRuleDefinition

```ts
export interface SearchRuleDefinition<FItem, FContext> {
    searchFn: (item: FItem, context: FContext) => string | string[];
    id?: string;
    debounceMilliseconds?: number;
    label?: string;
    hidden?: boolean;
}
```

## SortByRuleDefinition

```ts
export interface SortByRuleDefinition<FItem, FContext> {
    sortFn:
        (item: FItem, context: FContext) => string | number)
        | (item: FItem, context: FContext) => string | number)[]
    defaultSortDirection?: SortDirection;
    id: string;
    debounceMilliseconds?: number;
    label?: string;
    hidden?: boolean;
}
```

## FilterRuleDefinition

```ts
export interface FilterRuleDefinition<FItem, FValue, FContext> {
    filterFn: (item: FItem, value: FValue, context: FContext) => boolean;
    required?: boolean;
    options:
        FilterOption[]
        | (options: { items: FItem[]; context: FContext }) => FilterOption[]
    strictOptions?: boolean;
    multiple?: boolean;
    boolean?: boolean;
    id: string;
    debounceMilliseconds?: number;
    label?: string;
    hidden?: boolean;
}
```

## GroupByRuleDefinition

```ts
export interface GroupByRuleDefinition<FItem, FContext>  {
    groupFn: (item: FItem, context: FContext) => string | number | (string | number)[];
    sortGroupFn?: (item: FItem, context: FContext) => string | number),
    defaultGroupSortDirection?: SortDirection;
    sticky?:
        | {
              header?: string | string[];
              footer?: string | string[];
          }
        | ((
              groups: FinderResultGroup<FItem>[],
              context: FContext,
          ) => {
              header?: string | string[];
              footer?: string | string[];
          });
    id: string;
    debounceMilliseconds?: number;
    label?: string;
    hidden?: boolean;
}
```
