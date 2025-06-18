import { useFinderContext } from "@hitgrab/finder";

export function SelectedItems() {
    const finder = useFinderContext();
    return (
        <>
            <ul>
                {finder.selectedItems.items?.map((item) => {
                    return <li key={item.label}>{item.label}</li>;
                })}
            </ul>
            {Array.isArray(finder.selectedItems.items) && finder.selectedItems.items.length > 0 && (
                <button onClick={() => finder.selectedItems.reset()}>Clear</button>
            )}
        </>
    );
}
