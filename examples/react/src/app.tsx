import {
    FilterRule,
    filterRule,
    Finder,
    FinderContent,
    FinderOption,
    finderRules,
    finderStringCompare,
    groupByRule,
    HydratedFilterRule,
    searchRule,
    sortByRule,
    useFinderContext,
    useFinderRef,
} from "finder";
import { capitalize, range } from "lodash";
import { Fragment, useState } from "react";
import { FinderFilterControl } from "./finder-filter-control";
import { ProductItem } from "./product-item";
import { Product } from "./types";
import { generateProducts } from "./services/generateProducts";

const productList = generateProducts();

function App() {
    const rules = finderRules<Product>([
        searchRule({
            searchFn: (item, searchTerm) => finderStringCompare(item.label, searchTerm),
        }),
        filterRule({
            id: "sku",
            label: "SKU is exactly",
            filterFn: (item, value: string) => item.sku === value,
            options: (items) => {
                return items.map((item) => {
                    return {
                        label: item.sku,
                        value: item.sku,
                    };
                });
            },
        }),
        filterRule({
            id: "min_rating",
            label: "Rating is at least",
            filterFn: (item, value: number) => item.rating <= value,
            options: () => {
                return range(1, 6).map((value) => {
                    return {
                        label: "".padEnd(value, "*"),
                        value,
                    };
                });
            },
        }),
        filterRule({
            id: "colors",
            filterFn: (item, value: string[]) => value.every((color) => item.colors.includes(color)),
            multiple: true,
            label: "Colours",
            options: (items) => {
                const uniqueColors = items
                    .reduce((acc, item) => {
                        item.colors.forEach((color) => {
                            acc.add(color);
                        });
                        return acc;
                    }, new Set<string>())
                    .values();

                return Array.from(uniqueColors)
                    .sort()
                    .map<FinderOption>((color) => {
                        return {
                            label: capitalize(color),
                            value: color,
                        };
                    });
            },
        }),
        filterRule({
            id: "is_best_fruit",
            filterFn: (item, value: string) => item.label === "Guava",
            label: "Is best fruit",
            isBoolean: true,
        }),
        filterRule<Product, [min: number, max: number]>({
            id: "price_between",
            filterFn: (item, [min, max]) => item.price >= min && item.price <= max,
            label: "Price Between",
            hidden: true,
            debounceDelay: 300,
        }),
        sortByRule({
            id: "index",
            label: "Index",
            sortFn: (item) => item.index,
        }),
        sortByRule({
            id: "alphabetical",
            label: "Alphabetical",
            sortFn: (item) => item.label,
        }),
        sortByRule({
            id: "rating",
            label: "By Rating",
            sortFn: (item) => item.rating,
            defaultDirection: "desc",
        }),
        sortByRule({
            id: "price",
            label: "Price",
            sortFn: (item) => item.price,
            defaultDirection: "desc",
        }),
        groupByRule({
            id: "rating",
            label: "By Rating",
            groupFn: (item) => item.rating,
            sortGroupIdFn: (group) => {
                return group.items.at(0)?.rating ?? group.id;
            },
        }),
        groupByRule({
            id: "first_letter_of_label",
            label: "First letter",
            groupFn: (item) => item.label.substring(0, 1),
            sortGroupIdFn: (group) => group.id,
        }),
    ]);

    const ref = useFinderRef();

    return (
        <Finder items={productList} rules={rules} controllerRef={ref}>
            <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <fieldset>
                        <legend>Search by</legend>
                        <SearchControls />
                    </fieldset>
                    <fieldset>
                        <legend>Filter by</legend>
                        <FilterControls />
                    </fieldset>
                    <fieldset>
                        <legend>Sort by</legend>
                        <SortControls />
                    </fieldset>
                    <fieldset>
                        <legend>Group by</legend>
                        <GroupByControls />
                    </fieldset>
                    <fieldset>
                        <legend>Selected Items</legend>
                        <SelectedItems />
                    </fieldset>
                    <fieldset>
                        <legend>Pagination</legend>
                        <PaginationControls />
                    </fieldset>
                </div>

                <FinderContent>
                    {{
                        items: ({ items }) => {
                            return (
                                <div style={{ display: "flex", flexDirection: "column", maxWidth: "800px" }}>
                                    <PagerNavigation />
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(4, 1fr)",
                                            gap: "20px",
                                            border: "1px solid #000",
                                            padding: "20px",

                                            flex: 1,
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        {items.map((item) => (
                                            <ProductItem product={item} key={item.sku} />
                                        ))}
                                    </div>
                                </div>
                            );
                        },
                        groups: ({ groups, rule }) => {
                            return (
                                <>
                                    <PagerNavigation />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "20px",

                                            border: "1px solid #000",
                                            padding: "20px",
                                            maxWidth: "800px",
                                            flex: 1,
                                        }}
                                    >
                                        {groups.map(({ id, items }) => (
                                            <div key={id}>
                                                <h2>
                                                    {rule?.id === "rating"
                                                        ? range(0, Number(id)).map((value) => {
                                                              return <Fragment key={value}>*</Fragment>;
                                                          })
                                                        : id}
                                                </h2>
                                                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                                                    {items.map((item) => (
                                                        <ProductItem product={item} key={item.sku} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            );
                        },
                        empty: "No items found.",
                        noMatches: "No matches found.",
                    }}
                </FinderContent>
            </div>
        </Finder>
    );
}

function SearchControls() {
    const finder = useFinderContext();
    return (
        <>
            <input type="text" onChange={(e) => finder.search.setSearchTerm(e.currentTarget.value)} />
            {finder.search.hasSearchTerm && <button onClick={() => finder.search.reset()}>Clear</button>}
        </>
    );
}

function FilterControls() {
    const finder = useFinderContext();
    const priceRule = finder.filters.rules.find(({ id }) => id === "price_between");
    return (
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
            {finder.filters.rules
                .filter((rule) => !rule.hidden)
                .map((rule) => {
                    if (rule.hidden) {
                        return null;
                    }
                    return (
                        <Fragment key={rule.id}>
                            <FinderFilterControl rule={rule} key={rule.id} />
                            <hr style={{ width: "100%" }} />
                        </Fragment>
                    );
                })}
            {priceRule && <PriceFilterControl rule={priceRule} />}
        </div>
    );
}

function PriceFilterControl({ rule }: { rule: HydratedFilterRule }) {
    const finder = useFinderContext();
    const [filterMin, filterMax] = finder.filters.get(rule) ?? [10, 100];
    const [min, setMin] = useState(filterMin);
    const [max, setMax] = useState(filterMax);
    const handleChange = ({ inputMin, inputMax }: { inputMin?: Number; inputMax?: Number }) => {
        let filterMin = inputMin ?? min;
        let filterMax = inputMax ?? max;

        if (inputMin && inputMin > filterMax) {
            filterMax = inputMin;
            setMax(inputMin);
        }
        if (inputMax && inputMax < filterMin) {
            filterMin = inputMax;
            setMin(inputMax);
        }
        finder.filters.set(rule, [filterMin, filterMax]);
    };
    return (
        <>
            Price between:
            <div>
                <input
                    value={min}
                    type="range"
                    min={10}
                    max={100}
                    onChange={(e) => {
                        setMin(Number(e.currentTarget.value));
                        handleChange({ inputMin: Number(e.currentTarget.value) });
                    }}
                />{" "}
                {new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(min)}
            </div>
            <div>
                <input
                    value={100 - max}
                    type="range"
                    min={0}
                    max={90}
                    onChange={(e) => {
                        const adjustedPrice = 100 - Number(e.currentTarget.value);
                        setMax(adjustedPrice);
                        handleChange({ inputMax: adjustedPrice });
                    }}
                    style={{ direction: "rtl" }}
                />
                {new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(max)}
            </div>
        </>
    );
}

function SortControls() {
    const finder = useFinderContext();
    return finder.sortBy.rules.map((rule) => {
        return (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }} key={rule.id}>
                <label key={rule.id}>
                    <input type="radio" name="sortBy" checked={finder.sortBy.activeRule === rule} value={rule.id} onChange={() => finder.sortBy.set(rule)} />{" "}
                    {rule.label}
                </label>
                {finder.sortBy.activeRule === rule && (
                    <>
                        <select value={String(finder.sortBy.sortDirection)} onChange={(e) => finder.sortBy.setSortDirection(e.currentTarget.value)}>
                            <option key="default">Default</option>
                            <option value="desc" key="desc">
                                Desc
                            </option>
                            <option value="asc" key="asc">
                                Asc
                            </option>
                        </select>
                        <button onClick={() => finder.sortBy.cycleSortDirection()}>Cycle sort direction</button>
                    </>
                )}
            </div>
        );
    });
}

function GroupByControls() {
    const finder = useFinderContext();
    return (
        <>
            <select
                value={finder.groupBy.activeRuleId}
                onChange={(e) => {
                    finder.groupBy.set(e.currentTarget.value);
                }}
            >
                {finder.groupBy.requireGroup === false && <option value="">-- None --</option>}
                {finder.groupBy.rules.map((rule) => {
                    return (
                        <option value={rule.id} key={rule.id}>
                            {rule.label ?? rule.id}
                        </option>
                    );
                })}
            </select>
            <>
                <select
                    value={String(finder.groupBy.groupIdSortDirection)}
                    onChange={(e) => {
                        finder.groupBy.setGroupIdSortDirection(e.currentTarget.value);
                    }}
                >
                    <option value="" key="default">
                        Default
                    </option>
                    <option value="desc" key="desc">
                        Desc
                    </option>
                    <option value="asc" key="asc">
                        Asc
                    </option>
                </select>
            </>
            {finder.groupBy.activeRule && <button onClick={() => finder.groupBy.reset()}>Clear</button>}
        </>
    );
}

function SelectedItems() {
    const finder = useFinderContext();
    return (
        <>
            <ul>
                {finder.selectedItems.items?.map((item) => {
                    return <li key={item.label}>{item.label}</li>;
                })}
            </ul>
            {Array.isArray(finder.selectedItems.items) && finder.selectedItems.items.length > 0 && (
                <button onClick={() => finder.selectedItems.reset()}>Clear</button>
            )}
        </>
    );
}

function PaginationControls() {
    const finder = useFinderContext();
    return (
        <div>
            Items per page:
            <select
                value={finder.pagination.numItemsPerPage ?? ""}
                onChange={(e) => {
                    return finder.pagination.setNumItemsPerPage(e.target.value !== "" ? Number(e.target.value) : undefined);
                }}
            >
                <option value="">No pagination</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
}

function PagerNavigation() {
    const finder = useFinderContext();
    if (finder.pagination.isPaginated) {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <button type="button" onClick={() => finder.pagination.setPage(finder.pagination.page - 1)}>
                    Previous
                </button>
                <div>
                    <b>
                        Page {finder.pagination.page}/{finder.pagination.lastPage}
                    </b>
                    <br />
                    Showing {finder.pagination.offset}-{finder.pagination.offset + Number(finder.pagination.numItemsPerPage)} / {finder.matches.numMatchedItems}{" "}
                    items
                </div>
                <button type="button" onClick={() => finder.pagination.setPage(finder.pagination.page + 1)}>
                    Next
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            Showing {finder.matches.numMatchedItems} / {finder.matches.numTotalItems} items
        </div>
    );
}

export { App };
