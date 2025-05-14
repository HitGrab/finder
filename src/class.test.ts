import { test } from "vitest";
import { FinderMeta, FinderOnChangeCallback } from "./types";
import { act } from "react";
import { range } from "lodash";
import { Finder } from "./classes/finder";
import { makeSearchRule, makeFilterRule, makeRules, makeSortByRule, makeGroupByRule } from "./utils/type-enforcers";
import { SearchMixin } from "./classes/mixins/search";

type MockObjectItem = {
    type: string;
    name: string;
    price: number;
    daysUntilExpiryDate: string;
};

const apple: MockObjectItem = { type: "apple", name: "Apple", price: 1, daysUntilExpiryDate: "three" };
const orange: MockObjectItem = { type: "orange", name: "Orange", price: 2, daysUntilExpiryDate: "five" };
const banana: MockObjectItem = { type: "banana", name: "Banana", price: 10, daysUntilExpiryDate: "five" };

const objectItems: MockObjectItem[] = [apple, orange, banana];

describe("Search", () => {
    test("Finds item", () => {
        const rules = [
            makeSearchRule({
                searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            }),
        ];

        const finder = new Finder(objectItems, { rules });

        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toStrictEqual([apple]);
    });

    test("Debounced search triggers once", async () => {
        const searchRule = makeSearchRule({
            searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            debounceDelay: 100,
        });
        const rules = [searchRule];

        const onChange = vitest.fn();
        const finder = new Finder(objectItems, { rules, onChange });

        // Set the search term value 10 times
        range(0, 10).forEach((value) => {
            finder.search.setSearchTerm(String(value));
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, Number(searchRule.debounceDelay) + 10));
        });

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});

describe("Filter - Basic", () => {
    test("Single filter", () => {
        const rules = [
            makeFilterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => {
                    return item.price <= value;
                },
            }),
        ];
        const initialFilters = {
            price_is_below: 5,
        };
        const finder = new Finder(objectItems, { rules, initialFilters });
        expect(finder.matches.items).toStrictEqual([apple, orange]);
    });

    test("Multiple filters tested on same dataset", () => {
        const rules = [
            makeFilterRule({
                id: "tastiest_fruit_name",
                filterFn: (item: MockObjectItem, value: string) => {
                    return item.name === value;
                },
            }),
            makeFilterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => {
                    return item.price <= value;
                },
            }),
        ];
        const initialFilters = {
            tastiest_fruit_name: "Apple",
            price_is_below: 2,
        };
        const finder = new Finder(objectItems, { rules, initialFilters });
        expect(finder.matches.items).toStrictEqual([apple]);
    });

    test("A single filter allows multiple options", () => {
        const filterRule = makeFilterRule<MockObjectItem, string>({
            id: "employee_favourite_fruits",
            filterFn: (item, value) => item.name === value,
            multiple: true,
            options: [
                {
                    label: "Bob",
                    value: "Apple",
                },
                {
                    label: "Robert",
                    value: "Orange",
                },
                {
                    label: "Bobby",
                    value: "Chocolate",
                },
            ],
        });
        const rules = [filterRule];

        const finder = new Finder(objectItems, { rules });
        finder.filters.toggleOption(filterRule, "Apple");
        finder.filters.toggleOption(filterRule, "Orange");

        expect(finder.filters.get(filterRule)).toStrictEqual(["Apple", "Orange"]);
    });

    test("Inactive filters have no effect", () => {
        const rules = makeRules([
            {
                id: "tastiest_fruit_name",
                filterFn: (item: MockObjectItem, value: string) => item.name === value,
            },
            {
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            },
        ]);
        const finder = new Finder(objectItems, { rules });
        expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
    });

    test("Return empty array for unmatched filters", () => {
        const rules = makeRules([
            {
                id: "tastiest_fruit_name",
                filterFn: (item: MockObjectItem, value: string) => item.name === value,
            },
        ]);
        const initialFilters = {
            tastiest_fruit_name: "guava",
        };
        const finder = new Finder(objectItems, { rules, initialFilters });
        expect(finder.matches.items).toStrictEqual([]);
    });
});

