---
sidebar_position: 1
---

# Filters

Filters come in three types; **Boolean**, **Single value**, and **Multiple value**.

Filters default to having a single value, but boolean or multiple value mode can be enabled by adding `boolean: true` or `multiple: true` to your filter definition.

Let's build some common apartment hunting filters that'll let Joe find the perfect pad.

1. Is available immediately ( boolean )
2. Price ( a single value )
3. Number of bedrooms ( allow multiple values )

## Boolean filter

Filter, SortBy, and GroupBy rules all require a unique id.

```ts
filterRule<ApartmentListing>({
    id: "is_available_immediately",
    filterFn: (listing) => listing.is_available_immediately,
    boolean: true,
});
```

## Single value filter

This example provides an array of predefined options, but options are, well, optional!

```ts
filterRule<ApartmentListing, [min: number, max: number]>({
    id: "price",
    filterFn: (listing, value) => {
        const [min, max] = value;
        return listing.price >= min && listing.price <= max;
    },
    options: [
        {
            label: "under 1k",
            value: [0, 1000],
        },
        {
            label: "1k-2k",
            value: [1000, 2000],
        },
    ],
});
```

## Multiple value filter

Options can also be generated at runtime with a generator function. When Finder receives an items array, it 'hydrates' the filter definition with the returned option array.

```ts
filterRule<ApartmentListing, number>({
    id: "num_bedrooms_filter",
    filterFn: (listing, value) => value.includes(listing.num_bedrooms),
    options: ({ items, context }) => {
        const allNumBedrooms = items.map((listing) => listing.num_bedrooms);
        const uniqueNumBedrooms = new Set(allNumBedrooms);
        return Array.from(uniqueNumBedrooms).map((numBedrooms) => {
            return {
                label: `${numBedrooms} Bedrooms`,
                value: numBedrooms,
            };
        });
    },
    multiple: true,
});
```

Filters will be re-hydrated if the items array or context reference is changed.

:::info Further reading

- [FilterRule](/rules/filter-rule) definition
- [Filters API](/api/filters-api)

:::
