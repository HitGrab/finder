import { SearchMixin } from "./search";

/*
 * Public surface for the Search mixin
 */
function searchAPI<FItem>(mixin: SearchMixin<FItem>) {
    return {
        searchTerm: mixin.searchTerm,
        hasSearchRule: mixin.hasSearchRule,
        setSearchTerm: mixin.setSearchTerm.bind(mixin),
    };
}

export { searchAPI };
