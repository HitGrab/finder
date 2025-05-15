import { GroupByRule, FinderInjectedHandlers, FinderResultGroup, FinderMeta } from "../../types";
declare class GroupByMixin<FItem> {
    #private;
    requireGroup: boolean;
    constructor(initialGroupBy: string | undefined, requireGroup: boolean, handlers: FinderInjectedHandlers<FItem>);
    get rules(): GroupByRule<unknown>[];
    get activeRule(): GroupByRule<unknown> | undefined;
    set(rule?: GroupByRule): void;
    process(items: FItem[], meta?: FinderMeta): FinderResultGroup<FItem>[];
}
export { GroupByMixin };
