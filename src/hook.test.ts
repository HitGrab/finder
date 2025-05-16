import { test } from "vitest";
import { renderHook } from "@testing-library/react";
import { FinderMeta, FinderOnChangeCallback } from "./types";
import { act } from "react";

import { range } from "lodash";
import { searchRule, filterRule, finderRules, sortByRule, groupByRule } from "./utils/type-enforcers";
import { useFinder } from "./hooks/use-finder";

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
            searchRule({
                searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            }),
        ];
        const initialSearchTerm = "apple";

        const { result } = renderHook(() => useFinder(objectItems, { rules, initialSearchTerm }));
        expect(result.current.matches.items).toStrictEqual([apple]);
    });

    test("Debounced search triggers once", async () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            debounceDelay: 100,
        });

        const onChange = vitest.fn();
        const { result } = renderHook(() => useFinder(objectItems, { rules: [rule], onChange }));

        // Set the search term value 10 times
        range(0, 10).forEach((value) => {
            act(() => {
                result.current.search.setSearchTerm(String(value));
            });
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, Number(rule.debounceDelay) + 10));
        });

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});

describe("Filter - Basic", () => {
    test("Single filter", () => {
        const rules = [
            filterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => {
                    return item.price <= value;
                },
            }),
        ];
        const initialFilters = {
            price_is_below: 5,
        };
        const { result } = renderHook(() => useFinder(objectItems, { rules, initialFilters }));

        expect(result.current.matches.items).toStrictEqual([apple, orange]);
    });

    test("Multiple filters tested on same dataset", () => {
        const rules = [
            filterRule({
                id: "tastiest_fruit_name",
                filterFn: (item: MockObjectItem, value: string) => {
                    return item.name === value;
                },
            }),
            filterRule({
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
        const { result } = renderHook(() => useFinder(objectItems, { rules, initialFilters }));
        expect(result.current.matches.items).toStrictEqual([apple]);
    });

    test("A single filter allows multiple options", () => {
        const rule = filterRule<MockObjectItem, string>({
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

        const { result } = renderHook(() => useFinder(objectItems, { rules: [rule] }));
        act(() => {
            result.current.filters.toggleOption(rule, "Apple");
        });
        act(() => {
            result.current.filters.toggleOption(rule, "Orange");
        });
        expect(result.current.filters.get(rule)).toStrictEqual(["Apple", "Orange"]);
    });

    test("Inactive filters have no effect", () => {
        const rules = finderRules([
            {
                id: "tastiest_fruit_name",
                filterFn: (item: MockObjectItem, value: string) => item.name === value,
            },
            {
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            },
        ]);
        const { result } = renderHook(() => useFinder(objectItems, { rules }));
        expect(result.current.matches.items).toStrictEqual([apple, orange, banana]);
    });

    test("Return empty array for unmatched filters", () => {
        const rules = finderRules([
            {
                id: "tastiest_fruit_name",
                filterFn: (item: MockObjectItem, value: string) => item.name === value,
            },
        ]);
        const initialFilters = {
            tastiest_fruit_name: "guava",
        };
        const { result } = renderHook(() => useFinder(objectItems, { rules, initialFilters }));
        expect(result.current.matches.items).toStrictEqual([]);
    });
});

describe("Filter - Advanced", () => {
    test("Filters receive meta context", () => {
        const rules = finderRules([
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
        const { result } = renderHook(() => useFinder(objectItems, { rules, initialFilters, initialMeta }));
        expect(result.current.matches.items).toStrictEqual([orange]);
    });

    test("Debounced filter changes trigger once", async () => {
        const rule = filterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            debounceDelay: 100,
        });

        const onChange = vitest.fn();
        const { result } = renderHook(() => useFinder(objectItems, { rules: [rule], onChange }));

        // Set the search term value 10 times
        range(0, 10).forEach((value) => {
            act(() => {
                result.current.filters.set(rule, value);
            });
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, Number(rule.debounceDelay) + 10));
        });

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test("Filter values can be tested without changing state", () => {
        const rule = filterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
        });

        const { result } = renderHook(() => useFinder(objectItems, { rules: [rule] }));

        // test a filter without setting the state
        const testResult = result.current.filters.test(rule, 5);
        expect(testResult).toStrictEqual([apple, orange]);

        // result state is unchanged
        expect(result.current.matches.items).toStrictEqual([apple, orange, banana]);
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

        const filter = filterRule<MockObjectItem, number>({
            id: "price_is_below",
            filterFn: (item, value) => item.price <= value,
            options: [optionOne, optionTwo, optionThree],
        });
        const booleanFilter = filterRule<MockObjectItem>({
            id: "expires_in_five_days",
            filterFn: (item) => item.daysUntilExpiryDate === "five",
            is_boolean: true,
        });
        const rules = finderRules([filter, booleanFilter]);
        const { result } = renderHook(() => useFinder(objectItems, { rules }));

        // test a filter without setting the state
        const testResult = result.current.filters.testOptions(filter);

        expect(testResult.get(optionOne)?.length).toBe(1);
        expect(testResult.get(optionTwo)?.length).toBe(2);
        expect(testResult.get(optionThree)?.length).toBe(3);

        const booleanTestResult = result.current.filters.testOptions(booleanFilter);
        expect(booleanTestResult.get(true)?.length).toBe(2);
        expect(booleanTestResult.get(false)?.length).toBe(3);

        // result state is unchanged
        expect(result.current.matches.items).toStrictEqual([apple, orange, banana]);
    });
});

describe("SortBy", () => {
    test("Asc", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const { result } = renderHook(() => useFinder(objectItems, { rules }));
        expect(result.current.matches.items).toStrictEqual([apple, orange, banana]);
    });

    test("Desc", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const initialSortDirection = "desc";
        const { result } = renderHook(() => useFinder(objectItems, { rules, initialSortDirection }));
        expect(result.current.matches.items).toStrictEqual([banana, orange, apple]);
    });

    test("Cycles", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];

        const { result } = renderHook(() => useFinder(objectItems, { rules }));
        result.current.sortBy.cycleSortDirection();
        expect(result.current.sortBy.sortDirection).toStrictEqual("desc");
    });
});

