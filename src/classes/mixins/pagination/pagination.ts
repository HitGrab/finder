import { clamp } from "lodash";
import { FinderInjectedHandlers } from "../../../types";

class PaginationMixin<FItem> {
    #page: number;
    #numDisplayedItems: number;

    numItemsPerPage?: number;

    #handlers: FinderInjectedHandlers<FItem>;

    constructor(page: number | undefined, numItemsPerPage: number | undefined, handlers: FinderInjectedHandlers<FItem>) {
        this.#page = page ?? 1;
        this.numItemsPerPage = numItemsPerPage;
        this.#handlers = handlers;
        this.#numDisplayedItems = handlers.getItems().length;
    }

    setPage(value: number) {
        if (value !== this.#page) {
            this.#page = value;
            this.#handlers.onChange({ page: this.#page });
        }
    }

    setNumItemsPerPage(value?: number) {
        if (value !== this.numItemsPerPage) {
            this.numItemsPerPage = value;
            this.#handlers.onChange({ numItemsPerPage: this.numItemsPerPage });
        }
    }

    get lastPage() {
        if (this.#page === undefined || this.numItemsPerPage === undefined) {
            return undefined;
        }

        return Math.ceil(this.#numDisplayedItems / this.numItemsPerPage);
    }

    get numTotalItems() {
        return this.#handlers.getItems().length;
    }

    get page() {
        if (this.numItemsPerPage && this.lastPage) {
            return clamp(this.#page, 1, this.lastPage);
        }
        return this.#page;
    }

    get offset() {
        if (this.numItemsPerPage && this.lastPage) {
            const clampedPage = clamp(this.#page, 1, this.lastPage);
            return (clampedPage - 1) * this.numItemsPerPage;
        }

        return 0;
    }

    process(items: FItem[], numMatchedItems: number) {
        if (this.numItemsPerPage === undefined) {
            return items;
        }

        let page = this.#page ?? 1;

        this.#numDisplayedItems = numMatchedItems;

        const lastPage = Math.ceil(numMatchedItems / this.numItemsPerPage);
        const clampedPage = clamp(page, 1, lastPage);
        const offset = (clampedPage - 1) * this.numItemsPerPage;
        return items.slice(offset, offset + this.numItemsPerPage);
    }
}

export { PaginationMixin };
