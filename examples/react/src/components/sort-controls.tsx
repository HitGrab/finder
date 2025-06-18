import { SortDirection, useFinderContext } from "@hitgrab/finder";

export function SortControls() {
    const finder = useFinderContext();
    return finder.sortBy.rules.map((rule) => {
        return (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }} key={rule.id}>
                <label key={rule.id}>
                    <input type="radio" name="sortBy" checked={finder.sortBy.activeRule === rule} value={rule.id} onChange={() => finder.sortBy.set(rule)} />{" "}
                    {rule.label}
                </label>
                {finder.sortBy.activeRule === rule && (
                    <>
                        <select
                            value={String(finder.sortBy.sortDirection)}
                            onChange={(e) => finder.sortBy.setSortDirection(e.currentTarget.value as SortDirection)}
                        >
                            <option key="default">Default</option>
                            <option value="desc" key="desc">
                                Desc
                            </option>
                            <option value="asc" key="asc">
                                Asc
                            </option>
                        </select>
                        <button onClick={() => finder.sortBy.toggleSortDirection()}>Toggle sort direction</button>
                    </>
                )}
            </div>
        );
    });
}
