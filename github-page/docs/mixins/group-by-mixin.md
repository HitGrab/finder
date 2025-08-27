# GroupBy Mixin

:::info Looking for the rule?
See [GroupBy Rule](../rules/group-by-rule)
:::

The GroupBy mixin can be accessed from `finder.groupBy`.

**Type Signature**

```ts
finder.groupBy {
    activeRule?: GroupByRule
    requireGroup: boolean
    rules: GroupByRule[]
    // all defined GroupBy rules. Useful for controls.

    groupIdSortDirection: 'asc' | 'desc'
    set(identifier?: string | GroupByRule): void
    toggle(identifier?: string | GroupByRule): void
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
