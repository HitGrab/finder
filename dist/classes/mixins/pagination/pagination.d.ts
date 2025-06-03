import { FinderInjectedHandlers } from "../../../types";
declare class PaginationMixin<FItem> {
    #private;
    numItemsPerPage?: number;
    constructor(page: number | undefined, numItemsPerPage: number | undefined, handlers: FinderInjectedHandlers<FItem>);
    setPage(value: number): void;
    setNumItemsPerPage(value?: number): void;
    get lastPage(): number | undefined;
    get numTotalItems(): number;
    get page(): number;
    get offset(): number;
    process(items: FItem[], numMatchedItems: number): FItem[];
}
export { PaginationMixin };
