---
sidebar_position: 4
---

# GroupBy

The GroupBy api can be accessed from `finder.groupBy`.

**Type Signature**

```ts
finder.groupBy {

    activeRule?: GroupByRule

    requireGroup: boolean

    // all defined GroupBy rules. Useful for controls.
    rules: GroupByRule[]

    groupIdSortDirection: 'asc' | 'desc'

    set(identifier?: string | GroupByRule): void

    toggle(identifier?: string | GroupByRule): void

    // Determine how groups should be sorted.
    setGroupIdSortDirection(direction?: 'asc' | 'desc')

    reset()
}
```

**Example Usage**

```ts
function GroupByControls() {
    const finder = useFinder();
    return (
        <select onChange={(value) => finder.groupBy.set(value)}>
            {finder.groupBy.rules.map((rule) => {
                return (
                    <option value={rule.id} key={rule.id}>
                        {rule.label}
                    </option>
                );
            })}
        </select>
    );
}
```
