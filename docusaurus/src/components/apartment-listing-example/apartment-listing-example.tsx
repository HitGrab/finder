import { filterRule, Finder, FinderContentItemProps, finderRuleset, searchRule, sortByRule, useFinder } from "@hitgrab/finder";
import { ApartmentListing } from "./apartment-listing-example-types";
import { useApartmentListings } from "./apartment-listing-example-logic";
import { useState, useCallback } from "react";

const ruleset = finderRuleset<ApartmentListing>([
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

export function ApartmentListingExample() {
    const data = useApartmentListings();
    return (
        <Finder items={data} rules={ruleset}>
            <div className="container">
                <div className="row">
                    <div className="col col--3">
                        <fieldset>
                            <legend>Search</legend>
                            <SearchControl />
                        </fieldset>
                        <fieldset>
                            <legend>Filters</legend>
                            <div>
                                <BooleanFilterControl ruleId="is_available_immediately" />
                            </div>
                            <div>
                                Price: <SingleValueControl ruleId="price" />
                            </div>
                            Num Bedrooms: <MultipleFilterControl ruleId="num_bedrooms_filter" />
                        </fieldset>
                        <fieldset>
                            <legend>Sort</legend>
                            <RadioSortBy />
                        </fieldset>
                    </div>
                    <div className="col col--9">
                        <Finder.Content>
                            {{
                                // Displayed while Finder's isLoading property is true.
                                loading: "Loading...",

                                // Finder received an empty items array.
                                empty: "No listings found.",

                                // No items were found that matched the current rules.
                                noMatches: "No results found.",

                                // The items parameter will receive the matches that have been searched, filtered, and sorted.
                                items: ApartmentListingExampleItems,
                            }}
                        </Finder.Content>
                    </div>
                </div>
            </div>
        </Finder>
    );
}

function ApartmentListingExampleItems({ items }: FinderContentItemProps<ApartmentListing>) {
    return (
        <div className="listingContainer">
            {items.map((listing) => (
                <Listing listing={listing} key={listing.id} />
            ))}
        </div>
    );
}

function Listing({ listing }: { listing: ApartmentListing }) {
    return (
        <div className="listing">
            <div className="listing__header">
                <b>
                    <Finder.SearchTermHaystack>{listing.name}</Finder.SearchTermHaystack>
                </b>
                <br />${new Intl.NumberFormat().format(listing.price)}
            </div>
            <div className="listing__content">
                <Finder.SearchTermHaystack>{listing.address.street_address}</Finder.SearchTermHaystack>
                <br />
                {listing.num_bedrooms} bedroom(s)
                <br />
                {listing.is_available_immediately ? "✅" : "❌"} Available immediately
            </div>
        </div>
    );
}

function SearchControl() {
    const finder = useFinder();
    const [query, setQuery] = useState<string>("");
    const handleQueryChange = useCallback(
        (value: string) => {
            setQuery(value);
            finder.search.setSearchTerm(value);
        },
        [finder.search],
    );
    const handleReset = useCallback(() => {
        setQuery("");
        finder.search.reset();
    }, [finder.search]);

    return (
        <>
            <input placeholder="Search" type="text" value={query} onInput={(e) => handleQueryChange(e.currentTarget.value)} />
            {finder.search.hasSearchTerm && (
                <button type="button" className="listContainer__search__resetButton" onClick={handleReset}>
                    x
                </button>
            )}
        </>
    );
}

interface BooleanFilterControlProps {
    ruleId: string;
}
function BooleanFilterControl({ ruleId }: BooleanFilterControlProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    const isChecked = finder.filters.has(rule);
    return (
        <label>
            <input type="checkbox" checked={isChecked} onChange={() => finder.filters.toggle(rule)} />
            {rule.label}
        </label>
    );
}

interface SingleValueControlProps {
    ruleId: string;
}
function SingleValueControl({ ruleId }: SingleValueControlProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    const ruleValue = finder.filters.get(rule);
    const composedOptions = rule.required ? rule.options : [{ value: undefined, label: "All" }, ...rule.options];
    const selectedOptionIndex = composedOptions.findIndex(({ value }) => value === ruleValue);
    return (
        <select
            value={selectedOptionIndex}
            onChange={(e) => {
                const selectedOption = composedOptions.at(e.currentTarget.selectedIndex);
                finder.filters.set(ruleId, selectedOption.value);
            }}
        >
            {composedOptions.map((option, index) => {
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <option value={index} key={index}>
                        {option.label}
                    </option>
                );
            })}
        </select>
    );
}

interface MultipleFilterControlProps {
    ruleId: string;
}
function MultipleFilterControl({ ruleId }: MultipleFilterControlProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    return (
        <ul>
            {rule.options.map((option) => {
                const isChecked = finder.filters.has(rule, option);
                return (
                    <li key={option.value}>
                        <label>
                            <input type="checkbox" checked={isChecked} onChange={() => finder.filters.toggle(rule, option)} />
                            {option.label}
                        </label>
                    </li>
                );
            })}
        </ul>
    );
}

function RadioSortBy() {
    const finder = useFinder();

    return (
        <ul>
            {finder.sortBy.rules.map((rule) => {
                const isChecked = finder.sortBy.activeRule === rule;
                return (
                    <li key={rule.id}>
                        <label>
                            <input type="radio" checked={isChecked} onChange={() => finder.sortBy.set(rule)} />
                            {rule.label}
                        </label>
                    </li>
                );
            })}
        </ul>
    );
}
