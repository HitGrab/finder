import { useFinderContext } from "@hitgrab/finder";

function QuantityFilter() {
    const finder = useFinderContext();
    const ruleValue = finder.filters.get("has_quantity");

    return (
        <label onChange={() => finder.filters.toggle("has_quantity")}>
            <input type="checkbox" checked={ruleValue} readOnly /> Only owned items
        </label>
    );
}

export { QuantityFilter };
