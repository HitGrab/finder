---
title: Pagination
sidebar_position: 2
---

# Pagination

If the `numItemsPerPage` property is set, Finder will paginate items and groups.

```ts
function DeclarativePaginationComponent() {
    const items = [...]
    const rules = [...]

    const page = 1;
    const numItemsPerPage = 10;

    return (
        <Finder items={items} rules={rules} page={page} numItemsPerPage={numItemsPerPage}>
            ...contents
        </Finder>
    );
}

// the values can also be changed after Finder is initialized.
function ImperativePaginationControl() {
    const finder = useFinderContext();

    return (
        <>
            // pager bar
            {finder.pagination.isPaginated && range(1, finder.pagination.lastPage).map((index) => {
                <button type="button" oncClick={() => finder.pagination.setPage(index)}>
                    {index}
                </button>
            })}

            Results per page:
            <select onChange((e) => finder.pagination.setNumItemsPerPage(Number(e.target.value))) >
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
            </select>
        </>
    );
}
```

:::warning
Please note that pagination is not the final option considered in the functionality of the filtering / sorting process, therefore groupBy options could return unexpected results.
:::
