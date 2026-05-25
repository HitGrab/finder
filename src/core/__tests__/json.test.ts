import { FinderCore } from "../finder-core";
import { FinderConstructorOptions } from "../types/core-types";
import { filterRule, finderRuleset, groupByRule, searchRule, sortByRule } from "../utils/rule-type-guards";
import { objectItems } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("toJSON", () => {
    test("Serializes", () => {
        const rules = finderRuleset<MockObjectItem>([
            searchRule({ searchFn: (item) => item.name }),
            filterRule({ id: "name_filter", filterFn: (item, value) => item.name === value }),
            sortByRule({ id: "sort_rule", sortFn: (item) => item.daysUntilExpiryDate }),
            groupByRule({ id: "group_rule", groupFn: (item) => item.daysUntilExpiryDate }),
        ]);
        const finder = new FinderCore(objectItems, { rules });
        expect(finder.toJSON()).toEqual({
            disabled: false,
            initialSearchTerm: "",
            initialFilters: {},
            page: 1,
            numItemsPerPage: undefined,
            resetPaginationOn: ["sortBy", "groupBy"],
            initialSortBy: "sort_rule",
            initialSortDirection: "asc",
            ignoreSortByRulesWhileSearchRuleIsActive: undefined,
            initialGroupBy: undefined,
            initialGroupBySortDirection: undefined,
            requireGroup: false,
        });

        finder.search.setSearchTerm("apple");
        finder.filters.set("name_filter", "apple");
        finder.groupBy.set("group_rule");
        finder.pagination.setPage(1);
        finder.pagination.setNumItemsPerPage(5);
        expect(finder.toJSON()).toStrictEqual({
            disabled: false,
            initialSearchTerm: "apple",
            initialFilters: { name_filter: "apple" },
            page: 1,
            numItemsPerPage: 5,
            resetPaginationOn: ["sortBy", "groupBy"],
            initialSortBy: "sort_rule",
            initialSortDirection: "asc",
            ignoreSortByRulesWhileSearchRuleIsActive: undefined,
            initialGroupBy: "group_rule",
            initialGroupBySortDirection: undefined,
            requireGroup: false,
        });
    });

    test("Deserializes", () => {
        const rules = finderRuleset<MockObjectItem>([
            searchRule({ searchFn: (item) => item.name }),
            filterRule({ id: "name_filter", filterFn: (item, value) => item.name === value }),
            sortByRule({ id: "sort_rule", sortFn: (item) => item.daysUntilExpiryDate }),
            groupByRule({ id: "group_rule", groupFn: (item) => item.daysUntilExpiryDate }),
        ]);
        const data: Omit<FinderConstructorOptions<any>, "rules"> = {
            disabled: false,
            initialSearchTerm: "apple",
            initialFilters: { name_filter: "apple" },
            page: 1,
            numItemsPerPage: 5,
            resetPaginationOn: ["sortBy", "groupBy"],
            initialSortBy: "sort_rule",
            initialSortDirection: "asc",
            ignoreSortByRulesWhileSearchRuleIsActive: undefined,
            initialGroupBy: "group_rule",
            initialGroupBySortDirection: undefined,
            requireGroup: false,
        };

        const finder = new FinderCore(objectItems, { rules, ...data });
        expect(finder.toJSON()).toStrictEqual(data);
    });
});
