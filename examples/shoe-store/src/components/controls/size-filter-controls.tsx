import { useFinder } from "@hitgrab/finder";

export function SizeFilterControls() {
    const finder = useFinder();
    const rule = finder.filters.getRule("size");

    return (
        <div className="gridFilterList">
            {rule.options?.map((option) => {
                return (
                    <button
                        type="button"
                        className={finder.filters.has(rule, option) ? "selected" : undefined}
                        onClick={() => finder.filters.toggle(rule, option)}
                        key={option.value}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
