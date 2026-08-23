import { range } from "lodash";
import { FinderCore } from "../finder-core";
import { filterRule, sortByRule } from "../utils/rule-type-guards";
import { objectItems, banana, orange, apple } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("Pagination", () => {
    test("Items are paginated", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
            }),
        ];
        const initialSortDirection = "desc";

        // first page
        const page = 1;
        const numItemsPerPage = 1;
        const finder = new FinderCore(objectItems, { rules, initialSortDirection, page, numItemsPerPage });

        expect(finder.matches.items).toEqual([banana]);

        // next page
        finder.pagination.setPage(2);
        expect(finder.matches.items).toEqual([orange]);

        // last page
        finder.pagination.setPage(3);
        expect(finder.matches.items).toEqual([apple]);
    });

    test("Sort triggers reset", () => {
        const rules = [
            sortByRule({
                id: "sort_by_price",
                sortFn: (item: MockObjectItem) => item.price,
                defaultSortDirection: "desc",
            }),
            sortByRule({
                id: "sort_by_expiry",
                sortFn: (item: MockObjectItem) => item.daysUntilExpiryDate,
            }),
        ];

        // first page
        const page = 1;
        const numItemsPerPage = 1;
        const finder = new FinderCore(objectItems, { rules, page, numItemsPerPage });

        finder.pagination.setPage(2);
        expect(finder.matches.items).toEqual([orange]);

        finder.sortBy.set("sort_by_expiry");
        expect(finder.pagination.page).toEqual(1);
        expect(finder.matches.items).toEqual([orange]);

        finder.pagination.setPage(2);
        finder.sortBy.toggleSortDirection();
        expect(finder.pagination.page).toEqual(1);
        expect(finder.matches.items).toEqual([apple]);
    });

    test("Counts are correct", () => {
        const items = range(300);
        const rule = filterRule({
            id: "even_only",
            filterFn: (item: number) => item % 2 === 0,
            boolean: true,
            defaultValue: true,
        });
        const finder = new FinderCore(items, { rules: [rule], page: 10, numItemsPerPage: 10 });
        expect(finder.matches.items).toEqual([180, 182, 184, 186, 188, 190, 192, 194, 196, 198]);
        expect(finder.matches.numMatchedItems).toBe(150);
        expect(finder.matches.numTotalItems).toBe(300);
    });
});
