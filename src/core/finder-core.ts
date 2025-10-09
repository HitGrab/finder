import { FinderCoreImplementation } from "./finder-core-implementation";
import { FinderConstructorOptions, SnapshotSerializedMixins } from "./types/core-types";
import { FinderRule } from "./types/rule-types";

/**
 * This thin wrapper around FinderCoreImplementation defines the mixin interfaces and hides private methods.
 */
class FinderCore<FItem = any, FContext = any> {
    #finder: FinderCoreImplementation<FItem, FContext>;

    constructor(items: FItem[] | null | undefined, options: FinderConstructorOptions<FItem>) {
        const getInstance = () => this;
        this.#finder = new FinderCoreImplementation(items, options, getInstance);
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
        const mixin = this.#finder.search;
        return {
            searchTerm: mixin.searchTerm,
            hasSearchTerm: mixin.hasSearchTerm,
            hasSearchRule: mixin.hasSearchRule,
            setSearchTerm: mixin.setSearchTerm.bind(mixin),
            reset: mixin.reset.bind(mixin),
            test: mixin.test.bind(mixin),
        };
    }

    get filters() {
        const mixin = this.#finder.filters;
        return {
            values: mixin.values,
            raw: mixin.raw,
            activeRules: mixin.activeRules,
            rules: mixin.rules,
            isActive: mixin.isRuleActive.bind(mixin),
            get: mixin.get.bind(mixin),
            add: mixin.add.bind(mixin),
            has: mixin.has.bind(mixin),
            getRule: mixin.getRule.bind(mixin),
            toggle: mixin.toggle.bind(mixin),
            set: mixin.set.bind(mixin),
            delete: mixin.delete.bind(mixin),
            test: mixin.test.bind(mixin),
            testRule: mixin.testRule.bind(mixin),
            testRuleOptions: mixin.testRuleOptions.bind(mixin),
        };
    }

    get sortBy() {
        const mixin = this.#finder.sortBy;
        return {
            activeRule: mixin.activeRule,
            sortDirection: mixin.sortDirection,
            userHasSetSortDirection: mixin.userHasSetSortDirection,
            rules: mixin.rules,
            set: mixin.set.bind(mixin),
            setSortDirection: mixin.setSortDirection.bind(mixin),
            cycleSortDirection: mixin.cycleSortDirection.bind(mixin),
            toggleSortDirection: mixin.toggleSortDirection.bind(mixin),
            reset: mixin.reset.bind(mixin),
        };
    }

    get groupBy() {
        const mixin = this.#finder.groupBy;
        return {
            activeRule: mixin.activeRule,
            requireGroup: mixin.requireGroup,
            rules: mixin.rules,
            groupSortDirection: mixin.groupSortDirection,
            set: mixin.set.bind(mixin),
            toggle: mixin.toggle.bind(mixin),
            setGroupSortDirection: mixin.setGroupSortDirection.bind(mixin),
            reset: mixin.reset.bind(mixin),
        };
    }

    get pagination() {
        const mixin = this.#finder.pagination;
        return {
            page: mixin.page,
            offset: mixin.offset,
            numItemsPerPage: mixin.numItemsPerPage,
            numTotalItems: mixin.numTotalItems,
            lastPage: mixin.lastPage,
            isPaginated: mixin.numItemsPerPage !== undefined,
            setPage: mixin.setPage.bind(mixin),
            setNumItemsPerPage: mixin.setNumItemsPerPage.bind(mixin),
        };
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

    setRules(definitions: FinderRule<FItem>[]) {
        return this.#finder.setRules(definitions);
    }

    setContext(context: FContext) {
        return this.#finder.setContext(context);
    }

    /**
     * Utils
     */

    test(mixins: SnapshotSerializedMixins, isAdditive = false) {
        return this.#finder.test(mixins, isAdditive);
    }

    getRule(identifier: string | FinderRule<FItem>) {
        return this.#finder.getRule(identifier);
    }
}

export { FinderCore };
