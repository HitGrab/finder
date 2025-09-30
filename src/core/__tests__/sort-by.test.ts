import { FinderCore } from "../finder-core";
import { sortByRule } from "../utils/rule-type-enforcers";
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
});
