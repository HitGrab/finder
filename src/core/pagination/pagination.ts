import { MixinInjectedDependencies } from "../types/core-types";
import { clamp } from "../utils/finder-utils";

type InitialValues = {
    page: number | undefined;
    numItemsPerPage: number | undefined;
};
class PaginationMixin<FItem> {
    #page: number;

    #numDisplayedItems: number;

    numItemsPerPage?: number;

    #deps;

    constructor({ page, numItemsPerPage }: InitialValues, handlers: MixinInjectedDependencies<FItem>) {
        this.#page = page ?? 1;
        this.numItemsPerPage = numItemsPerPage;
        this.#deps = handlers;
        this.#numDisplayedItems = handlers.getItems().length;
    }

    setPage(value: number) {
        if (value !== this.#page) {
            const previousPage = this.#page;
            this.#page = value;
            this.#deps.touch({
                source: "pagination",
                event: "change.pagination.setPage",
                current: { page: this.#page },
                initial: { page: previousPage },
            });
        }
    }

    setNumItemsPerPage(value?: number) {
        if (value !== this.numItemsPerPage) {
            const previousValue = this.numItemsPerPage;
            this.numItemsPerPage = value;

            this.#deps.touch({
                source: "pagination",
                event: "change.pagination.setNumItemsPerPage",
                current: { numItemsPerPage: this.numItemsPerPage },
                initial: { numItemsPerPage: previousValue },
            });
        }
    }

    get lastPage() {
        if (this.#page === undefined || this.numItemsPerPage === undefined) {
            return undefined;
        }

        return Math.ceil(this.#numDisplayedItems / this.numItemsPerPage);
    }

    get numTotalItems() {
        return this.#deps.getItems().length;
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

    process(items: FItem[]) {
        if (this.numItemsPerPage === undefined) {
            return items;
        }

        let page = this.#page ?? 1;

        this.#numDisplayedItems = items.length;

        const lastPage = Math.ceil(items.length / this.numItemsPerPage);
        const clampedPage = clamp(page, 1, lastPage);
        const offset = (clampedPage - 1) * this.numItemsPerPage;
        return items.slice(offset, offset + this.numItemsPerPage);
    }
}

export { PaginationMixin };
