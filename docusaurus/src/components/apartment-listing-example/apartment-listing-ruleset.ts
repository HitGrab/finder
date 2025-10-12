import { finderRuleset, searchRule, filterRule, sortByRule } from "@hitgrab/finder";
import { ApartmentListing } from "./apartment-listing-types";

export const ruleset = finderRuleset<ApartmentListing>([
    searchRule<ApartmentListing>({
        searchFn: (listing) => {
            if (listing.name) {
                return [
                    listing.name, // Cool Manor
                    listing.address.street_address, // 111 Cool St
                ];
            }
            return listing.address.street_address;
        },
    }),
    filterRule<ApartmentListing>({
        id: "is_available_immediately",
        filterFn: (listing) => listing.is_available_immediately,
        boolean: true,
        label: "Available Immediately",
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
            {
                label: "2k+",
                value: [2000, Infinity],
            },
        ],
    }),
    filterRule<ApartmentListing, number>({
        id: "num_bedrooms_filter",
        filterFn: (listing, value) => value.includes(listing.num_bedrooms),
        options: ({ items }) => {
            const allNumBedrooms = items.map((listing) => listing.num_bedrooms);
            const uniqueNumBedrooms = new Set(allNumBedrooms);
            const sortedUniqueNumBedrooms = Array.from(uniqueNumBedrooms).sort();
            return sortedUniqueNumBedrooms.map((numBedrooms) => {
                return {
                    label: `${numBedrooms} Bedrooms`,
                    value: numBedrooms,
                };
            });
        },
        multiple: true,
    }),
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
]);
