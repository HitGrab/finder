import { SortByRule } from "../types/rule-types";
import { MixinInjectedDependencies, SortDirection } from "../types/core-types";
type InitialValues = {
    initialSortBy: string | undefined;
    initialSortDirection?: SortDirection;
};
declare class SortByMixin<FItem> {
    #private;
    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rules(): SortByRule<unknown, any>[];
    get activeRule(): SortByRule<unknown, any> | undefined;
    get sortDirection(): SortDirection;
    get userHasSetSortDirection(): boolean;
    setSortDirection(incomingSortDirection?: SortDirection): void;
    set(identifier?: string | SortByRule, incomingSortDirection?: SortDirection): void;
    process(items: FItem[]): FItem[];
}
export { SortByMixin };
