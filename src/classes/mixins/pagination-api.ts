import { PaginationMixin } from "./pagination";

/**
 * Public surface for the pagination mixin
 */
function paginationAPI<FItem>(mixin: PaginationMixin<FItem>) {
    return {
        page: mixin.page,
        numItemsPerPage: mixin.numItemsPerPage,
        numTotalItems: mixin.numTotalItems,
        lastPage: mixin.lastPage,
        isPaginated: mixin.page !== undefined && mixin.numItemsPerPage !== undefined,
        setPage: mixin.setPage.bind(mixin),
        setNumItemsPerPage: mixin.setNumItemsPerPage.bind(mixin),
    };
}

export { paginationAPI };
