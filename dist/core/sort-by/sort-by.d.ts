import { SortByRule } from "../../types";
import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialSortBy: string | undefined;
    initialSortDirection: "asc" | "desc" | undefined;
};
declare class SortByMixin<FItem> {
    #private;
    constructor({ initialSortBy, initialSortDirection }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rules(): SortByRule<unknown>[];
    get activeRule(): SortByRule<unknown> | undefined;
    get sortDirection(): string;
    get userHasSetSortDirection(): boolean;
    setSortDirection(incomingSortDirection?: string): void;
    set(identifier?: string | SortByRule, incomingSortDirection?: string): void;
    process(items: FItem[]): FItem[];
}
export { SortByMixin };
