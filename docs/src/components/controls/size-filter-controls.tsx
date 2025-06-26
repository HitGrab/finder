import { useFinderContext } from "@hitgrab/finder";

export function SizeFilterControls() {
    const finder = useFinderContext();
    const rule = finder.filters.getRule("size");
    if (!rule) {
        return null;
    }

    return (
        <div className="gridFilterList">
            {rule.options?.map((option) => {
                return (
                    <button
                        type="button"
                        className={finder.filters.has(rule, option) ? "selected" : undefined}
                        onClick={() => finder.filters.toggleOption(rule, option)}
                        key={option.value}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
