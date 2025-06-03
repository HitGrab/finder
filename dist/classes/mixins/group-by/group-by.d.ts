import { GroupByRule, FinderInjectedHandlers, FinderMeta, FinderResultGroup } from "../../../types";
declare class GroupByMixin<FItem> {
    #private;
    requireGroup: boolean;
    groupIdSortDirection?: string;
    constructor(initialGroupBy: string | undefined, requireGroup: boolean, handlers: FinderInjectedHandlers<FItem>);
    get rules(): GroupByRule<unknown>[];
    get activeRule(): GroupByRule<unknown> | undefined;
    set(identifier?: GroupByRule | string): void;
    setGroupIdSortDirection(direction?: string): void;
    process(items: FItem[], meta?: FinderMeta): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
