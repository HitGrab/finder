# Matches

| Name            | Type                         | Description                                                                                                                                                    |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| items           | `FItem[]`                    | Flat array of items that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated. Will be undefined if `requireGroup:true`.   |
| groups          | `FinderResultGroup<FItem>[]` | Flat array of groups that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated. Will be undefined if `requireGroup:false`. |
| numMatchedItems | number                       |                                                                                                                                                                |
| numTotalItems   | number                       | The total number of items in the dataset.                                                                                                                      |
| hasGroupByRule  | boolean                      |                                                                                                                                                                |

## Example Usage

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
