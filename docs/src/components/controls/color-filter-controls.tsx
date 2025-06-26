import { useFinderContext } from "@hitgrab/finder";

export function ColorFilterControls() {
    const finder = useFinderContext();
    const rule = finder.filters.getRule("color");
    if (!rule) {
        return null;
    }

    const optionMatches = finder.filters.testRuleOptions({ rule });

    return (
        <div className="colorFilterList">
            {rule.options?.map((option) => {
                return (
                    <button type="button" onClick={() => finder.filters.set(rule, option.value)} key={option.value}>
                        <input type="radio" name={option.value} checked={finder.filters.has(rule, option)} readOnly />
                        <div>
                            <div className="color" style={{ background: option.value }} />
                            {option.label}
                        </div>
                        <span>{optionMatches.get(option)?.length}</span>
                    </button>
                );
            })}
        </div>
    );
}
