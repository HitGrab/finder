import { range } from "lodash";
import { act } from "react";
import { FinderCore } from "../finder-core";
import { finderRuleset, searchRule, sortByRule } from "../utils/rule-type-enforcers";
import { objectItems, apple } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("Search", () => {
    test("Accessors and Mutators", () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem) => item.type,
        });

        const finder = new FinderCore(objectItems, { rules: [rule] });
        expect(finder.search.hasSearchRule).toBe(true);

        // empty string by default
        expect(finder.search.searchTerm).toBe("");
        expect(finder.search.hasSearchTerm).toBe(false);

        finder.search.setSearchTerm("apple");

        expect(finder.search.searchTerm).toBe("apple");
        expect(finder.search.hasSearchTerm).toBe(true);

        finder.search.reset();

        // reset to empty string
        expect(finder.search.searchTerm).toBe("");
        expect(finder.search.hasSearchTerm).toBe(false);
    });

    test("Search", () => {
        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem) => item.type,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toEqual([apple]);
    });

    test("Search ranks by closest match", () => {
        const items = ["apple", "barrel of apples", "many apples"];
        const rules = [
            searchRule({
                searchFn: (item: string) => item,
            }),
        ];

        const finder = new FinderCore(items, { rules, initialSearchTerm: "many ap" });
        expect(finder.matches.items).toEqual(["many apples"]);
    });

    test("Search can override Sort", () => {
        const items = ["apple", "barrel of apples", "many apples"];
        const rules = finderRuleset<string>([
            searchRule({
                searchFn: (item) => item,
            }),
            sortByRule({
                id: "default",
                sortFn: (item) => item,
            }),
        ]);

        const finder = new FinderCore(items, { rules, ignoreSortByRulesWhileSearchRuleIsActive: true });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toEqual(["apple", "many apples", "barrel of apples"]);
    });

    test("Debounced searches trigger only once", async () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem) => item.type,
            debounceMilliseconds: 15,
        });

        const onChange = vitest.fn();
        const finder = new FinderCore(objectItems, { rules: [rule], onChange });

        // Set the search term value 1000 times
        range(0, 1000).forEach((value) => {
            finder.search.setSearchTerm(String(value));
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, Number(rule.debounceMilliseconds) + 5));
        });

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test("Test search", () => {
        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem) => item.type,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        expect(finder.search.test("ple")).toEqual([apple]);
    });

    test("Test quoted search", () => {
        const items = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Vestibulum nec dapibus urna.", "Proin ornare elit vitae egestas maximus."];
        const rules = [
            searchRule({
                searchFn: (item: string) => item,
            }),
        ];

        const finder = new FinderCore(items, { rules });

        // with subquery
        expect(finder.search.test('ipsum "amet"')).toEqual(["Lorem ipsum dolor sit amet, consectetur adipiscing elit."]);

        // without subquery
        expect(finder.search.test("ipsum ame c")).toEqual(["Lorem ipsum dolor sit amet, consectetur adipiscing elit."]);

        // with failed subquery
        expect(finder.search.test('ipsum "ame c"')).toEqual([]);
    });
});
