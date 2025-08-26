import { range } from "lodash";
import { act } from "react";
import { FinderCore } from "../finder-core";
import { finderRuleset, searchRule, sortByRule } from "../utils/rule-type-enforcers";
import { objectItems, apple } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("Search", () => {
    test("Accessors and Mutators", () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
        });

        const finder = new FinderCore(objectItems, { rules: [rule] });
        expect(finder.search.activeRule).toBe(rule);

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
                haystackFn: (item: MockObjectItem) => item.type,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toStrictEqual([apple]);
    });

    test("Search ranks by closest match", () => {
        const items = ["apple", "barrel of apples", "many apples"];
        const rules = [
            searchRule({
                haystackFn: (item: string) => item,
            }),
        ];

        const finder = new FinderCore(items, { rules, initialSearchTerm: "many ap" });
        expect(finder.matches.items).toStrictEqual(["many apples"]);
    });

    test("Search can override Sort", () => {
        const items = ["apple", "barrel of apples", "many apples"];
        const rules = finderRuleset<string>([
            searchRule({
                haystackFn: (item) => item,
            }),
            sortByRule({
                id: "default",
                sortFn: (item) => item,
            }),
        ]);

        const finder = new FinderCore(items, { rules, ignoreSortByRulesWhileSearchRuleIsActive: true });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toStrictEqual(["apple", "many apples", "barrel of apples"]);
    });

    test("Debounced searches trigger only once", async () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
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

    test("Custom search function", () => {
        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toStrictEqual([apple]);
    });
});
