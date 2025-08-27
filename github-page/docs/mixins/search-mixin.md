# Search Mixin

:::info Looking for the rule?
See [Search Rule](../rules/search-rule)
:::

The Search mixin can be accessed from `finder.search`.

**Type Signature**

```ts
finder.search {
    search.searchTerm: string
    // String that is currently being searched for. Defaults to an empty string.

    search.hasSearchTerm: boolean
    search.hasSearchRule: boolean
    search.setSearchTerm(value:string): void
    search.reset(): void
    // Reset searchTerm to an empty string.
}
```

**Example Usage**

```ts
function Search() {
    const finder = useFinder();
    return (
        <>
            <input
                type="text"
                value={finder.search.searchTerm}
                onInput={(e) => finder.search.setSearchTerm(e.currentTarget.value)}
            />
            <button
                type="button"
                onClick={() => finder.search.reset()}
            >
                Clear
            </button>
        </>
    )
}
```
