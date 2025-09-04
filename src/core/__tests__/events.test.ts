import { FinderCore } from "../finder-core";
import { FinderOnChangeCallback } from "../types/event-types";
import { searchRule, filterRule } from "../utils/rule-type-enforcers";
import { objectItems } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("Events", () => {
    test("onInit", () => {
        const onInit = vitest.fn();
        new FinderCore(objectItems, { rules: [], onInit });
        expect(onInit).toHaveBeenCalledTimes(1);
    });

    describe("onReady", () => {
        test("Sync", () => {
            const onReady = vitest.fn();
            new FinderCore(objectItems, { rules: [], onReady });
            expect(onReady).toHaveBeenCalledTimes(1);
        });

        test("Async", () => {
            const onReady = vitest.fn();
            const finder = new FinderCore(null, { rules: [], onReady, isLoading: true });
            expect(onReady).toHaveBeenCalledTimes(0);
            finder.setItems(objectItems);
            expect(onReady).toHaveBeenCalledTimes(0);
            finder.setIsLoading(false);
            expect(onReady).toHaveBeenCalledTimes(1);
        });
    });

    test("onFirstUserInteraction", () => {
        const onFirstUserInteraction = vitest.fn();
        const rule = searchRule<MockObjectItem>({ searchFn: (item) => item.name });
        const finder = new FinderCore(objectItems, { rules: [rule], onFirstUserInteraction });
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
            expect(event.rule?.id).toBe("price_is_below");
            expect(event.current).toBe(5);
        };

        const imperativeOnChange = vitest.fn();

        const finder = new FinderCore(objectItems, { rules, onChange: declarativeOnChange });

        // broadest to narrowest event
        finder.events.on("change", imperativeOnChange);
        finder.filters.set("price_is_below", 5);

        expect(imperativeOnChange).toHaveBeenCalledTimes(1);
    });
});
