# Pagination Mixin

The Pagination mixin can be accessed from `finder.pagination`.

**Type Signature**

```ts
finder.pagination {

    page: number

    offset: number

    numItemsPerPage?: number

    numTotalItems: number

    lastPage: number;

    isPaginated: boolean
}
```

**Example Usage**

```ts
function PaginationControl() {
    const finder = useFinder();

    return (
        <>
            {finder.pagination.isPaginated && range(1, finder.pagination.lastPage).map((index) => {
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

:::warning
`groupBy` rules are processed _after_ pagination, so a group might be split across multiple pages.
:::
