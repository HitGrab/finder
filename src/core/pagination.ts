import { clamp } from "lodash";
import { EVENT_SOURCE, EVENTS } from "./core-constants";
import { MixinInjectedDependencies, SerializedPaginationMixin } from "./types/core-types";

interface InitialValues {
    page: number | undefined;
    numItemsPerPage: number | undefined;
}

class PaginationMixin<FItem> {
    #page: number;

    numItemsPerPage?: number;

    #deps;

    constructor({ page, numItemsPerPage }: InitialValues, handlers: MixinInjectedDependencies<FItem>) {
        this.#page = page ?? 1;
        this.numItemsPerPage = numItemsPerPage;
        this.#deps = handlers;
    }

    setPage(value: number) {
        if (value !== this.#page) {
            const previousPage = this.#page;
            this.#page = value;
            this.#deps.touch({
                source: EVENT_SOURCE.PAGINATION,
                event: EVENTS.SET_PAGE,
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
                source: EVENT_SOURCE.PAGINATION,
                event: EVENTS.SET_NUM_ITEMS_PER_PAGE,
                current: { numItemsPerPage: this.numItemsPerPage },
                initial: { numItemsPerPage: previousValue },
            });
        }
    }

    get lastPage() {
        if (this.numItemsPerPage === undefined) {
            return undefined;
        }

        return Math.ceil(this.#deps.getItems().length / this.numItemsPerPage);
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

    serialize(): SerializedPaginationMixin {
        return {
            page: this.#page,
            numItemsPerPage: this.numItemsPerPage,
        };
    }

    static process<FItem>(options: SerializedPaginationMixin, items: FItem[]) {
        if (options.numItemsPerPage === undefined) {
            return items;
        }

        const lastPage = Math.ceil(items.length / options.numItemsPerPage);
        const clampedPage = clamp(options.page, 1, lastPage);
        const offset = (clampedPage - 1) * options.numItemsPerPage;
        return items.slice(offset, offset + options.numItemsPerPage);
    }
}

export { PaginationMixin };
