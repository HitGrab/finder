import { SortByRule, FinderInjectedHandlers, HydratedSortByRule } from "../../types";
declare class SortByMixin<FItem> {
    #private;
    sortDirection?: string;
    constructor(initialSortby: string | undefined, initialSortDirection: "asc" | "desc" | undefined, handlers: FinderInjectedHandlers<FItem>);
    get rules(): HydratedSortByRule<unknown, any>[];
    get activeRule(): HydratedSortByRule<any, any> | undefined;
    setSortDirection(incomingSortDirection?: string): void;
    set(identifier?: string | SortByRule | HydratedSortByRule, incomingSortDirection?: string): void;
    process(items: FItem[]): FItem[];
}
export { SortByMixin };
