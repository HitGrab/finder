import {
    filterRule,
    Finder,
    FinderContent,
    finderRules,
    finderStringCompare,
    groupByRule,
    searchRule,
    sortByRule,
    useFinderContext,
    useFinderRef,
} from "finder";
import { random, range } from "lodash";
import { Fragment } from "react";
import { FinderFilterControl } from "./finder-filter-control";

type Product = {
    label: string;
    sku: string;
    rating: number;
    price: string;
};
const names = ["Apple", "Orange", "Banana", "Guava", "Dragonfruit", "Cherry", "Blueberry", "Pear", "Grape"];
const randomProducts = range(0, 9).map((index) => {
    const sku = `SKU-${random(2, 10) * 100}-${random(200, 400)}`;
    return {
        label: names[index],
        sku,
        rating: random(1, 5),
        price: new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(random(10, 100)),
    };
});

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
            id: "is_best_fruit",
            filterFn: (item, value: string) => item.label === "Guava",
            label: "Is best fruit",
            is_boolean: true,
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
        <div style={{ display: "flex", gap: "10px" }}>
            <Finder items={randomProducts} rules={rules} controllerRef={ref}>
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
                </div>

                <FinderContent>
                    {{
                        items: ({ items }) => {
                            return (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "20px",
                                        border: "1px solid #000",
                                        padding: "20px",
                                        maxWidth: "800px",
                                        flex: 1,
                                    }}
                                >
                                    {items.map((item) => (
                                        <SamplePhoto photo={item} key={item.sku} />
                                    ))}
                                </div>
                            );
                        },
                        groups: ({ groups, rule }) => {
                            return (
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
                                            <div style={{ display: "flex", gap: "20px" }}>
                                                {items.map((item) => (
                                                    <SamplePhoto photo={item} key={item.sku} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        },
                        empty: "No items found.",
                        noMatches: "No matches found.",
                    }}
                </FinderContent>
            </Finder>
        </div>
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
    console.log(finder.filters.rules);
    return (
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
            {finder.filters.rules.map((rule) => {
                return <FinderFilterControl label={rule.label ?? rule.id} rule={rule} key={rule.id} />;
            })}
        </div>
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

function SamplePhoto({ photo }: { photo: Product }) {
    const finder = useFinderContext();
    const isSelected = finder.selectedItems.isSelected(photo);
    return (
        <div
            style={{ display: "flex", flexDirection: "column", padding: "10px", gap: "10px", background: isSelected ? "gold" : undefined }}
            onClick={(e) => finder.selectedItems.toggle(photo)}
        >
            <div style={{ aspectRatio: "1/1", background: "#eee", width: "100px" }} />
            <b>{photo.label}</b>
            <div>
                Rating:
                {range(0, photo.rating).map((value) => {
                    return <Fragment key={value}>*</Fragment>;
                })}
            </div>
            <div>{photo.sku}</div>
            <label style={{ pointerEvents: "none" }}>
                <input checked={isSelected} type="checkbox" readOnly={true} />
                Select
            </label>
        </div>
    );
}

export { App };
