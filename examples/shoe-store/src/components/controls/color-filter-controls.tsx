import { useFinder } from "@hitgrab/finder";

export function ColorFilterControls() {
    const finder = useFinder();
    const rule = finder.filters.getRule("color");

    const optionMatches = finder.filters.testRuleOptions(rule);

    return (
        <div className="colorFilterList">
            {rule.options?.map((option) => {
                return (
                    <button type="button" onClick={() => finder.filters.set(rule, option.value)} key={option.value}>
                        <input type="radio" name={option.value} checked={finder.filters.has(rule, option)} readOnly={true} />
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
