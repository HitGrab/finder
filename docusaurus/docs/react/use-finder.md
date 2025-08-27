# useFinder

Access the current Finder context.

**Type Signature**

```ts
useFinder<FItem, FContext>();
```

**Example Usage**

```ts
function CurrentFilterChips() {
    const finder = useFinder<FItem, FContext>();
    return (
        <div>
            {finder.filters.activeRules.map((rule) => {
                return (
                    <Chip
                        onReset=() => finder.filters.delete(rule)
                    >
                        {rule.label}
                    </Chip>
                );
            })}
            Num Selected items:
            {finder.context.selectedItems.length}
        </div>
    );
}

```
