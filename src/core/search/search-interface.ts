import { SearchMixin } from "./search";

/*
 * Public surface for the Search mixin
 */
function readonlySearchInterface<FItem>(mixin: SearchMixin<FItem>) {
    return {
        searchTerm: mixin.searchTerm,
        hasSearchTerm: mixin.hasSearchTerm,
        hasSearchRule: mixin.hasSearchRule,
    };
}

function searchInterface<FItem>(mixin: SearchMixin<FItem>) {
    return {
        ...readonlySearchInterface(mixin),
        setSearchTerm: mixin.setSearchTerm.bind(mixin),
        reset: mixin.reset.bind(mixin),
    };
}

export { readonlySearchInterface, searchInterface };
