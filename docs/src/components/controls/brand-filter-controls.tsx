import { useFinderContext } from "@hitgrab/finder";

export function BrandFilterControls() {
    const finder = useFinderContext();
    const rule = finder.filters.getRule("brand");
    if (!rule) {
        return null;
    }

    const optionMatches = finder.filters.testRuleOptions({ rule });

    return (
        <div className="checkboxFilterList">
            {rule.options?.map((option) => {
                return (
                    <label onChange={() => finder.filters.toggleOption(rule, option)} key={option.value}>
                        <input name={option.value} type="checkbox" value={option.value} checked={finder.filters.has(rule, option)} readOnly /> {option.label}
                        <span>{optionMatches.get(option)?.length}</span>
                    </label>
                );
            })}
        </div>
    );
}
