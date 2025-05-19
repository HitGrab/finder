import { HydratedFilterRule, useFinderContext } from "finder";
import { Fragment } from "react/jsx-runtime";

interface FinderFilterControlProps {
    rule: HydratedFilterRule;
}

/**
 * This is provided as an example control only. You should probably roll your own.
 */
function FinderFilterControl({ rule }: FinderFilterControlProps) {
    const finder = useFinderContext();
    const ruleValue = finder.filters.get(rule);

    if (rule.isBoolean) {
        return (
            <label>
                <input name={rule.id} type="checkbox" checked={ruleValue} onChange={() => finder.filters.toggle(rule)} />
                {rule.label}
            </label>
        );
    }

    if (rule.options !== undefined) {
        if (rule.multiple) {
            let matches = new Map();
            if (rule.options) {
                matches = finder.filters.testRuleOptions({ rule, isAdditive: true, mergeExistingValue: true });
            }

            return (
                <>
                    <b>{rule.label}</b>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        {rule.options.map((option) => {
                            const numMatches = matches.has(option) ? matches.get(option).length : 0;
                            return (
                                <Fragment key={option.value}>
                                    <label style={{ opacity: numMatches > 0 ? 1 : 0.3 }}>
                                        <div>
                                            <input
                                                name={`${rule.id}][${option.value}]`}
                                                type="checkbox"
                                                checked={ruleValue?.includes(option.value)}
                                                onChange={() => finder.filters.toggleOption(rule, option.value)}
                                            />
                                            {option.label}
                                        </div>
                                    </label>
                                    {numMatches} match(s)
                                </Fragment>
                            );
                        })}
                    </div>
                    {ruleValue.length > 0 && (
                        <div>
                            <button onClick={() => finder.filters.delete(rule)}>Clear</button>
                        </div>
                    )}
                </>
            );
        }

        let matches = new Map();
        if (rule.options) {
            matches = finder.filters.testRuleOptions({ rule, isAdditive: true });
        }

        return (
            <label>
                {rule.label}
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
            {rule.label}
        </label>
    );
}

export { FinderFilterControl };
