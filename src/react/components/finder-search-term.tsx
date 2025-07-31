import { ElementType, useMemo } from "react";
import { useFinderContext } from "../hooks/use-finder-context";
import { getSearchResultSegments } from "../../core/search/result-segments/search-result-segments";
import { calculateSequentialCharacterIndexes } from "../../core/search/algorithms/sequential-characters";

interface FinderSearchTermProps {
    children: string;
    Component?: ElementType;
}
function FinderSearchTerm({ Component = "span", children }: FinderSearchTermProps) {
    const finder = useFinderContext();
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
