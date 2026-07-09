import { range } from "lodash";
import { FinderCore } from "../finder-core";
import { filterRule, finderRuleset, groupByRule, searchRule, sortByRule } from "../utils/rule-type-guards";
import { objectItems, apple, orange, banana } from "./test-constants";
import { MockObjectItem } from "./test-types";
import { WARNINGS } from "../core-constants";

describe("Search", () => {
    test("Default behaviour if no rule is set", () => {
        const finder = new FinderCore(objectItems, { rules: [] });
        expect(finder.search.hasSearchRule).toBe(false);
        expect(finder.search.rule).toBe(undefined);
        expect(finder.search.hasSearchTerm).toBe(false);
    });

    test("Rule accessors", () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem) => item.type,
        });
        const finder = new FinderCore(objectItems, { rules: [rule] });
        expect(finder.search.hasSearchRule).toBe(true);
        expect(finder.search.rule).toEqual(rule);
    });

    test("Search term mutators", () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem) => item.type,
        });

        const finder = new FinderCore(objectItems, { rules: [rule] });

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

    test("Search result", () => {
        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem) => item.type,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.search.setSearchTerm("apple");
        expect(finder.matches.items).toEqual([apple]);
    });

    test("initialSearchTerm", () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem) => item.type,
        });
        const finder = new FinderCore(objectItems, { rules: [rule], initialSearchTerm: "apple" });
        expect(finder.matches.items).toEqual([apple]);
    });

    test("Ignores invalid initialSearchTerm", () => {
        const rules = finderRuleset([]);

        const consoleMock = vi.spyOn(console, "warn").mockImplementation(() => undefined);

        new FinderCore(objectItems, { rules, initialSearchTerm: "not_a_real_term" });

        expect(consoleMock).toHaveBeenLastCalledWith(WARNINGS.INITIAL_SEARCH_RULE_NOT_FOUND, { initialSearchTerm: "not_a_real_term" });
        consoleMock.mockReset();
    });

    test("Search must be string", () => {
        const rule = searchRule({
            searchFn: (item: MockObjectItem) => item.type,
        });
        const finder = new FinderCore(objectItems, { rules: [rule] });
        // An initialSearchTerm cannot be set if no search rule is provided
        expect(() => {
            // @ts-expect-error - Testing, expected to fail.
            finder.search.setSearchTerm({ doomed: true });
        }).toThrow();

        expect(() => {
            // @ts-expect-error - Testing, expected to fail.
            finder.search.setSearchTerm(undefined);
        }).toThrow();
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

    test("Search can override Group", () => {
        const rules = finderRuleset<MockObjectItem>([
            searchRule({
                searchFn: (item) => item.name,
            }),
            groupByRule({
                id: "group",
                groupFn: (item) => item.daysUntilExpiryDate,
                sortGroupFn: (group) => group.id,
            }),
        ]);

        const finder = new FinderCore(objectItems, { rules, requireGroup: true, ignoreGroupByRulesWhileSearchRuleIsActive: true });
        expect(finder.matches.items).toBe(undefined);
        expect(finder.matches.groups).toEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);

        finder.search.setSearchTerm("apple");

        expect(finder.matches.items).toEqual([apple]);
        expect(finder.matches.groups).toBe(undefined);
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

        await new Promise((resolve) => setTimeout(resolve, Number(rule.debounceMilliseconds) + 5));

        // The onchange event should only have triggered once
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test("Test search", () => {
        const finderWithoutSearch = new FinderCore(objectItems, { rules: [] });

        // Finder will complain when a test is called without a matching search rule
        expect(() => {
            finderWithoutSearch.search.test("doomed");
        }).toThrow();

        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem) => item.type,
            }),
        ];

        const finderWithSearch = new FinderCore(objectItems, { rules });
        expect(finderWithSearch.search.test("ple")).toEqual([apple]);
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

    test("Suggests Filter rules", () => {
        const storeFilter = filterRule<MockObjectItem>({
            id: "filter_by_store",
            filterFn: () => true,
            options: [
                {
                    label: "Anna's Applesauce",
                    value: "applesauce",
                },
                { label: "Berndatte's Bakery", value: "bakery" },
            ],
        });

        const rules = [
            searchRule({
                searchFn: (item: MockObjectItem) => item.name,
                suggestFiltersFrom: [storeFilter, "filter_by_brand"],
            }),
            storeFilter,
            filterRule({
                id: "filter_by_brand",
                label: "Apple brands",
                filterFn: () => true,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.search.setSearchTerm("apple");
        expect(finder.search.suggestedFilters[0]?.rule.id).toBe(storeFilter.id);
        expect(finder.search.suggestedFilters[0]?.optionMatches).toEqual([
            {
                label: "Anna's Applesauce",
                value: "applesauce",
            },
        ]);
        expect(finder.search.suggestedFilters[1]?.rule.id).toBe("filter_by_brand");
        expect(finder.search.suggestedFilters[1]?.optionMatches).toBe(undefined);
    });
});
