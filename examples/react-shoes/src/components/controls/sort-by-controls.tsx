import { useFinder } from "@hitgrab/finder";

function SortByControls() {
    const finder = useFinder();
    return (
        <div className="checkboxFilterList">
            {finder.sortBy.rules?.map((rule) => {
                return (
                    <label onChange={() => finder.sortBy.set(rule)} key={rule.id}>
                        <input type="radio" name={rule.id} checked={finder.sortBy.activeRule?.id === rule.id} readOnly /> {rule.label}
                    </label>
                );
            })}
        </div>
    );
}
export { SortByControls };
