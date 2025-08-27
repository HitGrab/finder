import { useFinder } from "@hitgrab/finder";

function RarityFilter() {
    const finder = useFinder();
    const rule = finder.filters.getRule("rarity");
    return (
        <>
            {rule?.options?.map((option) => {
                return (
                    <label onChange={() => finder.filters.toggle(rule, option)} key={option.value}>
                        <input type="checkbox" value={option.value} checked={finder.filters.has(rule, option)} readOnly /> {option.label}
                    </label>
                );
            })}
        </>
    );
}

export { RarityFilter };
