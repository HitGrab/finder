---
sidebar_position: 4
---

# Build Controls

Finder doesn't have any opinion on how controls are rendered. Rule definitions, and state accessors/mutators are exposed so you can roll your own controls.

```ts
function FilterList() {
    const finder = useFinder();

    // loop through rule definitions to build controls
    return finder.filters.rules.map((rule) => {
        if (rule.boolean) {
            return <BooleanFilterControl rule={rule} key={rule.id} />;
        }
        if (rule.multiple) {
            return <MultipleFilterControl rule={rule} key={rule.id} />;
        }
        if (rule.options) {
            return <SelectFilterControl rule={rule} key={rule.id} />;
        }
        return null;
    })
}
```

## Boolean filter

```ts
interface BooleanFilterControlProps {
    rule: FinderRule;
}
function BooleanFilterControl({ rule }: BooleanFilterControlProps) {
    const finder = useFinder();
    const isChecked = finder.filters.has(rule);
    return (
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => finder.filters.toggle(rule)}
            />
            {rule.label}
        </label>
    )
}
```

## Multiple filter

```ts
interface MultipleFilterControlProps {
    rule: FinderRule;
}
function MultipleFilterControl({ rule }: MultipleFilterControlProps) {
    const finder = useFinder();
    return rule.options.map((option) => {
        const isChecked = finder.filters.has(rule, option);
        return (
            <label key={option.value}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => finder.filters.toggle(rule, option)}
                />
                {option.label}
            </label>
        );
    })
}
```

## Select filter

```ts
interface SelectFilterControlProps {
    rule: FinderRule;
}
function SelectFilterControl({ rule }: SelectFilterControlProps) {
    const finder = useFinder();
    const value = finder.filters.get(rule);
    return (
        <select
            value={value}
            onChange={(e) => finder.filters.set(rule, e.currentTarget.value)}
        >
            {rule.options.map((option) => {
                return <Option value={option.value} key={option.value}>{option.label}</Option>
            })}
        </select>
    );
}
```
