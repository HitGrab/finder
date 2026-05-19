# Pagination

## Properties

| Name            | Type    | Description                             |
| --------------- | ------- | --------------------------------------- |
| isPaginated     | boolean | True if `numItemsPerPage` has been set. |
| lastPage        | number  | 1-indexed                               |
| numItemsPerPage | number  |                                         |
| numTotalItems   | number  |                                         |
| offset          | number  |                                         |
| page            | number  | 1-indexed                               |

## Methods

### setPage

```ts
finder.pagination.setPage(page: number): void
```

### setNumItemsPerPage

```ts
finder.pagination.setNumItemsPerPage(value: number): void
```

:::warning
`groupBy` rules are processed _after_ pagination, so a group might be split across multiple pages.
:::

## Example Usage

```ts
function PaginationControl() {
    const finder = useFinder();

    return (
        <>
            {finder.pagination.isPaginated && range(finder.pagination.lastPage).map((index) => {
                <button
                    type="button"
                    onClick={() => finder.pagination.setPage(index)}
                >
                    {index}
                </button>
            })}

            Results per page:
            <select
                onChange((e) => finder.pagination.setNumItemsPerPage(Number(e.target.value))}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </>
    );
}
```
