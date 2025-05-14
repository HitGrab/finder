import { FinderInjectedHandlers } from "../../types";

class PaginationMixin<FItem> {
    page?: number;

    numItemsPerPage?: number;

    #handlers: FinderInjectedHandlers<FItem>;

    constructor(page: number | undefined, numItemsPerPage: number | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.page = page;
        this.numItemsPerPage = numItemsPerPage;
        this.#handlers = handlers;
    }

    setPage(value?: number) {
        if (value !== this.page) {
            this.page = value;
            this.#handlers.onChange({ page: this.page });
        }
    }

    setNumItemsPerPage(value?: number) {
        if (value !== this.numItemsPerPage) {
            this.numItemsPerPage = value;
            this.#handlers.onChange({ numItemsPerPage: this.numItemsPerPage });
        }
    }

    get lastPage() {
        if (this.page === undefined || this.numItemsPerPage === undefined) {
            return undefined;
        }

        const numTotalItems = this.#handlers.getItems().length;
        return Math.ceil(numTotalItems / this.numItemsPerPage);
    }

    get numTotalItems() {
        return this.#handlers.getItems().length;
    }

    process(items: FItem[]) {
        if (this.page === undefined || this.numItemsPerPage === undefined) {
            return items;
        }

        const lastPage = Math.ceil(items.length / this.numItemsPerPage);
        const clampedPage = this.page > lastPage ? lastPage : this.page;
        const offset = (clampedPage - 1) * this.numItemsPerPage;
        return items.slice(offset, offset + this.numItemsPerPage);
    }
}

export { PaginationMixin };
