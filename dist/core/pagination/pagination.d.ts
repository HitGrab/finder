import { MixinInjectedDependencies } from "../types/core-types";
type InitialValues = {
    page: number | undefined;
    numItemsPerPage: number | undefined;
};
declare class PaginationMixin<FItem> {
    #private;
    numItemsPerPage?: number;
    constructor({ page, numItemsPerPage }: InitialValues, handlers: MixinInjectedDependencies<FItem>);
    setPage(value: number): void;
    setNumItemsPerPage(value?: number): void;
    get lastPage(): number | undefined;
    get numTotalItems(): number;
    get page(): number;
    get offset(): number;
    process(items: FItem[]): FItem[];
}
export { PaginationMixin };
