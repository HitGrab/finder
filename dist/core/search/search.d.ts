import { MixinInjectedDependencies } from "../types/internal-types";
import { InjectedContext } from "../../types";
type InitialValues = {
    initialSearchTerm: string | undefined;
};
declare class SearchMixin<FItem> {
    #private;
    searchTerm: string;
    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rule(): import("../..").SearchRule<unknown> | undefined;
    get hasSearchRule(): boolean;
    get hasSearchTerm(): boolean;
    setSearchTerm(incomingSearchTerm: string): void;
    reset(): void;
    process(items: FItem[], context?: InjectedContext): FItem[];
}
export { SearchMixin };
