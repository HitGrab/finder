import { FinderCore } from "../finder-core";
import { filterRule, finderRuleset, ruleEffect, searchRule, sortByRule } from "../utils/rule-type-enforcers";
import { objectItems } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("Hooks", () => {
    test("Toggles filters", () => {
        const rules = finderRuleset<MockObjectItem>([
            filterRule({
                id: "orange",
                filterFn: (item) => item.type === "orange",
                isBoolean: true,
            }),
            filterRule({
                id: "apple",
                filterFn: (item) => item.type === "apple",
                isBoolean: true,
                defaultValue: true,
            }),
        ]);
        const effects = [
            ruleEffect(["orange", "apple"], (instance) => {
                if (instance.filters.get("orange") === true) {
                    instance.filters.toggle("apple");
                }
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, effects });
        finder.filters.set("orange", true);
        expect(finder.filters.raw).toStrictEqual({ orange: true, apple: false });
    });

    test("Toggles sort", () => {
        const search = searchRule<MockObjectItem>({
            id: "search",
            searchFn: (item) => item.name,
        });
        const rules = finderRuleset<MockObjectItem>([
            search,
            filterRule({
                id: "orange",
                filterFn: (item) => item.type === "orange",
                isBoolean: true,
            }),
            filterRule({
                id: "apple",
                filterFn: (item) => item.type === "apple",
                isBoolean: true,
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
                }
            }),
            ruleEffect(search, (instance) => {
                console.log(instance.search.searchTerm);
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, effects, initialSortBy: "sort_expiry_date" });
        finder.filters.set("orange", true);
        finder.search.setSearchTerm("bob");
        expect(finder.sortBy.activeRule?.id).toBe("sort_name");
    });
});
