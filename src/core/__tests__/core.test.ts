import { objectItems } from "./test-constants";
import { MockObjectItem } from "./test-types";
import { FinderOnChangeCallback } from "../../types";
import { Finder } from "../finder";
import { searchRule, filterRule } from "../utils/rule-type-enforcers";

describe("Core", () => {
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
            new Finder(objectItems, { rules });
        }).toThrowError();
    });

    test("Catches malformed rules", () => {
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

    describe("Events", () => {
        test("onInit", () => {
            const onInit = vitest.fn();
            new Finder(objectItems, { rules: [], onInit });
            expect(onInit).toHaveBeenCalledTimes(1);
        });

        describe("onReady", () => {
            test("Sync", () => {
                const onReady = vitest.fn();
                new Finder(objectItems, { rules: [], onReady });
                expect(onReady).toHaveBeenCalledTimes(1);
            });

            test("Async", () => {
                const onReady = vitest.fn();
                const finder = new Finder(null, { rules: [], onReady, isLoading: true });
                expect(onReady).toHaveBeenCalledTimes(0);
                finder.setItems(objectItems);
                expect(onReady).toHaveBeenCalledTimes(0);
                finder.setIsLoading(false);
                expect(onReady).toHaveBeenCalledTimes(1);
            });
        });

        test("onFirstUserInteraction", () => {
            const onFirstUserInteraction = vitest.fn();
            const rule = searchRule<MockObjectItem>({ searchFn: (item, value) => item.name === value });
            const finder = new Finder(objectItems, { rules: [rule], onFirstUserInteraction });
            finder.search.setSearchTerm("Test");
            expect(onFirstUserInteraction).toHaveBeenCalledTimes(1);
        });

        test("onChange", () => {
            const rules = [
                filterRule({
                    id: "price_is_below",
                    filterFn: (item: MockObjectItem, value: number) => {
                        return item.price <= value;
                    },
                }),
            ];
            const declarativeOnChange: FinderOnChangeCallback = (event) => {
                expect(event.current.rule.id).toStrictEqual("price_is_below");
                expect(event.current.value).toStrictEqual(5);
            };

            const imperativeOnChange = vitest.fn();

            const finder = new Finder(objectItems, { rules, onChange: declarativeOnChange });

            // broadest to narrowest event
            finder.events.on("change", imperativeOnChange);
            finder.events.on("change.filters", imperativeOnChange);
            finder.events.on("change.filters.set", imperativeOnChange);

            finder.filters.set("price_is_below", 5);

            expect(imperativeOnChange).toHaveBeenCalledTimes(3);
        });
    });
});
