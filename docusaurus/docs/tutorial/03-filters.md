import Link from '@docusaurus/Link';

# Add Filters

Filters come in three flavours; **Boolean**, **Single value**, and **Multiple value**.

Filters default to having a single value, but boolean or multiple value mode can be enabled by adding `boolean: true` or `multiple: true` to your filter definition. Like most rule categories, filter rules require a unique id.

Let's build some common apartment hunting filters that'll let Joe find the perfect pad.

## Is available immediately ( boolean )

```ts
// rules.ts
filterRule<ApartmentListing>({
    id: "is_available_immediately",
    filterFn: (listing) => listing.is_available_immediately,
    boolean: true,
});
```

## Price ( single value )

This example provides an array of predefined options, but options are, well, optional!

```ts
// rules.ts
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

:::tip Optionally Strict Options
If a rule has defined options, Finder will not allow the user to select a value outside that set. If you need custom values, you can set `strictOptions: false` in the rule definition.
:::

## Number of bedrooms ( allow multiple values )

The options property can also be a callback that generates options based on Items or Context. Generated options are re-calculated whenever the Items array or Context changes.

Note that `filterFn` is always written as a test against a single value, even when contained in `multiple:true` rules. This is so that filters can be toggled between multiple-value and singlue-value without rewriting any logic.

```ts
// rules.ts
filterRule<ApartmentListing, number>({
    id: "num_bedrooms_filter",
    filterFn: (listing, value) => listing.num_bedrooms === value,
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

:::info[Further reading]

- <Link to="/reference/rules/filter-rule">FilterRule definition</Link>
- <Link to="/reference/api/filter-api">Filter API</Link>

:::
