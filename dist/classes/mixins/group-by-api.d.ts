import { FinderGroupByRule } from "../../types";
import { GroupByMixin } from "./group-by";
/**
 * Public surface for the Group By mixin
 */
declare function groupByAPI<FItem>(mixin: GroupByMixin<FItem>): {
    activeRule: FinderGroupByRule<unknown> | undefined;
    activeRuleId: string | undefined;
    requireGroup: boolean;
    rules: FinderGroupByRule<unknown>[];
    set(identifier?: FinderGroupByRule | string): void;
    toggle: (identifier: FinderGroupByRule | string) => void;
    reset: () => void;
};
export { groupByAPI };
