import { SearchMixin } from "./search";
declare function searchAPI<FItem>(mixin: SearchMixin<FItem>): {
    searchTerm: string;
    activeRule: import("../..").SearchRule<unknown> | undefined;
    hasSearchTerm: boolean;
    setSearchTerm: (incomingSearchTerm: string) => void;
    reset: () => void;
};
export { searchAPI };
