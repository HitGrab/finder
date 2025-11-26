import { FinderCore } from "../finder-core";
import { groupByRule } from "../utils/rule-type-enforcers";
import { objectItems, apple, orange, banana } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("GroupBy", () => {
    test("Groups items", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Items in multiple groups", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => [item.daysUntilExpiryDate, item.price],
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true });

        expect(finder.matches.groups).toEqual([
            { id: "1", items: [apple] },
            { id: "2", items: [orange] },
            { id: "10", items: [banana] },
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Groups sort order", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sortGroupFn: (group) => group.id,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true });

        finder.groupBy.setGroupSortDirection("asc");

        expect(finder.matches.groups).toEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);

        finder.groupBy.setGroupSortDirection("desc");

        expect(finder.matches.groups).toEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Groups sort order with context", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sortGroupFn: (group, context) => {
                    // "A" instead of a number to ensure the value is correctly sorted in a string comparison
                    return group.id === context ? "a" : group.id;
                },
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true, context: "five" });

        expect(finder.matches.groups).toEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);

        finder.setContext("three");

        expect(finder.matches.groups).toEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Groups sticky function", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sticky: (groups, context) => {
                    expect(groups).toEqual([
                        { id: "three", items: [apple] },
                        { id: "five", items: [orange, banana] },
                    ]);
                    expect(context).toBe("abc");
                    return {
                        header: ["five"],
                    };
                },
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true, context: "abc" });
        expect(finder.matches.groups).toEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);
    });

    test("Sticky headers", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sticky: { header: ["five"] },
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);
    });

    test("Sticky groups preserve order", () => {
        const rules = [
            groupByRule({
                id: "item_type",
                groupFn: (item: MockObjectItem) => item.type,
                sticky: { footer: ["orange", "apple"] },
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true });
        expect(finder.matches.groups).toEqual([
            { id: "banana", items: [banana] },
            { id: "orange", items: [orange] },
            { id: "apple", items: [apple] },
        ]);
    });
});
