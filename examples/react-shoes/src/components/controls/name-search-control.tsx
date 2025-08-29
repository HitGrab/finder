import { useFinder } from "@hitgrab/finder";

export function NameSearchControl() {
    const finder = useFinder();
    return (
        <div className="search">
            <input type="text" placeholder="Search" value={finder.search.searchTerm} onInput={(e) => finder.search.setSearchTerm(e.currentTarget.value)} />
            <div className="searchList">
                {finder.matches.items?.slice(0, 3).map((item) => (
                    <button type="button" onClick={() => finder.search.setSearchTerm(item.name)}>
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
