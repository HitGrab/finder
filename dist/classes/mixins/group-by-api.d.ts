import { GroupByRule } from "../../types";
import { GroupByMixin } from "./group-by";
/**
 * Public surface for the Group By mixin
 */
declare function groupByAPI<FItem>(mixin: GroupByMixin<FItem>): {
    activeRule: GroupByRule<unknown> | undefined;
    activeRuleId: string | undefined;
    requireGroup: boolean;
    rules: GroupByRule<unknown>[];
    set(identifier?: GroupByRule | string): void;
    toggle: (identifier: GroupByRule | string) => void;
    reset: () => void;
};
export { groupByAPI };
