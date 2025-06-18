import { useFinderContext } from "@hitgrab/finder";

export function SearchControls() {
    const finder = useFinderContext();
    return (
        <>
            <input type="text" onChange={(e) => finder.search.setSearchTerm(e.currentTarget.value)} />
            {finder.search.hasSearchTerm && <button onClick={() => finder.search.reset()}>Clear</button>}
        </>
    );
}
