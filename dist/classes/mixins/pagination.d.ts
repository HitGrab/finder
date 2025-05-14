import { FinderInjectedHandlers } from "../../types";
declare class PaginationMixin<FItem> {
    #private;
    page?: number;
    numItemsPerPage?: number;
    constructor(page: number | undefined, numItemsPerPage: number | undefined, handlers: FinderInjectedHandlers<FItem>);
    setPage(value?: number): void;
    setNumItemsPerPage(value?: number): void;
    get lastPage(): number | undefined;
    get numTotalItems(): number;
    process(items: FItem[]): FItem[];
}
export { PaginationMixin };
