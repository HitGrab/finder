import { Finder, FinderContentProps, useFinder } from "@hitgrab/finder";

import { useState, useCallback } from "react";
import { ruleset } from "./apartment-listing-ruleset";
import { ApartmentListing } from "./apartment-listing-types";
import { useApartmentListings } from "./use-apartment-listings";

export function ApartmentListingExample() {
    const data = useApartmentListings();
    return (
        <Finder items={data} rules={ruleset}>
            <div className="container">
                <div className="row">
                    <div className="col col--3">
                        <div className="card apartmentControl">
                            <div className="card__body">
                                <b>Search</b>
                                <br />
                                <SearchControl />
                            </div>
                        </div>
                        <div className="card apartmentControl">
                            <div className="card__body">
                                <b>Filters</b>
                                <br />
                                <div>
                                    <BooleanFilterControl ruleId="is_available_immediately" />
                                </div>
                                <div>
                                    Price: <SingleValueControl ruleId="price" />
                                </div>
                                Num Bedrooms: <MultipleFilterControl ruleId="num_bedrooms_filter" />
                            </div>
                        </div>
                        <div className="card apartmentControl">
                            <div className="card__body">
                                <b>Sort</b>
                                <br />
                                <RadioSortBy />
                            </div>
                        </div>
                    </div>
                    <div className="col col--9">
                        <div className="scrollable" style={{ height: "100%" }}>
                            <div className="scrollable__content">
                                <div className="apartmentListings">
                                    <Finder.Content>
                                        {{
                                            // Displayed while Finder's isLoading property is true.
                                            loading: "Loading...",

                                            // Finder received an empty items array.
                                            empty: "No listings found.",

                                            // No items were found that matched the current rules.
                                            noMatches: "No results found.",

                                            // The items parameter will receive the matches that have been searched, filtered, and sorted.
                                            items: ItemListing,
                                        }}
                                    </Finder.Content>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Finder>
    );
}

function ItemListing({ items }: FinderContentProps<ApartmentListing>["items"]) {
    return items.map((listing) => {
        return (
            <div className="card apartmentCard" key={listing.id}>
                <div
                    className="card__image asset__image--apartment"
                    style={{
                        backgroundImage:
                            'url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                        filter: `hue-rotate(${listing.hue_shift}deg)`,
                    }}
                />
                <div className="card__body">
                    <h4>
                        <Finder.SearchTermHaystack>{listing.name}</Finder.SearchTermHaystack>
                    </h4>
                    <Finder.SearchTermHaystack>{listing.address.street_address}</Finder.SearchTermHaystack>
                </div>
                <div className="card__footer">
                    <span className="badge badge--primary">{new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(listing.price)}</span>
                    <span className="badge badge--secondary">{listing.num_bedrooms} bedroom(s)</span>
                    <span className="badge badge--info">{listing.is_available_immediately ? "✅ Available" : "❌ Soon"}</span>
                </div>
            </div>
        );
    });
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
        <div className="listContainer__search">
            <input placeholder="Search" type="text" value={query} onInput={(e) => handleQueryChange(e.currentTarget.value)} />
            {finder.search.hasSearchTerm && (
                <button type="button" className="listContainer__search__resetButton" onClick={handleReset}>
                    x
                </button>
            )}
        </div>
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
    const options = rule.options ?? [];
    const composedOptions = rule.required ? options : [{ value: undefined, label: "All" }, ...options];
    const selectedOptionIndex = composedOptions.findIndex(({ value }) => value === ruleValue);
    return (
        <select
            value={selectedOptionIndex}
            onChange={(e) => {
                const selectedOption = composedOptions.at(e.currentTarget.selectedIndex);
                finder.filters.set(ruleId, selectedOption?.value);
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
            {rule.options?.map((option) => {
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
