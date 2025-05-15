import { FilterRule, FinderOption, useFinderContext } from "finder";

interface FinderFilterControlProps {
    label: string;
    rule: FilterRule;
}

/**
 * This is provided as an example control only. You should probably roll your own.
 */
function FinderFilterControl({ label, rule }: FinderFilterControlProps) {
    const finder = useFinderContext();
    const ruleValue = finder.filters.get(rule);

    if (rule.is_boolean) {
        return (
            <label>
                <input name={rule.id} type="checkbox" checked={ruleValue} onChange={() => finder.filters.toggle(rule)} />
                {label}
            </label>
        );
    }

    if (rule.options !== undefined) {
        let options: FinderOption[] = [];

        if (Array.isArray(rule.options)) {
            options = rule.options;
        }

        // Some rule options may need to be constructed based on item or meta values not present at init.
        if (typeof rule.options === "function") {
            options = rule.options(finder.items, finder.meta.value);
        }

        if (rule.multiple) {
            return (
                <ul>
                    {options.map((option) => {
                        return (
                            <li key={option.label}>
                                <label>
                                    <input
                                        name={`${rule.id}][${option.value}]`}
                                        type="checkbox"
                                        checked={ruleValue?.includes(option.value)}
                                        onChange={() => finder.filters.toggleOption(rule, option.value)}
                                    />
                                    {option.label}
                                </label>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <label>
                {label}
                <select onChange={(e) => finder.filters.set(rule, e.currentTarget.value)}>
                    {options.map((option) => {
                        return (
                            <option value={option.value} selected={ruleValue === option.value} key={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </select>
                {ruleValue !== undefined && <button onClick={() => finder.filters.delete(rule)}>Clear</button>}
            </label>
        );
    }

    return (
        <label>
            <input type="text" value={ruleValue} onChange={(e) => finder.filters.set(rule.id, e.currentTarget.value)} />
            {label}
        </label>
    );
}

export { FinderFilterControl };
