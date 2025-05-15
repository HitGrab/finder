import { SearchMixin } from "./search";
declare function searchAPI<FItem>(mixin: SearchMixin<FItem>): {
    searchTerm: string;
    hasSearchRule: boolean;
    setSearchTerm: (incomingSearchTerm: string) => void;
    reset: () => void;
};
export { searchAPI };
