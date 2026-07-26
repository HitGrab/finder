import { FinderImplementation } from "./finder-implementation";
import { FinderConstructorOptions, SnapshotSerializedMixins } from "./types/core-types";
import { RuleDefinition } from "./types/rule-types";

/**
 * This thin wrapper around FinderCoreImplementation defines the mixin interfaces and hides private methods.
 */
class FinderCore<FItem = any, FContext = any> {
    #finder: FinderImplementation<FItem, FContext>;

    constructor(items: FItem[] | null | undefined, options: FinderConstructorOptions<FItem, FContext>) {
        const getInterfaceInstanceFn = () => this;
        this.#finder = new FinderImplementation(items, options, getInterfaceInstanceFn);
        this.#finder.initEvents();
    }

    get items() {
        return this.#finder.items;
    }

    get context() {
        return this.#finder.context;
    }

    get isReady() {
        return this.#finder.isReady;
    }

    get isEmpty() {
        return this.#finder.isEmpty;
    }

    get hasMatches() {
        return this.#finder.hasMatches;
    }

    get isLoading() {
        return this.#finder.isLoading;
    }

    get disabled() {
        return this.#finder.disabled;
    }

    get state() {
        return this.#finder.state;
    }

    get updatedAt() {
        return this.#finder.updatedAt;
    }

    get events() {
        return this.#finder.events;
    }

    /**
     * Mixin interfaces
     */
    get matches() {
        return this.#finder.matches;
    }

    get search() {
        return this.#finder.search.api;
    }

    get filters() {
        return this.#finder.filters.api;
    }

    get sortBy() {
        return this.#finder.sortBy.api;
    }

    get groupBy() {
        return this.#finder.groupBy.api;
    }

    get pagination() {
        return this.#finder.pagination.api;
    }

    /**
     * Mutators
     */

    setItems(items: FItem[] | null | undefined) {
        return this.#finder.setItems(items);
    }

    setIsLoading(value?: boolean) {
        return this.#finder.setIsLoading(value);
    }

    setIsDisabled(value?: boolean) {
        return this.#finder.setIsDisabled(value);
    }

    setRules(definitions?: RuleDefinition<FItem>[]) {
        return this.#finder.setRules(definitions);
    }

    setContext(context?: FContext) {
        return this.#finder.setContext(context);
    }

    /**
     * Utils
     */

    test(mixins: SnapshotSerializedMixins, isAdditive = false) {
        return this.#finder.test(mixins, isAdditive);
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
    getRule<T extends RuleDefinition<FItem>>(identifier: string | RuleDefinition<FItem>) {
        return this.#finder.getRule(identifier) as T | undefined;
    }

    toJSON() {
        return this.#finder.toJSON();
    }
}

export { FinderCore };
