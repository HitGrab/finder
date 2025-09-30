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
