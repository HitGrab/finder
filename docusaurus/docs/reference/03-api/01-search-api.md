# Search

## Properties

| Name          | Type                                | Description                                            |
| ------------- | ----------------------------------- | ------------------------------------------------------ |
| rule          | `SearchRuleDefinition` \| undefined | The active search rule set by this instance's ruleset. |
| searchTerm    | string                              | The user's search query, or an empty string.           |
| hasSearchTerm | boolean                             | True if `searchTerm` is not an empty string.           |
| hasSearchRule | boolean                             | True if the ruleset provides a valid SearchRule.       |

## Methods

### reset

Resets search term state to an empty string.

```ts [Signature]
finder.search.reset(): void;
```

### setSearchTerm

```ts [Signature]
finder.search.setSearchTerm(searchTerm:string): void;
```

### test

Evaluate which items would match this search term without committing the change to state.

```ts [Signature]
finder.search.test(searchTerm:string, isAdditive:boolean): FItem[];
```

## Example Usage

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
