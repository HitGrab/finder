import { type } from "@generated/site-storage";
import { useFinder } from "@hitgrab/finder";
import { useState, useCallback } from "react";

export function SearchExampleInput() {
    const finder = useFinder();
    const [query, setQuery] = useState<string>("");
    const handleQueryChange = useCallback(
        (value: string) => {
            setQuery(value);
            finder.search.setSearchTerm(value);
        },
        [finder.search],
    );
    const handleReset = useCallback(() => {
        setQuery("");
        finder.search.reset();
    }, [finder.search]);

    return (
        <div className="listContainer__stickyHeader">
            <div className="listContainer__search">
                <input placeholder="Search" type="text" value={query} onInput={(e) => handleQueryChange(e.currentTarget.value)} />
                {finder.search.hasSearchTerm && (
                    <button type="button" className="listContainer__search__resetButton" onClick={handleReset}>
                        x
                    </button>
                )}
            </div>
            {finder.matches.numMatchedItems} / {finder.matches.numTotalItems} items
        </div>
    );
}
