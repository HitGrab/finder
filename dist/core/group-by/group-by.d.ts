import { GroupByRule } from "../types/rule-types";
import { FinderResultGroup, MixinInjectedDependencies, SerializedGroupByMixin, SortDirection } from "../types/core-types";
interface InitialValues {
    initialGroupBy: string | undefined;
    requireGroup: boolean;
}
declare class GroupByMixin<FItem, FContext> {
    #private;
    requireGroup: boolean;
    groupIdSortDirection?: SortDirection;
    constructor({ initialGroupBy, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem, FContext>);
    get rules(): GroupByRule<unknown, any>[];
    get activeRule(): GroupByRule<unknown, any> | undefined;
    get hasGroupByRule(): boolean;
    set(identifier?: string | GroupByRule): void;
    setGroupIdSortDirection(direction?: SortDirection): void;
    toggle(identifier: GroupByRule | string): void;
    reset(): void;
    serialize(): SerializedGroupByMixin;
    static process<FItem, FContext>(options: SerializedGroupByMixin, items: FItem[], context?: FContext): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
