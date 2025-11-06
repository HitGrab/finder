import { GroupByRuleDefinition } from "./types/rule-types";
import { FinderResultGroup, MixinInjectedDependencies, SerializedGroupByMixin, SortDirection } from "./types/core-types";
interface InitialValues {
    initialGroupBy: string | undefined;
    initialGroupBySortDirection?: SortDirection;
    requireGroup: boolean;
}
declare class GroupByMixin<FItem, FContext> {
    #private;
    requireGroup: boolean;
    constructor({ initialGroupBy, initialGroupBySortDirection, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem, FContext>);
    getRule(identifier: string | GroupByRuleDefinition): GroupByRuleDefinition<any, any>;
    get rules(): GroupByRuleDefinition<unknown, any>[];
    get activeRule(): GroupByRuleDefinition<unknown, any> | undefined;
    get hasGroupByRule(): boolean;
    get groupBySortDirection(): SortDirection | undefined;
    set(identifier?: string | GroupByRuleDefinition): void;
    setGroupSortDirection(direction?: SortDirection): void;
    toggle(identifier: GroupByRuleDefinition | string): void;
    reset(): void;
    serialize(): SerializedGroupByMixin;
    static process<FItem>(options: SerializedGroupByMixin, items: FItem[], context: unknown): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
