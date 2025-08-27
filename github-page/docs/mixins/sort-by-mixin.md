# SortBy Mixin

:::info Looking for the rule?
See [SortBy Rule](../rules/sort-by-rule)
:::

The Sortby mixin can be accessed from `finder.sortBy`.

**Type Signature**

```ts
finder.sortBy {
    activeRule?: SortByRule
    // If no sort rule has been set, the first rule in the stack will be considered active.

    sortDirection: SortDirection,
    // asc or desc

    userHasSetSortDirection: boolean,
    // determine if the user has changed the value away from the default rule sort.

    rules: SortByRule[];
    // All sorting rules. Useful for building controls.

    set(identifier?: string | SortByRule, direction?: SortDirection): void
    // set the active rule.

    setSortDirection(direction?: SortDirection): void

    cycleSortDirection(): void
    // rotate between the rule default, desc, and asc.

    toggleSortDirection(): void,
    // flip between desc and asc.

    reset(): void,
}
```

**Example Usage**

```ts
function SortByControls() {
    const finder = useFinder();
    return (
        <select onChange={(value) => finder.sortBy.set(value)}>
            {finder.sortBy.rules.map((rule) => {
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
