import { range } from "lodash";
import { act } from "react";
import { FinderCore } from "../finder-core";
import { searchRule } from "../utils/rule-type-enforcers";
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

    test("Matcher", () => {
        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem, searchTerm: string) => item.type === searchTerm,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toStrictEqual([apple]);
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

    test("Simple Search", () => {
        const rules = [
            searchRule({
                haystackFn: (item: MockObjectItem) => [item.type],
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toStrictEqual([apple]);
    });
});
