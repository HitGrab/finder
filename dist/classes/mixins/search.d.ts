import { FinderInjectedHandlers, FinderMeta } from "../../types";
declare class SearchMixin<FItem> {
    #private;
    constructor(initialSearchTerm: string | undefined, handlers: FinderInjectedHandlers<FItem>);
    get searchTerm(): string;
    get rule(): import("../../types").FinderSearchRule<unknown> | undefined;
    get hasSearchRule(): boolean;
    setSearchTerm(incomingSearchTerm: string): void;
    process(items: FItem[], meta?: FinderMeta): FItem[];
}
export { SearchMixin };
