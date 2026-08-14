import { FinderCore } from "../finder-core";
import { filterRule, finderRuleset } from "../utils/rule-type-guards";
import { objectItems } from "./test-constants";
import { MockObjectItem } from "./test-types";

describe("RuleBook", () => {
    test("List rules", () => {
        const singleValueFilter = filterRule<MockObjectItem, number>({
            id: "price_is_below",
            filterFn: (item, value) => item.price <= value,
            defaultValue: 3,
        });
        const multipleFilter = filterRule<MockObjectItem, number>({
            id: "price_is_above",
            filterFn: (item, value) => item.price > value,
            multiple: true,
            options: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
            defaultValue: [1, 2],
        });
        const booleanFilter = filterRule<MockObjectItem>({
            id: "expires_in_five_days",
            filterFn: (item) => item.daysUntilExpiryDate === "five",
            boolean: true,
            defaultValue: true,
        });

        const rules = finderRuleset<MockObjectItem>([singleValueFilter, multipleFilter, booleanFilter]);
        const finder = new FinderCore(objectItems, { rules });

        const hydratedRule = finder.filters.getRule(singleValueFilter);

        expect(finder.ruleBook.has("price_is_below")).toBe(true);
        expect(finder.ruleBook.has(singleValueFilter)).toBe(true);
        expect(finder.ruleBook.get("price_is_below")).toEqual(hydratedRule);

        expect(finder.ruleBook.has("imaginary_rule")).toBe(false);
        expect(finder.ruleBook.get("imaginary_rule")).toBe(undefined);
    });
});
