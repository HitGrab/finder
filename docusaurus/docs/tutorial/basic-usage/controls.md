---
sidebar_position: 4
---

# Build Controls

Finder doesn't have any opinion on how controls are rendered. Rule definitions, and state accessors/mutators are exposed so you can roll your own controls.

# Search text input

```ts
function SearchControl() {
    const finder = useFinder();
    const [query, setQuery] = useState<string>("");
    const handleQueryChange = useCallback(
        (value: string) => {
            setQuery(value);
            finder.search.setSearchTerm(value);
        },
        [finder.search],
    );
    const handleReset = useCallback(() => {
        setQuery("");
        finder.search.reset();
    }, [finder.search]);

    return (
        <>
            <input placeholder="Search" type="text" value={query} onInput={(e) => handleQueryChange(e.currentTarget.value)} />
            {finder.search.hasSearchTerm && (
                <button type="button" className="listContainer__search__resetButton" onClick={handleReset}>
                    x
                </button>
            )}
        </>
    );
}
```

## Boolean filter checkbox

```ts
interface BooleanFilterControlProps {
    ruleId: string;
}
function BooleanFilterControl({ ruleId }: BooleanFilterControlProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    const isChecked = finder.filters.has(rule);
    return (
        <label>
            <input type="checkbox" checked={isChecked} onChange={() => finder.filters.toggle(rule)} />
            {rule.label}
        </label>
    );
}
```

## Multiple value checkboxes

```ts
interface MultipleFilterControlProps {
    ruleId: string;
}
function MultipleFilterControl({ ruleId }: MultipleFilterControlProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    return (
        <ul>
            {rule.options.map((option) => {
                const isChecked = finder.filters.has(rule, option);
                return (
                    <li key={option.value}>
                        <label>
                            <input type="checkbox" checked={isChecked} onChange={() => finder.filters.toggle(rule, option)} />
                            {option.label}
                        </label>
                    </li>
                );
            })}
        </ul>
    );
}
```

## Single value dropdown

```ts
interface SingleValueControlProps {
    ruleId: string
}
function SingleValueControl({ ruleId }: SingleValueControlProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    const ruleValue = finder.filters.get(rule);
    const composedOptions = rule.required ? rule.options : [{ value: undefined, label: "All" }, ...rule.options];
    const selectedOptionIndex = composedOptions.findIndex(({ value }) => value === ruleValue);
    return (
        <select
            value={selectedOptionIndex}
            onChange={(e) => {
                const selectedOption = composedOptions.at(e.currentTarget.selectedIndex);
                finder.filters.set(ruleId, selectedOption.value);
            }}
        >
            {composedOptions.map((option, index) => {
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <option value={index} key={index}>
                        {option.label}
                    </option>
                );
            })}
        </select>
    );
}

```

## SortBy radio buttons

```ts
function RadioSortBy() {
    const finder = useFinder();

    return (
        <ul>
            {finder.sortBy.rules.map((rule) => {
                const isChecked = finder.sortBy.activeRule === rule;
                return (
                    <li key={rule.id}>
                        <label>
                            <input type="radio" checked={isChecked} onChange={() => finder.sortBy.set(rule)} />
                            {rule.label}
                        </label>
                    </li>
                );
            })}
        </ul>
    );
}
```