describe("GroupBy", () => {
    test("Groups items", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
            }),
        ];

        const { result } = renderHook(() => useFinder(objectItems, { rules, requireGroup: true }));
        expect(result.current.matches.groups).toStrictEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Sticky headers", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sticky: { header: ["five"] },
            }),
        ];

        const { result } = renderHook(() => useFinder(objectItems, { rules, requireGroup: true }));
        expect(result.current.matches.groups).toStrictEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);
    });

    test("Sticky groups preserve order", () => {
        const rules = [
            groupByRule({
                id: "item_type",
                groupFn: (item: MockObjectItem) => item.type,
                sticky: { footer: ["orange", "apple"] },
            }),
        ];

        const { result } = renderHook(() => useFinder(objectItems, { rules, requireGroup: true }));
        expect(result.current.matches.groups).toStrictEqual([
            { id: "banana", items: [banana] },
            { id: "orange", items: [orange] },
            { id: "apple", items: [apple] },
        ]);
    });
});

describe("Pagination", () => {
    test("Items are paginated", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const initialSortDirection = "desc";

        // first page
        let page = 1;
        const numItemsPerPage = 1;

        const initialProps = [objectItems, { rules, initialSortDirection, page, numItemsPerPage }] as const;
        const { result, rerender } = renderHook((props = initialProps) => useFinder(...props), {
            initialProps,
        });

        expect(result.current.matches.items).toStrictEqual([banana]);

        // next page
        act(() => {
            page = 2;
            rerender([objectItems, { rules, initialSortDirection, page, numItemsPerPage }]);
        });
        expect(result.current.matches.items).toStrictEqual([orange]);

        // last page
        act(() => {
            page = 3;
            rerender([objectItems, { rules, initialSortDirection, page, numItemsPerPage }]);
        });

        expect(result.current.matches.items).toStrictEqual([apple]);
    });
});

describe("Selection", () => {
    test("Selects items", () => {
        const { result } = renderHook(() => useFinder(objectItems, {}));
        act(() => {
            result.current.selectedItems.select(apple);
        });

        expect(result.current.selectedItems.items).toStrictEqual([apple]);
    });

    test("Deletes selected item", () => {
        const initialSelectedItems = [apple];

        const { result } = renderHook(() => useFinder(objectItems, { initialSelectedItems }));

        act(() => {
            result.current.selectedItems.delete(apple);
        });

        expect(result.current.selectedItems.items).toStrictEqual([]);
    });

    test("Throws error when exceeding limit", () => {
        const initialSelectedItems = [apple];
        const { result } = renderHook(() => useFinder(objectItems, { initialSelectedItems, maxSelectedItems: 1 }));

        expect(() => {
            result.current.selectedItems.select(orange);
        }).toThrowError();
    });
});

describe("onChange", () => {
    test("onChange triggers", () => {
        const rules = [
            filterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => {
                    return item.price <= value;
                },
            }),
        ];
        const onChange: FinderOnChangeCallback<MockObjectItem> = (diff, snapshot) => {
            expect(diff.filters).toStrictEqual({ price_is_below: 5 });
        };

        const { result } = renderHook(() => useFinder(objectItems, { rules, onChange }));
        act(() => {
            result.current.filters.set("price_is_below", 5);
        });
    });
});
