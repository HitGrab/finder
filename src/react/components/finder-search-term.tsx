import { ElementType, useMemo } from "react";
import { getSearchResultSegments } from "../../core/search/result-segments/search-result-segments";
import { useFinder } from "../hooks/use-finder";

interface FinderSearchTermProps {
    children: string;
    Component?: ElementType;
    searchTerm?: string;
}
function FinderSearchTerm({ Component = "span", searchTerm, children }: FinderSearchTermProps) {
    const finder = useFinder();
    const segments = useMemo(() => getSearchResultSegments(children, searchTerm ?? finder.search.searchTerm), [searchTerm, finder.search.searchTerm]);

    if ((searchTerm === undefined && finder.search.hasSearchTerm === false) || segments === undefined) {
        return children;
    }

    return segments?.map((segment, index) => {
        if (segment.is_match) {
            const key = [segment.value, index].join();
            return <Component key={key}>{segment.value}</Component>;
        }
        return segment.value;
    });
}

export { FinderSearchTerm };
