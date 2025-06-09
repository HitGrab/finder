import { useFinderContext } from "@hitgrab/finder";

function SortByDropdown() {
    const finder = useFinderContext();
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
        </label>
    );
}
export { SortByDropdown };
