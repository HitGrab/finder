import { capitalize, range } from "lodash";
import { Fragment } from "react";
import { Product } from "./types";
import { generateProducts } from "./services/generateProducts";
import {
    searchRule,
    finderStringCompare,
    filterRule,
    FilterOption,
    sortByRule,
    groupByRule,
    useFinderRef,
    Finder,
    FinderContent,
    useFinderContext,
    finderRuleset,
} from "@hitgrab/finder";
import "./global.css";
import { ProductItem } from "./components/product-item";
import { SearchControls } from "./components/search-controls";
import { FilterControls } from "./components/filter-controls";
import { SortControls } from "./components/sort-controls";
import { GroupByControls } from "./components/group-by-controls";
import { PaginationControls } from "./components/pagination-controls";
import { SelectedItems } from "./components/selected-items-controls";

const productList = generateProducts();

function App() {
    const rules = finderRuleset<Product>([
        searchRule({
            searchFn: (item, searchTerm) => finderStringCompare(item.label, searchTerm),
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
        filterRule<Product, string>({
            id: "colors",
            filterFn: (item, value) => value.every((color) => item.colors.includes(color)),
            multiple: true,
            label: "Colours",
            options: ({ items }) => {
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
                    .map<FilterOption>((color) => {
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
            defaultSortDirection: "desc",
        }),
        sortByRule({
            id: "price",
            label: "Price",
            sortFn: (item) => item.price,
            defaultSortDirection: "desc",
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
            <div className="layout">
                <div className="controls">
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

                <div className="content">
                    <div className="header">
                        <PagerNavigation />
                    </div>
                    <FinderContent>
                        {{
                            items: ({ items }) => {
                                return (
                                    <div className="itemList">
                                        {items.map((item) => (
                                            <ProductItem product={item} key={item.sku} />
                                        ))}
                                    </div>
                                );
                            },
                            groups: ({ groups, rule }) => {
                                return (
                                    <div className="groupList">
                                        {groups.map(({ id, items }) => (
                                            <div key={id}>
                                                <h2>
                                                    {rule.id === "rating"
                                                        ? range(0, Number(id)).map((value) => {
                                                              return <Fragment key={value}>*</Fragment>;
                                                          })
                                                        : id}
                                                </h2>
                                                <div className="itemList">
                                                    {items.map((item) => (
                                                        <ProductItem product={item} key={item.sku} />
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
                </div>
            </div>
        </Finder>
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
