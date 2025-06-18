import { SortByRule, SortDirection } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialSortBy: string | undefined;
    initialSortDirection?: SortDirection;
};
declare class SortByMixin<FItem> {
    #private;
    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rules(): SortByRule<unknown>[];
    get activeRule(): SortByRule<unknown> | undefined;
    get sortDirection(): SortDirection;
    get userHasSetSortDirection(): boolean;
    setSortDirection(incomingSortDirection?: SortDirection): void;
    set(identifier?: string | SortByRule, incomingSortDirection?: SortDirection): void;
    process(items: FItem[]): FItem[];
}
export { SortByMixin };
