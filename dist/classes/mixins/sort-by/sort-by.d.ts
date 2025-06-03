import { SortByRule, FinderInjectedHandlers } from "../../../types";
declare class SortByMixin<FItem> {
    #private;
    sortDirection?: string;
    constructor(initialSortBy: string | undefined, initialSortDirection: "asc" | "desc" | undefined, handlers: FinderInjectedHandlers<FItem>);
    get rules(): SortByRule<unknown>[];
    get activeRule(): SortByRule<unknown> | undefined;
    setSortDirection(incomingSortDirection?: string): void;
    set(identifier?: string | SortByRule, incomingSortDirection?: string): void;
    process(items: FItem[]): FItem[];
}
export { SortByMixin };
