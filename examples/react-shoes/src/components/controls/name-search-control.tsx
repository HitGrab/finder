import { useFinderContext } from "@hitgrab/finder";

export function NameSearchControl() {
    const finder = useFinderContext();
    return <input type="text" placeholder="Search" value={finder.search.searchTerm} onInput={(e) => finder.search.setSearchTerm(e.currentTarget.value)} />;
}
