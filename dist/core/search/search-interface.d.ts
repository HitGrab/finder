import { SearchMixin } from "./search";
declare function readonlySearchInterface<FItem>(mixin: SearchMixin<FItem>): {
    searchTerm: string;
    activeRule: import("../..").SearchRule<unknown> | undefined;
    hasSearchTerm: boolean;
};
declare function searchInterface<FItem>(mixin: SearchMixin<FItem>): {
    setSearchTerm: (incomingSearchTerm: string) => void;
    reset: () => void;
    searchTerm: string;
    activeRule: import("../..").SearchRule<unknown> | undefined;
    hasSearchTerm: boolean;
};
export { readonlySearchInterface, searchInterface };
