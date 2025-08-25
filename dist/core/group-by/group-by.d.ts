import { GroupByRule, FinderResultGroup, SortDirection, InjectedContext } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialGroupBy: string | undefined;
    requireGroup: boolean;
};
declare class GroupByMixin<FItem> {
    #private;
    requireGroup: boolean;
    groupIdSortDirection?: SortDirection;
    constructor({ initialGroupBy, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rules(): GroupByRule<unknown>[];
    get activeRule(): GroupByRule<unknown> | undefined;
    set(identifier?: GroupByRule | string): void;
    setGroupIdSortDirection(direction?: SortDirection): void;
    toggle(identifier: GroupByRule | string): void;
    reset(): void;
    process(items: FItem[], context?: InjectedContext): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
