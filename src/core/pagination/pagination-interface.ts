import { PaginationMixin } from "./pagination";

/**
 * Public surface for the pagination mixin
 */
function readonlyPaginationInterface<FItem>(mixin: PaginationMixin<FItem>) {
    return {
        page: mixin.page,
        offset: mixin.offset,
        numItemsPerPage: mixin.numItemsPerPage,
        numTotalItems: mixin.numTotalItems,
        lastPage: mixin.lastPage,
        isPaginated: mixin.numItemsPerPage !== undefined,
    };
}

function paginationInterface<FItem>(mixin: PaginationMixin<FItem>) {
    return {
        ...readonlyPaginationInterface(mixin),
        setPage: mixin.setPage.bind(mixin),
        setNumItemsPerPage: mixin.setNumItemsPerPage.bind(mixin),
    };
}

export { readonlyPaginationInterface, paginationInterface };
