import { GroupByRule } from "../types/rule-types";
import { FinderResultGroup, MixinInjectedDependencies, SortDirection } from "../types/core-types";
type InitialValues = {
    initialGroupBy: string | undefined;
    requireGroup: boolean;
};
declare class GroupByMixin<FItem, FContext> {
    #private;
    requireGroup: boolean;
    groupIdSortDirection?: SortDirection;
    constructor({ initialGroupBy, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rules(): GroupByRule<unknown, any>[];
    get activeRule(): GroupByRule<unknown, any> | undefined;
    set(identifier?: string | GroupByRule): void;
    setGroupIdSortDirection(direction?: SortDirection): void;
    toggle(identifier: GroupByRule | string): void;
    reset(): void;
    process(items: FItem[], context?: FContext): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
