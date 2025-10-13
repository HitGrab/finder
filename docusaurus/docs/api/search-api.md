---
sidebar_position: 0
---

# Search

The Search api can be accessed from `finder.search`.

**Type Signature**

```ts
finder.search {

    // active rule
    rule?: FinderRule

    // String that is currently being searched for. Defaults to an empty string.
    searchTerm: string

    hasSearchTerm: boolean

    hasSearchRule: boolean

    setSearchTerm(value:string): void

    // Reset searchTerm to an empty string.
    reset(): void

    // test a search term without committing it
    test(searchTerm: string, isAdditive = false): FItem[]

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
