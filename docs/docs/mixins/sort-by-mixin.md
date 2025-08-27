# SortBy Mixin

The Sortby mixin can be accessed from `finder.sortBy`.

**Type Signature**

```ts
finder.sortBy {

    // If no sort rule has been set, the first rule in the stack will be considered active.
    activeRule?: SortByRule

    // asc or desc
    sortDirection: SortDirection,

    // determine if the user has changed the value away from the default rule sort.
    userHasSetSortDirection: boolean,

    // All sorting rules. Useful for building controls.
    rules: SortByRule[];

    // set the active rule.
    set(identifier?: string | SortByRule, direction?: SortDirection): void

    setSortDirection(direction?: SortDirection): void

    // rotate between the rule default, desc, and asc.
    cycleSortDirection(): void

    // flip between desc and asc.
    toggleSortDirection(): void,

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
