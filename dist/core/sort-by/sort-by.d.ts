import { SortByRule } from "../types/rule-types";
import { MixinInjectedDependencies, SerializedSortByMixin, SortDirection } from "../types/core-types";
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
    serialize(): SerializedSortByMixin;
    static process<FItem, FContext>(options: SerializedSortByMixin, items: FItem[], context: FContext): FItem[];
}
export { SortByMixin };
