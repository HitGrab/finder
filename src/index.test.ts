import { test } from "vitest";
import { renderHook } from "@testing-library/react";
import { FinderFilterDefinition, FinderMeta, FinderStateSnapshot } from "./types";
import { useFinderFactory } from "./hooks/use-finder-factory";
import { finderConfig } from "./utils/finder-config";
import { act } from "react";

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
    test("Search", () => {
        const config = finderConfig({
            searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
        });
        const initialValues: FinderStateSnapshot = {
            searchTerm: "apple",
        };
        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialValues }));

        expect(result.current.results.items).toStrictEqual([apple]);
    });
});

describe("Filters", () => {
    test("Single filter", () => {
        const config = finderConfig({
            filters: [
                {
                    id: "price_is_below",
                    filterFn: (item: MockObjectItem, value: number) => {
                        return item.price <= value;
                    },
                },
            ],
        });
        const initialValues: FinderStateSnapshot = {
            filters: {
                price_is_below: 5,
            },
        };
        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialValues }));

        expect(result.current.results.items).toStrictEqual([apple, orange]);
    });

    test("Multiple filter", () => {
        const config = finderConfig({
            filters: [
                {
                    id: "tastiest_fruit_name",
                    filterFn: (item: MockObjectItem, value: string) => {
                        return item.name === value;
                    },
                },
                {
                    id: "price_is_below",
                    filterFn: (item: MockObjectItem, value: number) => {
                        return item.price <= value;
                    },
                },
            ],
        });
        const initialValues: FinderStateSnapshot = {
            filters: {
                tastiest_fruit_name: "Apple",
                price_is_below: 2,
            },
        };
        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialValues }));
        expect(result.current.results.items).toStrictEqual([apple]);
    });

    test("Inactive filters have no effect", () => {
        const config = finderConfig({
            filters: [
                {
                    id: "tastiest_fruit_name",
                    filterFn: (item: MockObjectItem, value: string) => item.name === value,
                },
                {
                    id: "price_is_below",
                    filterFn: (item: MockObjectItem, value: number) => item.price <= value,
                },
            ],
        });
        const { result } = renderHook(() => useFinderFactory(objectItems, { config }));
        expect(result.current.results.items).toStrictEqual([apple, orange, banana]);
    });

    test("Return empty array for unmatched filters", () => {
        const config = finderConfig({
            filters: [
                {
                    id: "tastiest_fruit_name",
                    filterFn: (item: MockObjectItem, value: string) => item.name === value,
                },
            ],
        });
        const initialValues: FinderStateSnapshot = {
            filters: {
                tastiest_fruit_name: "guava",
            },
        };
        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialValues }));
        expect(result.current.results.items).toStrictEqual([]);
    });

    test("Filters receive meta context", () => {
        const config = finderConfig({
            filters: [
                {
                    id: "price_is_below",
                    filterFn: (item: MockObjectItem, value: number, meta) => {
                        if (meta?.get("user_dislikes") === item) {
                            return false;
                        }
                        return item.price <= value;
                    },
                },
            ],
        });
        const initialValues: FinderStateSnapshot = {
            filters: {
                price_is_below: 5,
            },
        };
        const initialMeta: FinderMeta = new Map();
        initialMeta.set("user_dislikes", apple);
        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialValues, initialMeta }));
        expect(result.current.results.items).toStrictEqual([orange]);
    });

    test("Filter values can be tested without changing state", () => {
        const filterDefinition = {
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
        };
        const config = finderConfig({
            filters: [filterDefinition],
        });
        const { result } = renderHook(() => useFinderFactory(objectItems, { config }));

        // test a filter without setting the state
        const testResult = result.current.filters.test(filterDefinition, 5);
        expect(testResult).toStrictEqual([apple, orange]);

        // result state is unchanged
        expect(result.current.results.items).toStrictEqual([apple, orange, banana]);
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

        const filterDefinition: FinderFilterDefinition<MockObjectItem> = {
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            options: [optionOne, optionTwo, optionThree],
        };
        const booleanFilterDefinition: FinderFilterDefinition<MockObjectItem> = {
            id: "expires_in_five_days",
            filterFn: (item: MockObjectItem) => item.daysUntilExpiryDate === "five",
            is_boolean: true,
        };
        const config = finderConfig({
            filters: [filterDefinition],
        });
        const { result } = renderHook(() => useFinderFactory(objectItems, { config }));

        // test a filter without setting the state
        const testResult = result.current.filters.testOptions(filterDefinition);

        expect(testResult.get(optionOne)).toBe(1);
        expect(testResult.get(optionTwo)).toBe(2);
        expect(testResult.get(optionThree)).toBe(3);

        const booleanTestResult = result.current.filters.testOptions(booleanFilterDefinition);
        console.log(booleanTestResult);

        // result state is unchanged
        expect(result.current.results.items).toStrictEqual([apple, orange, banana]);
    });
});

