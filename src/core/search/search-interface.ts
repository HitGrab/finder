import { SearchMixin } from "./search";

/*
 * Public surface for the Search mixin
 */
function searchInterface<FItem>(mixin: SearchMixin<FItem>) {
    return {
        searchTerm: mixin.searchTerm,
        hasSearchTerm: mixin.hasSearchTerm,
        hasSearchRule: mixin.hasSearchRule,
        setSearchTerm: mixin.setSearchTerm.bind(mixin),
        reset: mixin.reset.bind(mixin),
        test: mixin.test.bind(mixin),
    };
}

export { searchInterface };
