import Link from '@docusaurus/Link';

# Add SortBy Rules

We want to offer two sort options to the user; **price** and **number of bedrooms**.

```ts
// rules.ts
const rules = [
    sortByRule<ApartmentListing>({
        id: "sort_by_price",
        label: "Price",
        sortFn: (listing) => listing.price,
    }),
    sortByRule<ApartmentListing>({
        id: "sort_by_num_bedrooms",
        label: "Number of Bedrooms",
        sortFn: (listing) => listing.num_bedrooms,
        defaultSortDirection: "desc",
    }),
];
```

Only a single sortBy rule can be active at one time.

If any sortBy rules are provided and no specific rule is set, the first sortBy rule in the stack will be considered active.

:::tip Complex sorting
SortBy rules use lodash's `orderBy` under the hood, so `sortFn` and `defaultSortDirection` both accept arrays of callbacks and directions.
:::

:::info Further reading

- <Link to="/reference/rules/sort-by-rule">SortByRule definition</Link>
- <Link to="/reference/api/sort-by-api">SortBy API</Link>

:::
