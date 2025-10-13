import { useFinder } from "../hooks/use-finder";
import { FinderSearchTermProp } from "../types/react-types";
import { StringMatch } from "./string-match";

interface FinderSearchTermHaystackProps {
    children: string;
    Match?: FinderSearchTermProp;
    Miss?: FinderSearchTermProp;
}
function FinderSearchTermHaystack({ Match = "mark", Miss, children: haystack }: FinderSearchTermHaystackProps) {
    const finder = useFinder();

    if (finder.search.hasSearchTerm === false) {
        return haystack;
    }

    return <StringMatch needle={finder.search.searchTerm} haystack={haystack} Match={Match} Miss={Miss} />;
}

export { FinderSearchTermHaystack };
