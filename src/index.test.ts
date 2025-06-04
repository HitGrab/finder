import { test } from "vitest";
import { FinderMeta, FinderOnChangeCallback, FinderPluginFn, FinderPluginInterface } from "./types";
import { act } from "react";
import { range } from "lodash";
import { Finder } from "./classes/finder";
import { searchRule, filterRule, finderRules, sortByRule, groupByRule } from "./utils/type-enforcers";
import { finderCharacterCompare, finderSequentialCharacterCompare, finderStringCompare } from "./utils/compare-utils";
import { FinderPlugin } from "./classes/plugin";

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

describe("Constructor", () => {
    test("Catches duplicate rules", () => {
        const rules = [
            {
                id: "duplicate",
                filterFn: () => true,
            },
            {
                id: "duplicate",
                filterFn: () => true,
            },
        ];
        expect(() => {
            const finder = new Finder(objectItems, { rules });
        }).toThrowError();
    });

    test("Catches invalid rules", () => {
        const rules = [
            {
                id: "invalid",
                mysteryFn: () => true,
            },
        ];
        expect(() => {
            // @ts-expect-error
            const finder = new Finder(objectItems, { rules });
        }).toThrowError();
    });

    test("Catches missing ids", () => {
        const rules = [
            {
                filterFn: () => true,
            },
        ];
        expect(() => {
            // @ts-expect-error
            const finder = new Finder(objectItems, { rules });
        }).toThrowError();
    });
});
describe("Search", () => {
    test("Finds item", () => {
        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            }),
        ];

        const finder = new Finder(objectItems, { rules });

        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toStrictEqual([apple]);
    });

    test("Debounced search triggers once", async () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            debounceDelay: 100,
        });

        const onChange = vitest.fn();
        const finder = new Finder(objectItems, { rules: [rule], onChange });

        // Set the search term value 10 times
        range(0, 10).forEach((value) => {
            finder.search.setSearchTerm(String(value));
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
        const finder = new Finder(objectItems, { rules, initialFilters });
        expect(finder.matches.items).toStrictEqual([apple, orange]);
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
        const finder = new Finder(objectItems, { rules, initialFilters });
        expect(finder.matches.items).toStrictEqual([apple]);
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

        const finder = new Finder(objectItems, { rules: [rule] });
        finder.filters.toggleOption(rule, "Apple");
        finder.filters.toggleOption(rule, "Orange");

        expect(finder.filters.get(rule)).toStrictEqual(["Apple", "Orange"]);
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
        const finder = new Finder(objectItems, { rules });
        expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
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
        const finder = new Finder(objectItems, { rules, initialFilters });
        expect(finder.matches.items).toStrictEqual([]);
    });
});

describe("Filter - Advanced", () => {
    test("Required filters with defined options array select first option", () => {
        const rules = finderRules([
            {
                id: "price",
                filterFn: (item: MockObjectItem, value: number) => item.price === value,
                required: true,
                options: [
                    {
                        label: "one",
                        value: apple.price,
                    },
                    {
                        label: "two",
                        value: orange.price,
                    },
                    {
                        label: "ten",
                        value: banana.price,
                    },
                ],
            },
        ]);

        const finder = new Finder(objectItems, { rules });
        expect(finder.matches.items).toStrictEqual([apple]);
    });

    test("Required filters with options callback selects first option", () => {
        const rules = finderRules([
            {
                id: "price",
                filterFn: (item: MockObjectItem, value: number, meta) => item.price === value,
                required: true,
                options: (items) =>
                    items
                        .map((item) => {
                            return {
                                label: String(item.price),
                                value: item.price,
                            };
                        })
                        .reverse(),
            },
        ]);

        const finder = new Finder(objectItems, { rules });
        expect(finder.matches.items).toStrictEqual([banana]);
    });

    test("Required filters with boolean type selects true", () => {
        const rules = finderRules([
            {
                id: "price",
                filterFn: (item: MockObjectItem) => item.price === 10,
                required: true,
                isBoolean: true,
            },
        ]);

        const finder = new Finder(objectItems, { rules });
        expect(finder.matches.items).toStrictEqual([banana]);
    });

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

        const finder = new Finder(objectItems, { rules, initialFilters, initialMeta });
        expect(finder.matches.items).toStrictEqual([orange]);
    });

    test("Debounced filter changes trigger once", async () => {
        const rule = filterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            debounceDelay: 100,
        });

        const onChange = vitest.fn();
        const finder = new Finder(objectItems, { rules: [rule], onChange });

        // Set the search term value 10 times
        range(0, 10).forEach((value) => {
            finder.filters.set(rule, value);
        });

        await new Promise((resolve) => setTimeout(resolve, Number(rule.debounceDelay) + 10));

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test("Filter values can be tested in advance", () => {
        const rule = filterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
        });

        const finder = new Finder(objectItems, { rules: [rule] });

        // test a filter without setting the state
        const testResult = finder.filters.testRule({ rule, value: 5 });
        expect(testResult).toStrictEqual([apple, orange]);
    });

    test("Filter values can be tested additively", () => {
        const firstRule = filterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            defaultValue: 5,
        });
        const secondRule = filterRule({
            id: "has_seeds",
            filterFn: (item: MockObjectItem, value: string) => item.name === "Apple",
        });

        const finder = new Finder(objectItems, { rules: [firstRule, secondRule] });

        // test a filter without setting the state
        const testResult = finder.filters.testRule({ rule: secondRule, value: true, isAdditive: true });
        expect(testResult).toStrictEqual([apple]);
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
        const multipleFilter = filterRule<MockObjectItem, number>({
            id: "price_is_below",
            filterFn: (item, value) => item.price <= value,
            multiple: true,
            options: () => [optionOne, optionTwo, optionThree],
        });
        const booleanFilter = filterRule<MockObjectItem>({
            id: "expires_in_five_days",
            filterFn: (item) => item.daysUntilExpiryDate === "five",
            isBoolean: true,
        });
        const rules = [filter, booleanFilter];
        const finder = new Finder(objectItems, { rules });

        // test a filter without setting the state
        const testResult = finder.filters.testRuleOptions({ rule: filter });
        expect(testResult.get(optionOne)?.length).toBe(1);
        expect(testResult.get(optionTwo)?.length).toBe(2);
        expect(testResult.get(optionThree)?.length).toBe(3);

        // test multiple filter
        const multipleTestResult = finder.filters.testRuleOptions({ rule: multipleFilter });
        expect(multipleTestResult.get(optionOne)?.length).toBe(1);
        expect(multipleTestResult.get(optionTwo)?.length).toBe(2);
        expect(multipleTestResult.get(optionThree)?.length).toBe(3);

        // test boolean filter
        const booleanTestResult = finder.filters.testRuleOptions({ rule: booleanFilter });
        expect(booleanTestResult.get(true)?.length).toBe(2);
        expect(booleanTestResult.get(false)?.length).toBe(3);

        // result state is unchanged
        expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
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

        const finder = new Finder(objectItems, { rules });
        expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
    });

    test("Desc", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const initialSortDirection = "desc";

        const finder = new Finder(objectItems, { rules, initialSortDirection });
        expect(finder.matches.items).toStrictEqual([banana, orange, apple]);
    });

    test("Cycles", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];

        const finder = new Finder(objectItems, { rules });
        finder.sortBy.cycleSortDirection();
        expect(finder.sortBy.sortDirection).toStrictEqual("desc");
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

        const finder = new Finder(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toStrictEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Groups sort order", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sortGroupIdFn: (group) => group.id,
            }),
        ];

        const finder = new Finder(objectItems, { rules, requireGroup: true });
        act(() => {
            finder.groupBy.setGroupIdSortDirection("asc");
        });

        expect(finder.matches.groups).toStrictEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);

        act(() => {
            finder.groupBy.setGroupIdSortDirection("desc");
        });

        expect(finder.matches.groups).toStrictEqual([
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

        const finder = new Finder(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toStrictEqual([
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
            sortByRule({
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
            filterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => {
                    return item.price <= value;
                },
            }),
        ];
        const onChange: FinderOnChangeCallback<MockObjectItem> = (diff) => {
            expect(diff.filter).toStrictEqual({ price_is_below: 5 });
        };

        const finder = new Finder(objectItems, { rules, onChange });
        finder.filters.set("price_is_below", 5);
    });
});

