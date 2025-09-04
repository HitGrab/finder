import { MixinInjectedDependencies, SerializedSearchMixin } from "../types/core-types";
type InitialValues = {
    initialSearchTerm: string | undefined;
};
declare class SearchMixin<FItem> {
    #private;
    searchTerm: string;
    constructor({ initialSearchTerm }: InitialValues, deps: MixinInjectedDependencies<FItem>);
    get rule(): import("../..").SearchRule<unknown, any> | undefined;
    get hasSearchRule(): boolean;
    get hasSearchTerm(): boolean;
    setSearchTerm(incomingSearchTerm: string): void;
    reset(): void;
    serialize(): SerializedSearchMixin;
    test(searchTerm: string, isAdditive?: boolean): FItem[];
    static process<FItem, FContext>(options: SerializedSearchMixin, items: FItem[], context?: FContext): FItem[];
}
export { SearchMixin };
