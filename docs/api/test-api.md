# Tests

Test lets you test a ruleset's results without mutating state. The Tests api can be accessed from `finder.test`.

:::tip Advanced feature
Want to test a specific filter or a searchTerm instead of a complete ruleset? Use `finder.filters.test()` or `finder.search.test()` instead.
:::

**Type Signature**

```ts
interface SerializedMixins {
    search?: {
        searchTerm: string;
        rule?: SearchRule;
    };
    filters?: {
        rules: HydratedFilterRule[];
        values: Record<string, any>;
    };
    sortBy?: {
        rule?: SortByRule;
        sortDirection?: SortDirection;
    };
    pagination?: {
        page: number;
        numItemsPerPage?: number;
    };
    groupBy?: {
        rule?: GroupByRule;
        sortDirection?: SortDirection;
    };
}

finder.test(mixins: SerializedMixins, isAdditive: boolean): FItem[]
```

:::info Additive Testing
If `isAdditive` is true, Finder will merge the existing ruleset and state into the test.
:::
