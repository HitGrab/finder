---
sidebar_position: 1
---

# Filters

Let's build some common filters.

- Price
- Is available immediately
- Number of bedrooms
- Promixity to a location

Let's transform those into filter rules.

## Filter with defined options

```ts
filterRule<ApartmentListing, [number:min, number:max]>({

    // this predicate must be satisfied for an item to be returned.
    filterFn: (listing, value) => {
        const [min, max] = value;
        return listing.price >= min && listing.price <= max;
    },

    // We can define an array of preset options.
    options: [
        {
            label: 'under 1k'
            value: [0, 1000]
        }
        {
            label: '1k-2k'
            value: [1000, 2000]
        }
    ]
})
```

## Boolean filter: Immediate availability

```ts
filterRule<ApartmentListing>({
    // as this will be a boolean filter, we don't need to do a comparison.
    filterFn: (listing) => listing.is_available_immediately,

    // set to boolean mode.
    boolean: true,
});
```

## Multiple filter: Number of bedrooms

```ts
filterRule<ApartmentListing, number>({
    filterFn: (listing, value) => value.includes(listing.num_bedrooms),

    // Options can also be generated at runtime with a callback.
    options: ({ items }) => {
        const allNumBedrooms = items.map((listing) => listing.num_bedrooms);
        const uniqueNumBedrooms = new Set(allNumBedrooms);
        return Array.from(uniqueNumBedrooms).map((numBedrooms) => {
            return {
                label: `${numBedrooms} Bedrooms`,
                value: numBedrooms,
            };
        });
    },

    // Allows for an array of values
    multiple: true,
});
```

## Context filter: Proximity to location

```ts
filterRule<ApartmentListing, number>({

    // "Context" can be any arbitrary value passed into the Finder component.
    filterFn: (listing, value, context) => {
        const { userX, userY } = context;
        const distance = (listing.x, listing.y, userX, userY) => Math.hypot(userX - listing.y, userY - listing.y);
        return distance <= value;
    },

    options: [
        {
            label: 'within 1k'
            value: 1000
        }
        {
            label: 'within 5k'
            value: 5000
        }
    ]

    // Allows for an array of values
    multiple: true,
});
```
