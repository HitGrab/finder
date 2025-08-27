import { MixinInjectedDependencies } from "../types/internal-types";
type InitialValues = {
    initialSearchTerm: string | undefined;
};
declare class SearchMixin<FItem, FContext = any> {
    #private;
    searchTerm: string;
    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rule(): import("../..").SearchRule<unknown, any> | undefined;
    get hasSearchRule(): boolean;
    get hasSearchTerm(): boolean;
    setSearchTerm(incomingSearchTerm: string): void;
    reset(): void;
    process(items: FItem[], context?: FContext): FItem[];
}
export { SearchMixin };
