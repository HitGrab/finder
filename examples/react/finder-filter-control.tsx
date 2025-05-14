import { useFinderContext } from "../hooks/use-finder-context";
import { FinderFilterRule, FinderOption } from "../types";

interface FinderFilterControlProps {
    label: string;
    rule: FinderFilterRule;
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

        // Some rule options may need to be constructed based on meta values not present at init.
        if (typeof rule.options === "function") {
            options = rule.options(finder.meta.value);
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
            <ul>
                {options.map((option) => {
                    return (
                        <li key={option.label}>
                            <label>
                                <input
                                    name={`${rule.id}`}
                                    type="radio"
                                    checked={ruleValue === option.value}
                                    onChange={() => finder.filters.set(rule.id, option.value)}
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
            <input type="text" value={ruleValue} onChange={(e) => finder.filters.set(rule.id, e.currentTarget.value)} />
            {label}
        </label>
    );
}

export { FinderFilterControl };
