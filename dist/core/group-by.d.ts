import { GroupByRule } from "./types/rule-types";
import { FinderResultGroup, MixinInjectedDependencies, SerializedGroupByMixin, SortDirection } from "./types/core-types";
interface InitialValues {
    initialGroupBy: string | undefined;
    requireGroup: boolean;
}
declare class GroupByMixin<FItem, FContext> {
    #private;
    requireGroup: boolean;
    constructor({ initialGroupBy, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem, FContext>);
    getRule(identifier: string | GroupByRule): GroupByRule<unknown, any>;
    get rules(): GroupByRule<unknown, any>[];
    get activeRule(): GroupByRule<unknown, any> | undefined;
    get hasGroupByRule(): boolean;
    get groupSortDirection(): SortDirection | undefined;
    set(identifier?: string | GroupByRule): void;
    setGroupSortDirection(direction?: SortDirection): void;
    toggle(identifier: GroupByRule | string): void;
    reset(): void;
    serialize(): SerializedGroupByMixin;
    static process<FItem>(options: SerializedGroupByMixin, items: FItem[], context?: unknown): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
