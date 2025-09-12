import { SortDirection, useFinder } from "@hitgrab/finder";

function SortByDropdown() {
    const finder = useFinder();
    return (
        <label>
            Sort by:
            <select value={finder.sortBy.activeRule?.id} onChange={(e) => finder.sortBy.set(e.currentTarget.value)}>
                {finder.sortBy.rules.map((option) => {
                    return (
                        <option value={option.id} key={option.label}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
            <select value={finder.sortBy.sortDirection} onChange={(e) => finder.sortBy.setSortDirection(e.currentTarget.value as SortDirection)}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
        </label>
    );
}
export { SortByDropdown };
