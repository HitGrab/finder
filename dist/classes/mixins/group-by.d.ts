import { FinderGroupByRule, FinderInjectedHandlers, FinderResultGroup, FinderMeta } from "../../types";
declare class GroupByMixin<FItem> {
    #private;
    requireGroup: boolean;
    constructor(initialGroupBy: string | undefined, requireGroup: boolean, handlers: FinderInjectedHandlers<FItem>);
    get rules(): FinderGroupByRule<unknown>[];
    get activeRule(): FinderGroupByRule<unknown> | undefined;
    set(rule?: FinderGroupByRule): void;
    process(items: FItem[], meta?: FinderMeta): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
