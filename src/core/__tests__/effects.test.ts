import { FinderCore } from "../finder-core";
import { filterRule, finderRuleset, ruleEffect, searchRule, sortByRule } from "../utils/rule-type-guards";
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
            expect(ruleEffectFn).toHaveBeenCalledTimes(0);
            finder.filters.set("orange", true);
            expect(ruleEffectFn).toHaveBeenCalledTimes(1);
            expect(finder.filters.raw).toEqual({ orange: true });
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
            expect(ruleEffectFn).toHaveBeenCalledTimes(0);
            finder.filters.set("orange", true);
            expect(ruleEffectFn).toHaveBeenCalledTimes(1);
            expect(finder.sortBy.activeRule?.id).toBe("sort_name");
        });
    });
});
