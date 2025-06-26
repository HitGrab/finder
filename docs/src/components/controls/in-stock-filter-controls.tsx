import { useFinderContext } from "@hitgrab/finder";

function InStockFilterControls() {
    const finder = useFinderContext();
    const ruleValue = finder.filters.get("in_stock");

    return (
        <label onChange={() => finder.filters.toggle("in_stock")}>
            <input type="checkbox" checked={ruleValue} readOnly /> Only in-stock items
        </label>
    );
}

export { InStockFilterControls };
