import { SearchMixin } from "./search";
declare function readonlySearchInterface<FItem>(mixin: SearchMixin<FItem>): {
    searchTerm: string;
    hasSearchTerm: boolean;
    hasSearchRule: boolean;
};
declare function searchInterface<FItem>(mixin: SearchMixin<FItem>): {
    setSearchTerm: (incomingSearchTerm: string) => void;
    reset: () => void;
    test: (searchTerm: string, isAdditive?: boolean) => FItem[];
    searchTerm: string;
    hasSearchTerm: boolean;
    hasSearchRule: boolean;
};
export { readonlySearchInterface, searchInterface };
