import { test } from "vitest";
import { renderHook } from "@testing-library/react";
import { FinderStateSnapshot } from "./types";
import { useFinderFactory } from "./hooks/use-finder-factory";
import { finderConfig } from "./utils/finderConfig";

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

    test("Sticky footers preserve order", () => {
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
    test("Paginates results", () => {
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
        let page = 1;
        const numItemsPerPage = 1;
        const { result, rerender } = renderHook(() => useFinderFactory(objectItems, { config, initialValues, page, numItemsPerPage }));
        expect(result.current.results.items).toStrictEqual([banana]);

        page = 2;
        rerender([objectItems, { config, page, numItemsPerPage }]);
        expect(result.current.results.items).toStrictEqual([orange]);

        page = 3;
        rerender([objectItems, { config, page, numItemsPerPage }]);
        expect(result.current.results.items).toStrictEqual([apple]);
    });
});
