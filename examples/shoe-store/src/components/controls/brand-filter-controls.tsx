import { useFinder } from "@hitgrab/finder";

export function BrandFilterControls() {
    const finder = useFinder();
    const rule = finder.filters.getRule("brand");

    const optionMatches = finder.filters.testRuleOptions(rule);

    return (
        <div className="checkboxFilterList">
            {rule.options?.map((option) => {
                return (
                    <label onChange={() => finder.filters.toggle(rule, option)} key={option.value}>
                        <input name={option.value} type="checkbox" value={option.value} checked={finder.filters.has(rule, option)} readOnly={true} />{" "}
                        {option.label}
                        <span>{optionMatches.get(option)?.length}</span>
                    </label>
                );
            })}
        </div>
    );
}
