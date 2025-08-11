import { act } from "react";
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
        expect(finder.matches.groups).toStrictEqual([
            { id: "three", items: [apple] },
            { id: "five", items: [orange, banana] },
        ]);
    });

    test("Groups sort order", () => {
        const rules = [
            groupByRule({
                id: "expiry_date",
                groupFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
                sortGroupIdFn: (group) => group.id,
            }),
        ];

        const finder = new FinderCore(objectItems, { rules, requireGroup: true });
        act(() => {
            finder.groupBy.setGroupIdSortDirection("asc");
        });

        expect(finder.matches.groups).toStrictEqual([
            { id: "five", items: [orange, banana] },
            { id: "three", items: [apple] },
        ]);

        act(() => {
            finder.groupBy.setGroupIdSortDirection("desc");
        });

        expect(finder.matches.groups).toStrictEqual([
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
        expect(finder.matches.groups).toStrictEqual([
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
        expect(finder.matches.groups).toStrictEqual([
            { id: "banana", items: [banana] },
            { id: "orange", items: [orange] },
            { id: "apple", items: [apple] },
        ]);
    });
});
