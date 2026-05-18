import { SortByExample } from '/src/components/sort-by-example/sort-by-example';

# SortBy

## Properties

| Name                    | Type                                | Description                                                                          |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| activeRule              | `SortByRuleDefinition \| undefined` | If no sort rule has been set, the first rule in the stack will be considered active. |
| sortDirection           | `'asc'\|'desc'`                     |                                                                                      |
| userHasSetSortDirection | boolean                             | Determine if the user has changed the value away from the initial rule.              |
| rules                   | `SortByRuleDefinition[]`            | All rules, active or not. Useful for building controls.                              |

## Methods

### cycleSortDirection

Cycle between the active rule's default sort, `desc`, and `asc`.

```ts
finder.sortBy.cycleSortDirection(): void
```

### isRuleActive

Test a rule to see if it is the currently active rule. Useful for building controls.

```ts
finder.sortBy.isRuleActive(id: SortByRuleDefinition | string): boolean;
```

### reset

Reset to the initial sort rule and direction.

```ts
finder.sortBy.reset(): void
```

### set

```ts
finder.sortBy.set(id: SortByRuleDefinition | string, direction?: 'asc' | 'desc'): void
```

### setSortDirection

```ts
finder.sortBy.setSortDirection(direction: 'asc' | 'desc'): void
```

### toggleSortDirection

Flip between `desc` and `asc`.

```ts
finder.sortBy.toggleSortDirection(): void
```

The Sortby api can be accessed from `finder.sortBy`.

## Example Usage

```ts
function SortByControls() {
    const finder = useFinder();
    return (
        <select onChange={(e) => finder.sortBy.set(e.currentTarget.value)}>
            {finder.sortBy.rules.map((rule) => (
                <option value={rule.id} key={rule.id}>
                    {rule.label}
                </option>
            ))}
        </select>
    );
}
```

<SortByExample />
