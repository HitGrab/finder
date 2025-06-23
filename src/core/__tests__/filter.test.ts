import { range } from "lodash";
import { Finder } from "../finder";
import { filterRule, finderRuleset } from "../utils/rule-type-enforcers";
import { objectItems, apple, orange, banana } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("Filters", () => {
    test("Accessors", () => {
        const rule = filterRule<MockObjectItem, number>({
            id: "price",
            filterFn: (item, value) => item.price === value,
        });
        const finder = new Finder(objectItems, { rules: [rule] });

        // hydrated rule can be retrieved
        const hydratedRule = finder.filters.getRule(rule);
        expect(finder.filters.rules).toEqual([hydratedRule]);

        // rule has no value while inactive
        expect(finder.filters.isActive(rule)).toEqual(false);
        expect(finder.filters.has(rule)).toEqual(false);
        expect(finder.filters.get(rule)).toEqual(undefined);
        expect(finder.filters.get(rule.id)).toEqual(undefined);
        expect(finder.filters.get(hydratedRule)).toEqual(undefined);
        expect(finder.filters.filters[rule.id]).toEqual(undefined);
        expect(finder.filters.raw[rule.id]).toEqual(undefined);
        expect(finder.filters.activeRules).toEqual([]);

        finder.filters.set(rule, 5);

        expect(finder.filters.isActive(rule)).toEqual(true);
        expect(finder.filters.has(rule)).toEqual(true);
        expect(finder.filters.get(rule)).toEqual(5);
        expect(finder.filters.get(rule.id)).toEqual(5);
        expect(finder.filters.get(hydratedRule)).toEqual(5);
        expect(finder.filters.filters[rule.id]).toEqual(5);
        expect(finder.filters.raw[rule.id]).toEqual(5);
        expect(finder.filters.activeRules).toEqual([hydratedRule]);
    });

    describe("Mutators", () => {
        test("Initial value", () => {
            const rule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => item.price === value,
            });
            const finder = new Finder(objectItems, { rules: [rule], initialFilters: { price: 5 } });
            expect(finder.filters.isActive(rule)).toEqual(true);
            expect(finder.filters.get(rule)).toEqual(5);
        });

        test("Set", () => {
            const rule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => item.price === value,
            });
            const finder = new Finder(objectItems, { rules: [rule] });

            // can be set to any value
            finder.filters.set(rule, 5);
            expect(finder.filters.isActive(rule)).toEqual(true);
            expect(finder.filters.get(rule)).toEqual(5);
        });

        test("Delete", () => {
            const rule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => item.price === value,
            });
            const finder = new Finder(objectItems, { rules: [rule], initialFilters: { price: 5 } });
            expect(finder.filters.isActive(rule)).toEqual(true);
            finder.filters.delete(rule);
            expect(finder.filters.isActive(rule)).toEqual(false);
            expect(finder.filters.get(rule)).toEqual(undefined);
        });

        test("Toggle", () => {
            const numericRule = filterRule<MockObjectItem, number>({
                id: "price",
                filterFn: (item, value) => item.price === value,
            });
            const booleanRule = filterRule<MockObjectItem>({
                id: "price_is_ten",
                filterFn: (item) => item.price === 10,
                isBoolean: true,
            });
            const finder = new Finder(objectItems, { rules: [numericRule, booleanRule], initialFilters: { price: 5 } });

            // cannot toggle non-boolean rules
            expect(() => {
                finder.filters.toggle(numericRule);
            }).toThrowError();

            expect(finder.filters.isActive(booleanRule)).toEqual(false);
            finder.filters.toggle(booleanRule);
            expect(finder.filters.isActive(booleanRule)).toEqual(true);
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

            const finder = new Finder(objectItems, { rules: [rule] });
            finder.filters.toggleOption(rule, 3);
            finder.filters.toggleOption(rule, 5);
            expect(finder.filters.get(rule)).toEqual([3, 5]);
            expect(finder.filters.has(rule, 3)).toEqual(true);
            expect(finder.filters.has(rule, optionThree)).toEqual(true);

            finder.filters.toggleOption(rule, 3);
            finder.filters.toggleOption(rule, 5);
            expect(finder.filters.get(rule)).toEqual([]);
            expect(finder.filters.has(rule, 3)).toEqual(false);
            expect(finder.filters.has(rule, optionThree)).toEqual(false);
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
            const finder = new Finder(objectItems, { rules: [rule] });
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

            const finder = new Finder(objectItems, { rules: [rule] });
            const hydratedRule = finder.filters.getRule(rule);
            expect(hydratedRule.options?.length).toBe(2);
        });

        test("Receives meta", () => {
            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "price_is_below",
                    filterFn: (item, value) => item.price <= value,
                    options: ({ meta }) => {
                        expect(meta.get("user_dislikes")).toBe(apple);
                        return [
                            {
                                label: "label",
                                value: "value",
                            },
                        ];
                    },
                }),
            ]);

            const initialMeta = {
                user_dislikes: apple,
            };
            const finder = new Finder(objectItems, { rules, initialMeta });
            finder.meta.set("user_dislikes", apple);
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

            const finder = new Finder([apple], { rules });
            finder.setItems(objectItems);
            expect(hydrateOptions).toHaveBeenCalledTimes(2);
        });

        test("Recalculates on meta change", () => {
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

            const finder = new Finder(objectItems, { rules });
            finder.meta.set("user_dislikes", orange);
            expect(hydrateOptions).toHaveBeenCalledTimes(2);
        });
    });

    describe("Matcher", () => {
        test("Boolean filter", () => {
            const rule = filterRule<MockObjectItem>({
                id: "price",
                filterFn: (item) => item.price === 10,
                isBoolean: true,
            });

            const finder = new Finder(objectItems, { rules: [rule] });

            // does not affect results if unset
            expect(finder.matches.items).toStrictEqual([apple, orange, banana]);

            // sets results
            finder.filters.set(rule, true);
            expect(finder.matches.items).toStrictEqual([banana]);
        });

        test("Scalar filter", () => {
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
            const finder = new Finder(objectItems, { rules, initialFilters });
            expect(finder.matches.items).toStrictEqual([apple, orange]);
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
            const finder = new Finder(objectItems, { rules, initialFilters });
            expect(finder.matches.items).toStrictEqual([apple]);
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
            const finder = new Finder(objectItems, { rules });
            expect(finder.matches.items).toStrictEqual([apple, orange, banana]);
        });

        test("Return empty array when no matches are found", () => {
            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "tastiest_fruit_name",
                    filterFn: (item, value: string) => item.name === value,
                }),
            ]);

            const finder = new Finder(objectItems, { rules });
            finder.filters.set("tastiest_fruit_name", "guava");
            expect(finder.matches.items).toStrictEqual([]);
        });

        describe("Required", () => {
            test("Required filters are active by default", () => {
                const rule = filterRule<MockObjectItem>({
                    id: "price",
                    filterFn: (item) => item.price === 10,
                    isBoolean: true,
                    required: true,
                });
                const finder = new Finder(objectItems, { rules: [rule] });
                expect(finder.filters.get(rule)).toBe(true);
                expect(finder.matches.items).toStrictEqual([banana]);
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

                const finder = new Finder(objectItems, { rules });
                expect(finder.matches.items).toStrictEqual([apple]);
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

                const finder = new Finder(objectItems, { rules });
                expect(finder.matches.items).toStrictEqual([banana]);
            });
        });
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

    describe("Tester", () => {
        test("Rules can be tested in advance", () => {
            const rule = filterRule({
                id: "price_is_below",
                filterFn: (item: MockObjectItem, value: number) => item.price <= value,
            });

            const finder = new Finder(objectItems, { rules: [rule] });

            // test a filter without setting the state
            const testResult = finder.filters.testRule({ rule, value: 5 });
            expect(testResult).toStrictEqual([apple, orange]);
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

            const finder = new Finder(objectItems, { rules: [firstRule, secondRule] });

            // test a filter without setting the state
            const testResult = finder.filters.testRule({ rule: secondRule, value: true, isAdditive: true });
            expect(testResult).toStrictEqual([apple]);
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
});
