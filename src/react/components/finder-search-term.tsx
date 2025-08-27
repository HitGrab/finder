import { ElementType, useMemo } from "react";
import { getSearchResultSegments } from "../../core/search/result-segments/search-result-segments";
import { calculateSequentialCharacterIndexes } from "../../core/search/algorithms/sequential-characters";
import { SearchCharacterIndexFn } from "../../core/search/result-segments/result-segment-types";
import { useFinder } from "../hooks/use-finder";

interface FinderSearchTermProps {
    children: string;
    Component?: ElementType;
    algorithm?: SearchCharacterIndexFn;
}
function FinderSearchTerm({ Component = "span", children }: FinderSearchTermProps) {
    const finder = useFinder();
    const segments = useMemo(() => {
        return getSearchResultSegments(calculateSequentialCharacterIndexes, children, finder.search.searchTerm);
    }, [finder.search.searchTerm]);

    if (finder.search.hasSearchTerm === false) {
        return children;
    }

    return (
        <>
            {segments?.map((segment, index) => {
                if (segment.is_match) {
                    const key = [segment.value, index].join();
                    return <Component key={key}>{segment.value}</Component>;
                }
                return segment.value;
            })}
        </>
    );
}

export { FinderSearchTerm };
