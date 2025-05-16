import { HydratedFilterRule, useFinderContext } from "finder";

interface FinderFilterControlProps {
    label: string;
    rule: HydratedFilterRule;
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
        if (rule.multiple) {
            return (
                <ul>
                    {rule.options.map((option) => {
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

        let matches = new Map();
        if (rule.options) {
            matches = finder.filters.testOptions(rule);
        }

        return (
            <label>
                {label}
                <select value={ruleValue} onChange={(e) => finder.filters.set(rule, e.currentTarget.value)}>
                    {!!rule.required === false && (
                        <option value="" key="none">
                            -- None --
                        </option>
                    )}
                    {rule.options.map((option) => {
                        return (
                            <option value={option.value} key={option.value}>
                                {option.label}
                                {matches.has(option) && `  ${matches.get(option).length} match(s) `}
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
