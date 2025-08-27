# FinderRuleset

Optional wrapper to ensures that an array of rules all have the correct shape.

```ts
const rule = finderRules<FItem>([
    {
        id: "unique_identifier",
        sortFn: (item: FItem) => string | number,
    },
    {
        id: "unique_identifier",
        groupFn: (item: FItem) => string | number,
    },
]);
```
