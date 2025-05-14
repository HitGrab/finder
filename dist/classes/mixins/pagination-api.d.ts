import { PaginationMixin } from "./pagination";
/**
 * Public surface for the pagination mixin
 */
declare function paginationAPI<FItem>(mixin: PaginationMixin<FItem>): {
    page: number | undefined;
    numItemsPerPage: number | undefined;
    numTotalItems: number;
    lastPage: number | undefined;
    isPaginated: boolean;
    setPage: (value?: number) => void;
    setNumItemsPerPage: (value?: number) => void;
};
export { paginationAPI };
