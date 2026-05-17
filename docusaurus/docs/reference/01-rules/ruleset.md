# FinderRuleset

Optional wrapper to ensures that an array of rules all have the correct shape.

```ts
const rule = finderRules<FItem, FContext>([
    sortByRule{
        id: "unique_identifier",
        sortFn: (item: FItem, context: FContext) => string | number,
    },
    groupByRule{
        id: "unique_identifier",
        groupFn: (item: FItem, context: FContext) => string | number,
    },
]);
```
