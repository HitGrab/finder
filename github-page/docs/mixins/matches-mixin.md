# Matches Mixin

The Matches mixin can be accessed from `finder.matches`.

**Type Signature**

```ts
finder.matches {
    items?: FItem[];
    // Flat array of items that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated.
    // Will be undefined if requireGroup is set.

    groups?: FinderResultGroup<FItem>[];
    // Flat array of groups that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated.
    // Will be undefined if requireGroup is NOT set.

    numMatchedItems: number;
    numTotalItems: number;
    hasGroupByRule: boolean;
}
```

**Example Usage**

```ts
function Results() {
    const finder = useFinder();
    return (
        <div>
            Matches: {finder.matches.numMatchedItems} / {finder.matches.numTotalItems}
            {finder.matches.items.map((item) => <CoolThing item={item} key={item.type} />}
        </div>
    })
}
```
