# GroupBy

## Properties

| Name               | Type                                 | Description                                                                          |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------------------------ |
| activeRule         | `GroupByRuleDefinition \| undefined` | If no sort rule has been set, the first rule in the stack will be considered active. |
| requireGroup       | boolean                              |                                                                                      |
| groupSortDirection | `'asc' \| 'desc'`                    |                                                                                      |
| rules              | `GroupByRuleDefinition[]`            | All rules, active or not. Useful for building controls.                              |

## Methods

### set

```ts
finder.groupBy.set(id: GroupByRuleDefinition | string): void
```

### toggle

If the groupBy rule is inactive, set it active. If already active, reset to the default.

```ts
finder.groupBy.toggle(id: GroupByRuleDefinition | string): void
```

### setGroupSortDirection

```ts
finder.groupBy.setGroupSortDirection(direction: 'asc' | 'desc'): void
```

### reset

Reset to initial values.

```ts
finder.groupBy.reset(): void
```

## Example Usage

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
