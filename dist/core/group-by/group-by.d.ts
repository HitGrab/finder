import { GroupByRule, FinderMeta, FinderResultGroup } from "../../types";
import { MixinInjectedDependencies } from "../types/core-types";
type InitialValues = {
    initialGroupBy: string | undefined;
    requireGroup: boolean;
};
declare class GroupByMixin<FItem> {
    #private;
    requireGroup: boolean;
    groupIdSortDirection?: string;
    constructor({ initialGroupBy, requireGroup }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rules(): GroupByRule<unknown>[];
    get activeRule(): GroupByRule<unknown> | undefined;
    set(identifier?: GroupByRule | string): void;
    setGroupIdSortDirection(direction?: string): void;
    process(items: FItem[], meta?: FinderMeta): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
