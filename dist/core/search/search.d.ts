import { FinderMeta } from "../../types";
import { MixinInjectedDependencies } from "../types/core-types";
type InitialValues = {
    initialSearchTerm: string | undefined;
};
declare class SearchMixin<FItem> {
    #private;
    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get searchTerm(): string;
    get rule(): import("../..").SearchRule<unknown> | undefined;
    get hasSearchRule(): boolean;
    setSearchTerm(incomingSearchTerm: string): void;
    process(items: FItem[], meta?: FinderMeta): FItem[];
}
export { SearchMixin };
