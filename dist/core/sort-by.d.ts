import { SortByRuleDefinition } from "./types/rule-types";
import { MixinInjectedDependencies, SerializedSortByMixin, SortDirection } from "./types/core-types";
interface InitialValues {
    initialSortBy: string | undefined;
    initialSortDirection?: SortDirection;
}
declare class SortByMixin<FItem> {
    #private;
    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    getRule(identifier: string | SortByRuleDefinition): SortByRuleDefinition<any, any>;
    get rules(): SortByRuleDefinition<unknown, any>[];
    get activeRule(): SortByRuleDefinition<unknown, any> | undefined;
    get sortDirection(): SortDirection;
    get userHasSetSortDirection(): boolean;
    setSortDirection(incomingSortDirection?: SortDirection): void;
    cycleSortDirection(): void;
    toggleSortDirection(): void;
    set(identifier?: string | SortByRuleDefinition, incomingSortDirection?: SortDirection): void;
    reset(): void;
    serialize(): SerializedSortByMixin;
    static process<FItem>(options: SerializedSortByMixin, items: FItem[], context: unknown): FItem[];
}
export { SortByMixin };
