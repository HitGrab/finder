---
sidebar_position: 2
---

# Sort By

We want to offer a couple of sort options to the user.

```ts
const rules = [
    sortByRule<ApartmentListing>({
        label: 'Price',
        sortFn: (listing) => listing.price,
    }),
    sortByRule<ApartmentListing>({
        label: "Distance",

        // "Context" can be any arbitrary value passed into the Finder component.
        sortFn: (listing, context) => {
            const { userX, userY } = context;
            const distance = (listing.x, listing.y, userX, userY) => Math.hypot(userX - listing.y, userY - listing.y);
            return distance;
        },
    }),
];
```

:::tip
Only a single sortBy rule can be active at one time.
If any sortBy rules are provided and no specific rule is set, the first sortBy rule in the stack will be considered active.
:::
