import { Shoe } from "@/types";
import { Finder, useFinder } from "@hitgrab/finder";
import { useState } from "react";

export function NameSearchControl() {
    const finder = useFinder();

    const [query, setQuery] = useState<string>("");
    const [matches, setMatches] = useState<Shoe[]>([]);
    return (
        <div className="search">
            <input
                type="text"
                value={query}
                placeholder={"Search"}
                onInput={(e) => {
                    setMatches(finder.search.test(e.currentTarget.value).slice(0, 5));
                    setQuery(e.currentTarget.value);
                }}
            />
            {query !== "" && (
                <div className="searchList">
                    {finder.isLoading ? (
                        <div className="result">Loading...</div>
                    ) : (
                        matches.map((item) => (
                            <button
                                type="button"
                                onClick={() => {
                                    finder.search.setSearchTerm(item.name);
                                    setQuery("");
                                }}
                                className="result"
                                key={item.sku}
                            >
                                <Finder.SearchTerm searchTerm={query}>{item.name}</Finder.SearchTerm>
                            </button>
                        ))
                    )}
                </div>
            )}
            {query !== "" && (
                <button
                    type="button"
                    className="resetButton"
                    onClick={() => {
                        finder.search.reset();
                        setQuery("");
                    }}
                >
                    x
                </button>
            )}
        </div>
    );
}
