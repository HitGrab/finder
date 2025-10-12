---
sidebar_position: 2
---

# Sort By

We want to offer two sort options to the user; **price** and **number of bedrooms**.

```ts
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

:::info Further reading

- [SortByRule](/rules/sort-by-rule) definition
- [SortBy API](/api/sort-by-api)

:::
