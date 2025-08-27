import { useFinder } from "@hitgrab/finder";
import { useCallback, useState } from "react";

export function PriceFilterControls() {
    const finder = useFinder();
    const rule = finder.filters.getRule("price_between");
    const [min, setMin] = useState<number | undefined>(undefined);
    const [max, setMax] = useState<number | undefined>(undefined);
    if (!rule) {
        return null;
    }

    const wrappedSetMin = useCallback(
        (value: number) => {
            setMin(value);
            syncFinder(value, max);
        },
        [max],
    );
    const wrappedSetMax = useCallback(
        (value: number) => {
            setMax(value);
            syncFinder(min, value);
        },
        [min],
    );
    const handleReset = useCallback(() => {
        setMin(undefined);
        setMax(undefined);
        finder.filters.delete(rule);
    }, []);

    const syncFinder = useCallback((minValue: number = Number.NEGATIVE_INFINITY, maxValue: number = Number.POSITIVE_INFINITY) => {
        finder.filters.set(rule, [[minValue > 0 ? minValue : Number.NEGATIVE_INFINITY, maxValue ? maxValue : Number.POSITIVE_INFINITY]]);
    }, []);

    const optionMatches = finder.filters.testRuleOptions({ rule });

    return (
        <div className="priceFilter">
            <div className="checkboxFilterList">
                {rule.options?.map((option) => {
                    return (
                        <label onChange={() => finder.filters.toggle(rule, option)} key={option.value}>
                            <input type="checkbox" value={option.value} checked={finder.filters.has(rule, option)} readOnly /> {option.label}
                            <span>{optionMatches.get(option)?.length}</span>
                        </label>
                    );
                })}
            </div>
            <div className="customValue price">
                Custom
                <input type="text" value={min || ""} onInput={(e) => wrappedSetMin(Number(e.currentTarget.value))} />-
                <input type="text" value={max || ""} onInput={(e) => wrappedSetMax(Number(e.currentTarget.value))} />
                {(min || max) && (
                    <button type="button" onClick={handleReset}>
                        x
                    </button>
                )}
            </div>
        </div>
    );
}
