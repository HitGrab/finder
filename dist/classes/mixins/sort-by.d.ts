import { FinderSortByRule, FinderSortDirection, FinderInjectedHandlers, FinderMeta } from "../../types";
declare class SortByMixin<FItem> {
    #private;
    sortDirection?: FinderSortDirection;
    constructor(initialSortby: string | undefined, initialSortDirection: FinderSortDirection | undefined, handlers: FinderInjectedHandlers<FItem>);
    get rules(): FinderSortByRule<unknown>[];
    get activeRule(): FinderSortByRule<unknown> | undefined;
    setSortDirection(incomingSortDirection: FinderSortDirection): void;
    set(identifier: FinderSortByRule | string | undefined, incomingSortDirection?: FinderSortDirection): void;
    process(items: FItem[], meta?: FinderMeta): FItem[];
}
export { SortByMixin };
