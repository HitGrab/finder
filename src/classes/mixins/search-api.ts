import { SearchMixin } from "./search";

/*
 * Public surface for the Search mixin
 */
function searchAPI<FItem>(mixin: SearchMixin<FItem>) {
    return {
        searchTerm: mixin.searchTerm,
        activeRule: mixin.rule,
        hasSearchTerm: mixin.searchTerm !== "",
        setSearchTerm: mixin.setSearchTerm.bind(mixin),
        reset: () => mixin.setSearchTerm(""),
    };
}

export { searchAPI };
