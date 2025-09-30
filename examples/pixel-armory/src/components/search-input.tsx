import { useFinder } from "@hitgrab/finder";
import { useCallback, useRef } from "react";

function SearchInput() {
    const finder = useFinder();
    const ref = useRef<HTMLInputElement | null>(null);

    const handleReset = useCallback(() => {
        finder.search.reset();
        if (ref.current) {
            ref.current.value = "";
        }
    }, []);

    return (
        <div className="search">
            <input type="text" placeholder="Search" onInput={(e) => finder.search.setSearchTerm(e.currentTarget.value)} ref={ref} />
            {finder.search.hasSearchTerm && <button onClick={handleReset}>Clear</button>}
        </div>
    );
}

export { SearchInput };
