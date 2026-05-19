# Build Form Controls

Finder doesn't have any opinion on how controls are rendered. Instead, it provides a `useFinder` hook that exposes Rule definitions, and state accessors/mutators so you can easily roll your own controls.

Let's build some examples:

## Search text input

```ts
// components/controls/Search.tsx
function Search() {
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
            <input
                placeholder="Search"
                type="text"
                value={query}
                onInput={(e) => handleQueryChange(e.currentTarget.value)}
            />
            {finder.search.hasSearchTerm && (
                <button type="button" onClick={handleReset}>
                    x
                </button>
            )}
        </>
    );
}
```

## Boolean filter checkbox

```ts
// components/controls/CheckboxFilter.tsx
interface CheckboxFilterProps {
    rule: AnyFilterRuleDefinition | string;
}
function CheckboxFilter({ rule }: CheckboxFilterProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(rule);

    if (rule.multiple) {
        return (
            <ul>
                {rule.options.map((option) => {
                    const isChecked = finder.filters.has(rule, option);
                    return (
                        <li key={option.value}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => finder.filters.toggle(rule, option)}
                                />
                                {option.label}
                            </label>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const isChecked = finder.filters.has(rule);
    return (
        <label>
            <input type="checkbox"
                checked={isChecked}
                onChange={() => finder.filters.toggle(rule)}
            />
            {rule.label}
        </label>
    );
}
```

:::tip
Finder's rule accessors will accept either a full Rule object or a string id.
:::

## Dropdown Select

```ts
// components/controls/DropdownFilter.tsx
interface DropdownFilterProps {
    rule: AnyFilterRuleDefinition | string;
}
function DropdownFilter({ rule }: DropdownFilterProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(rule);
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
            {composedOptions.map((option, index) => (
                <option value={index} key={option.value}>
                    {option.label}
                </option>
            )}
        </select>
    );
}

```

## SortBy radio buttons

```ts
// components/controls/SortBy.tsx
function RadioSortBy() {
    const finder = useFinder();

    return (
        <ul>
            {finder.sortBy.rules.map((rule) => {
                const isChecked = finder.sortBy.activeRule === rule;
                return (
                    <li key={rule.id}>
                        <label>
                            <input
                                type="radio"
                                checked={isChecked}
                                onChange={() => finder.sortBy.set(rule)}
                            />
                            {rule.label}
                        </label>
                    </li>
                );
            })}
        </ul>
    );
}
```
