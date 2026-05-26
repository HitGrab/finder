import { WARNINGS } from "../core-constants";
import { FinderCore } from "../finder-core";
import { finderRuleset, sortByRule } from "../utils/rule-type-guards";
import { objectItems, apple, orange, banana } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("SortBy", () => {
    test("Asc", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        expect(finder.matches.items).toEqual([apple, orange, banana]);
    });

    test("Desc", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const initialSortDirection = "desc";

        const finder = new FinderCore(objectItems, { rules, initialSortDirection });
        expect(finder.matches.items).toEqual([banana, orange, apple]);
    });

    test("Toggle", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
            sortByRule({
                id: "sort_by_expiry",
                sortFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        expect(finder.sortBy.activeRule?.id).toBe("sort_by_price");

        finder.sortBy.toggle("sort_by_expiry");
        expect(finder.sortBy.activeRule?.id).toBe("sort_by_expiry");
        expect(finder.sortBy.sortDirection).toBe("asc");

        finder.sortBy.toggle("sort_by_expiry");
        expect(finder.sortBy.activeRule?.id).toBe("sort_by_expiry");
        expect(finder.sortBy.sortDirection).toBe("desc");
    });

    test("Cycles", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        finder.sortBy.cycleSortDirection();
        expect(finder.sortBy.sortDirection).toEqual("desc");
    });

    test("sortFn Array", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: [(item: MockObjectItem) => item.daysUntilExpiryDate, (item: MockObjectItem) => item.price],
            }),
        ];

        const finder = new FinderCore(objectItems, { rules });
        expect(finder.matches.items).toEqual([orange, banana, apple]);
    });

    test("Ignores invalid initialSortBy", () => {
        const rules = finderRuleset([]);

        const consoleMock = vi.spyOn(console, "warn").mockImplementation(() => undefined);

        new FinderCore(objectItems, { rules, initialSortBy: "sort_by_price" });

        expect(consoleMock).toHaveBeenLastCalledWith(WARNINGS.INITIAL_RULE_NOT_FOUND, { initialSortBy: "sort_by_price" });
        consoleMock.mockReset();
    });
});
