import { SearchMixin } from "./search";
declare function readonlySearchInterface<FItem>(mixin: SearchMixin<FItem>): {
    searchTerm: string;
    hasSearchTerm: boolean;
    hasSearchRule: boolean;
};
declare function searchInterface<FItem>(mixin: SearchMixin<FItem>): {
    setSearchTerm: (incomingSearchTerm: string) => void;
    reset: () => void;
    searchTerm: string;
    hasSearchTerm: boolean;
    hasSearchRule: boolean;
};
export { readonlySearchInterface, searchInterface };
