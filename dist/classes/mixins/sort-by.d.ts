import { SortByRule, FinderSortDirection, FinderInjectedHandlers, FinderMeta } from "../../types";
declare class SortByMixin<FItem> {
    #private;
    sortDirection?: FinderSortDirection;
    constructor(initialSortby: string | undefined, initialSortDirection: FinderSortDirection | undefined, handlers: FinderInjectedHandlers<FItem>);
    get rules(): SortByRule<unknown>[];
    get activeRule(): SortByRule<unknown> | undefined;
    setSortDirection(incomingSortDirection: string | string[] | undefined): void;
    set(identifier: SortByRule | string | undefined, incomingSortDirection?: FinderSortDirection): void;
    process(items: FItem[], meta?: FinderMeta): FItem[];
}
export { SortByMixin };
