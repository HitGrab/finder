import { SortByRule } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedSortByMixin, SortDirection } from "./types/core-types";
interface InitialValues {
    initialSortBy: string | undefined;
    initialSortDirection?: SortDirection;
}
declare class SortByMixin<FItem> {
    #private;
    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    getRule(identifier: string | SortByRule): SortByRule<unknown, any>;
    get rules(): SortByRule<unknown, any>[];
    get activeRule(): SortByRule<unknown, any> | undefined;
    get sortDirection(): SortDirection;
    get userHasSetSortDirection(): boolean;
    setSortDirection(incomingSortDirection?: SortDirection): void;
    cycleSortDirection(): void;
    toggleSortDirection(): void;
    set(identifier?: string | SortByRule, incomingSortDirection?: SortDirection): void;
    reset(): void;
    serialize(): SerializedSortByMixin;
    static process<FItem>(options: SerializedSortByMixin, items: FItem[], context: unknown): FItem[];
}
export { SortByMixin };