describe("Filter - Advanced", () => {
    test("Filters receive meta context", () => {
        const rules = makeRules([
            {
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number, meta) => {
                    if (meta?.get("user_dislikes") === item) {
                        return false;
                    }

                    return item.price <= value;
                },
            },
        ]);
        const initialFilters = {
            price_is_below: 5,
        };
        const initialMeta: FinderMeta = new Map();
        initialMeta.set("user_dislikes", apple);

        const finder = new Finder(objectItems, { rules, initialFilters, initialMeta });
        expect(finder.matches.items).toStrictEqual([orange]);
    });

    test("Debounced filter changes trigger once", async () => {
        const filterRule = makeFilterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            debounceDelay: 100,
        });
        const rules = [filterRule];

        const onChange = vitest.fn();
        const finder = new Finder(objectItems, { rules, onChange });

        // Set the search term value 10 times
        range(0, 10).forEach((value) => {
            finder.filters.set(filterRule, value);
        });

        await new Promise((resolve) => setTimeout(resolve, Number(filterRule.debounceDelay) + 10));

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test("Filter values can be tested without changing state", () => {
        const filterRule = makeFilterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
        });

        const finder = new Finder(objectItems, { rules: [filterRule] });

        // test a filter without setting the state
        const testResult = finder.filters.test(filterRule, 5);
        expect(testResult).toStrictEqual([apple, orange]);

        // result state is unchanged
        expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
    });

    test("Filter options can evaluate their number of potential matches.", () => {
        const optionOne = {
            value: 1,
            label: "One",
        };
        const optionTwo = {
            value: 3,
            label: "Three",
        };
        const optionThree = {
            value: 10,
            label: "Ten",
        };

        const filter = makeFilterRule<MockObjectItem, number>({
            id: "price_is_below",
            filterFn: (item, value) => item.price <= value,
            options: [optionOne, optionTwo, optionThree],
        });
        const booleanFilter = makeFilterRule<MockObjectItem>({
            id: "expires_in_five_days",
            filterFn: (item) => item.daysUntilExpiryDate === "five",
            is_boolean: true,
        });
        const rules = [filter, booleanFilter];
        const finder = new Finder(objectItems, { rules });

        // test a filter without setting the state
        const testResult = finder.filters.testOptions(filter);
        expect(testResult.get(optionOne)?.length).toBe(1);
        expect(testResult.get(optionTwo)?.length).toBe(2);
        expect(testResult.get(optionThree)?.length).toBe(3);

        const booleanTestResult = finder.filters.testOptions(booleanFilter);
        expect(booleanTestResult.get(true)?.length).toBe(2);
        expect(booleanTestResult.get(false)?.length).toBe(3);

        // result state is unchanged
        expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
    });
});

describe("SortBy", () => {
    test("Asc", () => {
        const rules = [
            makeSortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];

        const finder = new Finder(objectItems, { rules });
        expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
    });

    test("Desc", () => {
        const rules = [
            makeSortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const initialSortDirection = "desc";

        const finder = new Finder(objectItems, { rules, initialSortDirection });
        expect(finder.matches.items).toStrictEqual([banana, orange, apple]);
    });
});

describe("GroupBy", () => {
    test("Groups items", () => {
        const rules = [
            makeGroupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
            }),
        ];

        const finder = new Finder(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toStrictEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Sticky headers", () => {
        const rules = [
            makeGroupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sticky: { header: ["five"] },
            }),
        ];

        const finder = new Finder(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toStrictEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);
    });

    test("Sticky groups preserve order", () => {
        const rules = [
            makeGroupByRule({
                id: "item_type",
                groupFn: (item: MockObjectItem) => item.type,
                sticky: { footer: ["orange", "apple"] },
            }),
        ];

        const finder = new Finder(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toStrictEqual([
            { id: "banana", items: [banana] },
            { id: "orange", items: [orange] },
            { id: "apple", items: [apple] },
        ]);
    });
});

describe("Pagination", () => {
    test("Items are paginated", () => {
        const rules = [
            makeSortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const initialSortDirection = "desc";

        // first page
        let page = 1;
        const numItemsPerPage = 1;
        const finder = new Finder(objectItems, { rules, initialSortDirection, page, numItemsPerPage });

        expect(finder.matches.items).toStrictEqual([banana]);

        // next page
        finder.pagination.setPage(2);
        expect(finder.matches.items).toStrictEqual([orange]);

        // last page
        finder.pagination.setPage(3);
        expect(finder.matches.items).toStrictEqual([apple]);
    });
});

describe("Selection", () => {
    test("Selects items", () => {
        const finder = new Finder(objectItems, {});

        finder.selectedItems.select(apple);
        expect(finder.selectedItems.items).toStrictEqual([apple]);
    });

    test("Deletes selected item", () => {
        const initialSelectedItems = [apple];

        const finder = new Finder(objectItems, { initialSelectedItems });
        finder.selectedItems.delete(apple);

        expect(finder.selectedItems.items).toStrictEqual([]);
    });

    test("Throws error when exceeding limit", () => {
        const initialSelectedItems = [apple];
        const finder = new Finder(objectItems, { initialSelectedItems, maxSelectedItems: 1 });

        expect(() => {
            finder.selectedItems.select(orange);
        }).toThrowError();
    });
});

describe("onChange", () => {
    test("onChange triggers", () => {
        const rules = [
            makeFilterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => {
                    return item.price <= value;
                },
            }),
        ];
        const onChange: FinderOnChangeCallback<MockObjectItem> = (diff) => {
            expect(diff.filters).toStrictEqual({ price_is_below: 5 });
        };

        const finder = new Finder(objectItems, { rules, onChange });
        finder.filters.set("price_is_below", 5);
    });
});
