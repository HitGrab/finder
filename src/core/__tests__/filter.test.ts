import { range } from "lodash";
import { filterRule, finderRuleset } from "../utils/rule-type-enforcers";
import { objectItems, apple, orange, banana } from "./test-constants";
import { MockObjectItem } from "./test-types";
import { FinderCore } from "../finder-core";

describe("Filters", () => {
    test("Boolean filter", () => {
        const rule = filterRule<MockObjectItem>({
            id: "price",
            filterFn: (item) => item.price !== 0,
            boolean: true,
        });
        const finder = new FinderCore(objectItems, { rules: [rule] });

        // rule has no value while inactive
        expect(finder.filters.isActive(rule)).toBe(false);
        expect(finder.filters.has(rule)).toBe(false);
        expect(finder.filters.get(rule)).toBe(false);

        finder.filters.toggle(rule);

        expect(finder.filters.isActive(rule)).toBe(true);
        expect(finder.filters.has(rule)).toBe(true);
        expect(finder.filters.get(rule)).toBe(true);

        finder.filters.delete(rule);

        expect(finder.filters.isActive(rule)).toBe(false);
        expect(finder.filters.has(rule)).toBe(false);
        expect(finder.filters.get(rule)).toBe(false);

        // Finder will complain if an invalid set value is passed
        expect(() => {
            finder.filters.set(rule, 5);
        }).toThrowError();

        expect(() => {
            finder.filters.add(rule, 5);
        }).toThrowError();

        expect(() => {
            finder.filters.delete(rule, 5);
        }).toThrowError();

        expect(() => {
            finder.filters.set(rule, "string");
        }).toThrowError();

        expect(() => {
            finder.filters.set(rule, [true, false]);
        }).toThrowError();
    });

    test("Multiple filter without options", () => {
        const rule = filterRule<MockObjectItem>({
            id: "price",
            filterFn: (item, value) => value.includes(item.price),
            multiple: true,
        });
        const finder = new FinderCore(objectItems, { rules: [rule] });

        // rule has no value while inactive
        expect(finder.filters.isActive(rule)).toBe(false);
        expect(finder.filters.has(rule)).toBe(false);
        expect(finder.filters.get(rule)).toEqual([]);

        finder.filters.set(rule, [5]);

        expect(finder.filters.isActive(rule)).toBe(true);
        expect(finder.filters.has(rule)).toBe(true);
        expect(finder.filters.get(rule)).toEqual([5]);

        finder.filters.delete(rule);

        expect(finder.filters.get(rule)).toEqual([]);

        finder.filters.add(rule, 3);

        expect(finder.filters.get(rule)).toEqual([3]);

        finder.filters.add(rule, 5);
        finder.filters.delete(rule, 3);

        expect(finder.filters.get(rule)).toEqual([5]);

        // Finder will complain if an invalid set value is passed
        expect(() => {
            finder.filters.set(rule, true);
        }).toThrowError();

        expect(() => {
            finder.filters.set(rule, "string");
        }).toThrowError();
    });

    test("Multiple filter with options", () => {
        const rule = filterRule<MockObjectItem>({
            id: "price_options",
            filterFn: (item, value) => value.includes(item.price),
            multiple: true,
            options: [
                { label: "Three", value: 3 },
                { label: "Five", value: 5 },
            ],
        });
        const finder = new FinderCore(objectItems, { rules: [rule] });

        // rule has no value while inactive
        expect(finder.filters.isActive(rule)).toBe(false);
        expect(finder.filters.has(rule)).toBe(false);
        expect(finder.filters.get(rule)).toEqual([]);

        finder.filters.toggle(rule, 5);

        expect(finder.filters.isActive(rule)).toBe(true);
        expect(finder.filters.has(rule)).toBe(true);
        expect(finder.filters.get(rule)).toEqual([5]);
    });

    test("Single rule", () => {
        const rule = filterRule<MockObjectItem>({
            id: "price",
            filterFn: (item, value) => item.price === value,
        });
        const finder = new FinderCore(objectItems, { rules: [rule] });

        // rule has no value while inactive
        expect(finder.filters.isActive(rule)).toBe(false);
        expect(finder.filters.has(rule)).toBe(false);
        expect(finder.filters.get(rule)).toBe(undefined);

        finder.filters.set(rule, 5);

        expect(finder.filters.isActive(rule)).toBe(true);
        expect(finder.filters.has(rule)).toBe(true);
        expect(finder.filters.get(rule)).toEqual(5);

        finder.filters.delete(rule);

        expect(finder.filters.isActive(rule)).toBe(false);
        expect(finder.filters.has(rule)).toBe(false);
        expect(finder.filters.get(rule)).toBe(undefined);

        expect(() => {
            finder.filters.add(rule, 5);
        }).toThrowError();

        expect(() => {
            finder.filters.delete(rule, 5);
        }).toThrowError();

        expect(() => {
            finder.filters.toggle(rule, 5);
        }).toThrowError();
    });

    describe("Mutators", () => {
        test("Initial value", () => {
            const rule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => item.price === value,
            });
            const finder = new FinderCore(objectItems, { rules: [rule], initialFilters: { price: 5 } });
            expect(finder.filters.isActive(rule)).toBe(true);
            expect(finder.filters.get(rule)).toBe(5);
        });

        test("Toggle", () => {
            const numericRule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => item.price === value,
            });
            const booleanRule = filterRule<MockObjectItem>({
                id: "price_is_ten",
                filterFn: (item) => item.price === 10,
                boolean: true,
            });
            const finder = new FinderCore(objectItems, { rules: [numericRule, booleanRule], initialFilters: { price: 5 } });

            // cannot toggle non-boolean rules
            expect(() => {
                finder.filters.toggle(numericRule);
            }).toThrowError();

            expect(finder.filters.isActive(booleanRule)).toBe(false);
            finder.filters.toggle(booleanRule);
            expect(finder.filters.isActive(booleanRule)).toBe(true);
        });

        test("ToggleOption", () => {
            const optionThree = {
                label: "Three",
                value: 3,
            };
            const optionFive = {
                label: "Five",
                value: 5,
            };
            const rule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => value.includes(item.price),
                multiple: true,
                options: [
                    optionThree,
                    optionFive,
                    {
                        label: "Ten",
                        value: 10,
                    },
                ],
            });

            const finder = new FinderCore(objectItems, { rules: [rule] });
            finder.filters.toggle(rule, 3);
            finder.filters.toggle(rule, 5);
            expect(finder.filters.get(rule)).toEqual([3, 5]);
            expect(finder.filters.has(rule, 3)).toBe(true);
            expect(finder.filters.has(rule, optionThree)).toBe(true);

            finder.filters.toggle(rule, 3);
            finder.filters.toggle(rule, 5);
            expect(finder.filters.get(rule)).toEqual([]);
            expect(finder.filters.has(rule, 3)).toBe(false);
            expect(finder.filters.has(rule, optionThree)).toBe(false);
        });
    });

    describe("Option generator", () => {
        test("Generates stable options", () => {
            const rule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => item.price === value,
                options: () => {
                    return range(0, 1000).map((value) => {
                        return {
                            label: String(value),
                            value,
                        };
                    });
                },
            });
            const finder = new FinderCore(objectItems, { rules: [rule] });
            const hydratedRule = finder.filters.getRule(rule);
            expect(hydratedRule.options?.length).toBe(1000);
        });

        test("Receive items", () => {
            const rule = filterRule<MockObjectItem>({
                id: "price_is_below",
                filterFn: (item, value) => item.price <= value,
                options: ({ items }) => {
                    const expiryDates = new Set();
                    items.forEach((item) => {
                        expiryDates.add(item.daysUntilExpiryDate);
                    });
                    return Array.from(expiryDates).map((date) => {
                        return {
                            label: "Expiry",
                            value: date,
                        };
                    });
                },
            });

            const finder = new FinderCore(objectItems, { rules: [rule] });
            const hydratedRule = finder.filters.getRule(rule);
            expect(hydratedRule.options?.length).toBe(2);
        });

        test("Receives context", () => {
            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "price_is_below",
                    filterFn: (item, value) => item.price <= value,
                    options: ({ context }) => {
                        expect(context?.user_dislikes).toBe(apple);
                        return [
                            {
                                label: "label",
                                value: "value",
                            },
                        ];
                    },
                }),
            ]);

            const context = {
                user_dislikes: apple,
            };
            new FinderCore(objectItems, { rules, context });
        });

        test("Recalculates on items change", () => {
            const hydrateOptions = vitest.fn();

            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "price_is_below",
                    filterFn: (item, value) => item.price <= value,
                    options: () => {
                        hydrateOptions();
                        return [
                            {
                                label: "label",
                                value: 3,
                            },
                        ];
                    },
                }),
            ]);

            const finder = new FinderCore([apple], { rules });
            finder.setItems(objectItems);
            expect(hydrateOptions).toHaveBeenCalledTimes(2);
        });

        test("Recalculates on context change", () => {
            const hydrateOptions = vitest.fn();

            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "price_is_below",
                    filterFn: (item, value) => item.price <= value,
                    options: () => {
                        hydrateOptions();
                        return [
                            {
                                label: "label",
                                value: 3,
                            },
                        ];
                    },
                }),
            ]);

            const context = {
                user_dislikes: apple,
            };

            const finder = new FinderCore(objectItems, { rules, context });
            finder.setContext({ ...finder.context, ...{ user_dislikes: orange } });
            expect(hydrateOptions).toHaveBeenCalledTimes(2);
        });
    });

    describe("Matcher", () => {
        test("Boolean filter", () => {
            const rule = filterRule<MockObjectItem>({
                id: "price",
                filterFn: (item) => item.price === 10,
                boolean: true,
            });

            const finder = new FinderCore(objectItems, { rules: [rule] });

            // does not affect results if unset
            expect(finder.matches.items).toEqual([apple, orange, banana]);

            // sets results
            finder.filters.set(rule, true);
            expect(finder.matches.items).toEqual([banana]);
        });

        test("Single filter", () => {
            const rules = [
                filterRule<MockObjectItem, number>({
                    id: "price_is_below",
                    filterFn: (item, value) => {
                        return item.price <= value;
                    },
                }),
            ];
            const initialFilters = {
                price_is_below: 5,
            };
            const finder = new FinderCore(objectItems, { rules, initialFilters });
            expect(finder.matches.items).toEqual([apple, orange]);
        });

        test("Multiple filters", () => {
            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "tastiest_fruit_name",
                    filterFn: (item, value: string) => {
                        return item.name === value;
                    },
                }),
                filterRule({
                    id: "price_is_below",
                    filterFn: (item, value: number) => {
                        return item.price <= value;
                    },
                }),
            ]);
            const initialFilters = {
                tastiest_fruit_name: "Apple",
                price_is_below: 2,
            };
            const finder = new FinderCore(objectItems, { rules, initialFilters });
            expect(finder.matches.items).toEqual([apple]);
        });

        test("Inactive filters have no effect", () => {
            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "tastiest_fruit_name",
                    filterFn: (item, value: string) => item.name === value,
                }),
                filterRule({
                    id: "price_is_below",
                    filterFn: (item, value: number) => item.price <= value,
                }),
            ]);
            const finder = new FinderCore(objectItems, { rules });
            expect(finder.matches.items).toEqual([apple, orange, banana]);
        });

        test("Return empty array when no matches are found", () => {
            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "tastiest_fruit_name",
                    filterFn: (item, value: string) => item.name === value,
                }),
            ]);

            const finder = new FinderCore(objectItems, { rules });
            finder.filters.set("tastiest_fruit_name", "guava");
            expect(finder.matches.items).toEqual([]);
        });

        describe("Required", () => {
            test("Required filters are active by default", () => {
                const rule = filterRule<MockObjectItem>({
                    id: "price",
                    filterFn: (item) => item.price === 10,
                    boolean: true,
                    required: true,
                });
                const finder = new FinderCore(objectItems, { rules: [rule] });
                expect(finder.filters.get(rule)).toBe(true);
                expect(finder.matches.items).toEqual([banana]);
            });

            test("Options array selects first option", () => {
                const rules = finderRuleset([
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

                const finder = new FinderCore(objectItems, { rules });
                expect(finder.matches.items).toEqual([apple]);
            });

            test("Option generator selects first option", () => {
                const rules = finderRuleset([
                    {
                        id: "price",
                        filterFn: (item: MockObjectItem, value: number) => item.price === value,
                        required: true,
                        options: ({ items }) =>
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

                const finder = new FinderCore(objectItems, { rules });
                expect(finder.matches.items).toEqual([banana]);
            });
        });
    });

    test("Debounced filter changes trigger once", async () => {
        const rule = filterRule({
            id: "price_is_below",
            filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            debounceMilliseconds: 100,
        });

        const onChange = vitest.fn();
        const finder = new FinderCore(objectItems, { rules: [rule], onChange });

        // Set the search term value 10 times
        range(0, 10).forEach((value) => {
            finder.filters.set(rule, value);
        });

        await new Promise((resolve) => setTimeout(resolve, Number(rule.debounceMilliseconds) + 10));

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    describe("Tester", () => {
        test("Rules can be tested in advance", () => {
            const rule = filterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            });

            const finder = new FinderCore(objectItems, { rules: [rule] });

            // test a filter without setting the state
            const testResult = finder.filters.testRule({ rule, value: 5 });
            expect(testResult).toEqual([apple, orange]);
        });

        test("Rules can be tested additively", () => {
            const firstRule = filterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => item.price <= value,
                defaultValue: 5,
            });
            const secondRule = filterRule({
                id: "has_seeds",
                filterFn: (item: MockObjectItem) => item.name === "Apple",
            });

            const finder = new FinderCore(objectItems, { rules: [firstRule, secondRule] });

            // test a filter without setting the state
            const testResult = finder.filters.testRule({ rule: secondRule, value: true, isAdditive: true });
            expect(testResult).toEqual([apple]);
        });

        test("Rule options can evaluate their matches.", () => {
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
                filterFn: (item, value) => value.includes(item.price),
                multiple: true,
                options: () => [optionOne, optionTwo, optionThree],
            });
            const booleanFilter = filterRule<MockObjectItem>({
                id: "expires_in_five_days",
                filterFn: (item) => item.daysUntilExpiryDate === "five",
                boolean: true,
            });
            const rules = [filter, booleanFilter];
            const finder = new FinderCore(objectItems, { rules });

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
            expect(finder.matches.items).toEqual([apple, orange, banana]);
        });
    });
});
