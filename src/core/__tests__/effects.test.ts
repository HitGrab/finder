import { FinderCore } from "../finder-core";
import { filterRule, finderRuleset, ruleEffect, searchEffect, searchRule, sortByRule } from "../utils/rule-type-enforcers";
import { objectItems } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("Effects", () => {
    describe("Rule Effects", () => {
        test("Toggles filters", () => {
            const ruleEffectFn = vitest.fn();

            const rules = finderRuleset<MockObjectItem>([
                filterRule({
                    id: "orange",
                    filterFn: (item) => item.type === "orange",
                    boolean: true,
                }),
                filterRule({
                    id: "apple",
                    filterFn: (item) => item.type === "apple",
                    boolean: true,
                    defaultValue: true,
                }),
            ]);
            const effects = [
                ruleEffect(["orange", "apple"], (instance) => {
                    if (instance.filters.get("orange") === true) {
                        instance.filters.toggle("apple");
                        ruleEffectFn();
                    }
                }),
            ];

            const finder = new FinderCore(objectItems, { rules, effects });
            expect(ruleEffectFn).toBeCalledTimes(0);
            finder.filters.set("orange", true);
            expect(ruleEffectFn).toBeCalledTimes(1);
            expect(finder.filters.raw).toStrictEqual({ orange: true, apple: false });
        });

        test("Toggles sort", () => {
            const ruleEffectFn = vitest.fn();

            const rules = finderRuleset<MockObjectItem>([
                searchRule({
                    id: "search",
                    searchFn: (item) => item.name,
                }),
                filterRule({
                    id: "orange",
                    filterFn: (item) => item.type === "orange",
                    boolean: true,
                }),
                filterRule({
                    id: "apple",
                    filterFn: (item) => item.type === "apple",
                    boolean: true,
                    defaultValue: true,
                }),
                sortByRule({
                    id: "sort_name",
                    sortFn: (item) => item.name,
                }),
                sortByRule({
                    id: "sort_expiry_date",
                    sortFn: (item) => item.daysUntilExpiryDate,
                }),
            ]);
            const effects = [
                ruleEffect(["orange", "apple"], (instance) => {
                    if (instance.filters.get("orange") === true) {
                        instance.sortBy.set("sort_name");
                        ruleEffectFn();
                    }
                }),
            ];

            const finder = new FinderCore(objectItems, { rules, effects, initialSortBy: "sort_expiry_date" });
            expect(ruleEffectFn).toBeCalledTimes(0);
            finder.filters.set("orange", true);
            expect(ruleEffectFn).toBeCalledTimes(1);
            expect(finder.sortBy.activeRule?.id).toBe("sort_name");
        });
    });

    describe("Search Effects", () => {
        test("Catches search terms", () => {
            const searchEffectFn = vitest.fn();

            const rules = finderRuleset<MockObjectItem>([
                searchRule({
                    searchFn: (item) => item.name,
                }),
            ]);
            const effects = [
                searchEffect(["orange", "apple"], () => {
                    searchEffectFn();
                }),
            ];

            const finder = new FinderCore(objectItems, { rules, effects });
            expect(searchEffectFn).toBeCalledTimes(0);
            finder.search.setSearchTerm("orange");
            expect(searchEffectFn).toBeCalledTimes(1);

            finder.search.setSearchTerm("strawberry");
            expect(searchEffectFn).toBeCalledTimes(1);
        });
    });
});