describe("Utils", () => {
    test("finderStringCompare performs case-insensitive search and strips non-digit and non-word characters", () => {
        const searchTerm = "AB    C\nD\r    E";

        const positiveHaystack = "a b c d e";
        const positiveMatch = finderStringCompare(positiveHaystack, searchTerm);
        expect(positiveMatch).toBe(true);

        const negativeHaystack = "aaccd";
        const negativeMatch = finderStringCompare(negativeHaystack, searchTerm);
        expect(negativeMatch).toBe(false);
    });

    test("finderCharacterCompare checks that every digit or word character is present in a haystack", () => {
        const searchTerm = "AB    C\nD\r    E";
        const haystackWithReversedCharacters = "e d c b a";
        const positiveMatch = finderCharacterCompare(haystackWithReversedCharacters, searchTerm);
        expect(positiveMatch).toBe(true);

        const negativeHaystack = "aaccd";
        const negativeMatch = finderCharacterCompare(negativeHaystack, searchTerm);
        expect(negativeMatch).toBe(false);
    });

    test("finderCharacterCompare checks that every digit or word character is sequentially present in a haystack,", () => {
        const searchTerm = "AB    C\nD\r    E";

        const positiveHaystack = "aabciop[cde";
        const positiveMatch = finderSequentialCharacterCompare(positiveHaystack, searchTerm);
        expect(positiveMatch).toBe(true);

        const haystackWithReversedCharacters = "e d c b a";
        const negativeMatch = finderSequentialCharacterCompare(haystackWithReversedCharacters, searchTerm);
        expect(negativeMatch).toBe(false);
    });
});

describe("Plugins", () => {
    test("Sample plugin", () => {
        const rules = finderRules<MockObjectItem>([
            searchRule({
                searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            }),
            filterRule({
                id: "price_is_below",
                filterFn: (item, value: number) => {
                    return item.price <= value;
                },
            }),
            filterRule({
                id: "expires_in_five_days",
                filterFn: (item) => item.daysUntilExpiryDate === "five",
                isBoolean: true,
            }),
        ]);

        const onRegister = vitest.fn();
        const onChange = vitest.fn();

        interface MyPlugin extends FinderPluginInterface {
            setValue: (value: number) => void;
            getValue: () => number;
        }
        const mockPlugin: FinderPluginFn<MyPlugin> = () => {
            let value = 5;
            let instance: Finder<any>;
            return {
                id: "test",
                register: (finder) => {
                    instance = finder;
                    onRegister();
                    finder.events.on("change", () => {
                        onChange();
                    });
                },
                setValue(currentValue: number) {
                    value = currentValue;
                },
                getValue: () => value,
            };
        };

        const initializedPlugin = mockPlugin();
        const finder = new Finder(objectItems, { rules, plugins: [initializedPlugin] });

        expect(onRegister).toHaveBeenCalledTimes(1);

        finder.filters.set("price_is_below", 3);

        expect(onChange).toHaveBeenCalledTimes(1);

        finder.plugins.get(initializedPlugin).setValue(10);

        expect(finder.plugins.get(initializedPlugin).getValue()).toBe(10);
    });
});
