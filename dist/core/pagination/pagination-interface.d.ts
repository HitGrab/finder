import { PaginationMixin } from "./pagination";
/**
 * Public surface for the pagination mixin
 */
declare function readonlyPaginationInterface<FItem>(mixin: PaginationMixin<FItem>): {
    page: number;
    offset: number;
    numItemsPerPage: number | undefined;
    numTotalItems: number;
    lastPage: number | undefined;
    isPaginated: boolean;
};
declare function paginationInterface<FItem>(mixin: PaginationMixin<FItem>): {
    setPage: (value: number) => void;
    setNumItemsPerPage: (value?: number) => void;
    page: number;
    offset: number;
    numItemsPerPage: number | undefined;
    numTotalItems: number;
    lastPage: number | undefined;
    isPaginated: boolean;
};
export { readonlyPaginationInterface, paginationInterface };
