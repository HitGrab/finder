import { FinderCore } from "../finder-core";
import { sortByRule } from "../utils/rule-type-enforcers";
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
        let page = 1;
        const numItemsPerPage = 1;
        const finder = new FinderCore(objectItems, { rules, initialSortDirection, page, numItemsPerPage });

        expect(finder.matches.items).toStrictEqual([banana]);

        // next page
        finder.pagination.setPage(2);
        expect(finder.matches.items).toStrictEqual([orange]);

        // last page
        finder.pagination.setPage(3);
        expect(finder.matches.items).toStrictEqual([apple]);
    });
});
