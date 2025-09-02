import { MixinInjectedDependencies, SerializedPaginationMixin } from "../types/core-types";
interface InitialValues {
    page: number | undefined;
    numItemsPerPage: number | undefined;
}
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
    serialize(): SerializedPaginationMixin;
    static process<FItem>(options: SerializedPaginationMixin, items: FItem[]): FItem[];
}
export { PaginationMixin };
