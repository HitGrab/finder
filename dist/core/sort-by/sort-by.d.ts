import { SortByRule } from "../../types";
import { MixinInjectedDependencies } from "../types/core-types";
type InitialValues = {
    initialSortBy: string | undefined;
    initialSortDirection: "asc" | "desc" | undefined;
};
declare class SortByMixin<FItem> {
    #private;
    sortDirection?: string;
    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rules(): SortByRule<unknown>[];
    get activeRule(): SortByRule<unknown> | undefined;
    setSortDirection(incomingSortDirection?: string): void;
    set(identifier?: string | SortByRule, incomingSortDirection?: string): void;
    process(items: FItem[]): FItem[];
}
export { SortByMixin };
