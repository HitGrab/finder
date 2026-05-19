# Review Ruleset

We've assembled our piles of rules. Let's bundle them using a `finderRuleset` type guard into a single file.

```ts
// rules.ts
interface ApartmentListing {
    id: number;
    name: string;
    price: number;
    address: {
        street_address: string;
        secondary_address: string;
    };
    num_bedrooms: number;
    is_available_immediately: boolean;
}

export const APARTMENT_LISTING_RULESET = finderRuleset<ApartmentListing>([
    // Search
    searchRule({
        searchFn: (listing) => {
            if (listing.name) {
                return [
                    listing.name, // Cool Manor
                    listing.address.line_one, // 111 Cool St
                ];
            }
            return listing.address.line_one;
        },
    }),

    // Filter
    filterRule({
        id: "is_available_immediately",
        filterFn: (listing) => listing.is_available_immediately,
        boolean: true,
    }),
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
    }),
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
    }),

    // Sort
    sortByRule({
        id: "sort_by_price",
        label: "Price",
        sortFn: (listing) => listing.price,
    }),
    sortByRule({
        id: "sort_by_num_bedrooms",
        label: "Number of Bedrooms",
        sortFn: (listing) => listing.num_bedrooms,
        defaultSortDirection: "desc",
    }),
]);
```
