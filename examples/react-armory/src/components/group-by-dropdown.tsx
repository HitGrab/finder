import { useFinderContext } from "@hitgrab/finder";

function GroupByDropdown() {
    const finder = useFinderContext();

    return (
        <label onChange={() => finder.groupBy.toggle("rarity_group")}>
            <input type="checkbox" checked={finder.groupBy.activeRule?.id === "rarity_group"} readOnly /> Group by rarity
        </label>
    );
}
export { GroupByDropdown };