describe("SortBy", () => {
    test("Asc", () => {
        const config = finderConfig({
            sortBy: [
                {
                    id: "sort_by_price",
                    sortFn: (item: MockObjectItem) => item.price,
                },
            ],
        });
        const { result } = renderHook(() => useFinderFactory(objectItems, { config }));
        expect(result.current.results.items).toStrictEqual([apple, orange, banana]);
    });

    test("Desc", () => {
        const config = finderConfig({
            sortBy: [
                {
                    id: "sort_by_price",
                    sortFn: (item: MockObjectItem) => item.price,
                },
            ],
        });
        const initialValues: FinderStateSnapshot = {
            sortDirection: "desc",
        };
        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialValues }));
        expect(result.current.results.items).toStrictEqual([banana, orange, apple]);
    });
});

describe("GroupBy", () => {
    test("Groups items", () => {
        const config = finderConfig({
            groupBy: [
                {
                    id: "expiry_date",
                    groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                },
            ],
            requireGroup: true,
        });

        const { result } = renderHook(() => useFinderFactory(objectItems, { config }));
        expect(result.current.results.groups).toStrictEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Sticky headers", () => {
        const config = finderConfig({
            groupBy: [
                {
                    id: "expiry_date",
                    groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                    sticky: { header: ["five"] },
                },
            ],
            requireGroup: true,
        });

        const { result } = renderHook(() => useFinderFactory(objectItems, { config }));
        expect(result.current.results.groups).toStrictEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);
    });

    test("Sticky groups preserve order", () => {
        const config = finderConfig({
            groupBy: [
                {
                    id: "expiry_date",
                    groupFn: (item: MockObjectItem) => item.type,
                    sticky: { footer: ["orange", "apple"] },
                },
            ],
            requireGroup: true,
        });

        const { result } = renderHook(() => useFinderFactory(objectItems, { config }));
        expect(result.current.results.groups).toStrictEqual([
            { id: "banana", items: [banana] },
            { id: "orange", items: [orange] },
            { id: "apple", items: [apple] },
        ]);
    });
});

describe("Pagination", () => {
    test("Items are paginated", () => {
        const config = finderConfig({
            sortBy: [
                {
                    id: "sort_by_price",
                    sortFn: (item: MockObjectItem) => item.price,
                },
            ],
        });
        const initialValues: FinderStateSnapshot = {
            sortDirection: "desc",
        };

        // first page
        let page = 1;
        const numItemsPerPage = 1;
        const { result, rerender } = renderHook(() => useFinderFactory(objectItems, { config, initialValues, page, numItemsPerPage }));
        expect(result.current.results.items).toStrictEqual([banana]);

        // next page
        page = 2;
        rerender([objectItems, { config, initialValues, page, numItemsPerPage }]);
        expect(result.current.results.items).toStrictEqual([orange]);

        // last page
        page = 3;
        rerender([objectItems, { config, initialValues, page, numItemsPerPage }]);
        expect(result.current.results.items).toStrictEqual([apple]);
    });
});

describe("Selection", () => {
    test("Selects items", () => {
        const config = finderConfig({});

        const { result, rerender } = renderHook(() => useFinderFactory(objectItems, { config }));

        act(() => {
            result.current.selectedItems.select(apple);
        });

        expect(result.current.selectedItems.state).toStrictEqual([apple]);
    });

    test("Deletes selected item", () => {
        const config = finderConfig({});
        const initialSelectedItems = [apple];

        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialSelectedItems }));

        act(() => {
            result.current.selectedItems.delete(apple);
        });

        expect(result.current.selectedItems.state).toStrictEqual([]);
    });

    test("Throws error when exceeding limit", () => {
        const config = finderConfig({ maxSelectedItems: 1 });
        const initialSelectedItems = [apple];
        const { result } = renderHook(() => useFinderFactory(objectItems, { config, initialSelectedItems }));

        expect(() => {
            result.current.selectedItems.select(orange);
        }).toThrowError();
    });
});

describe("onChange", () => {
    test("onChange triggers", () => {
        const config = finderConfig({
            filters: [
                {
                    id: "price_is_below",
                    filterFn: (item: MockObjectItem, value: number) => {
                        return item.price <= value;
                    },
                },
            ],
            sortBy: [
                {
                    id: "sort_by_price",
                    sortFn: (item: MockObjectItem) => item.price,
                },
            ],
        });
        const onChange = (diff: FinderStateSnapshot) => {
            expect(diff.filters).toStrictEqual({ price_is_below: 5 });
        };

        renderHook(() => useFinderFactory(objectItems, { config, onChange }));
    });
});
