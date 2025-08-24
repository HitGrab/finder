---
title: Type Guards
sidebar_position: 1
---

# Type Guards

Ensures that rules have the correct shape.

## searchRule

```ts
const rule = searchRule<FItem>({
    haystackFn: (item: FItem) => string | string[],
});
```

OR

```ts
const rule = searchRule<FItem>({
    searchFn: (item: FItem, searchTerm: string) => boolean,
});
```

## filterRule

```ts
const rule = filterRule<FItem, FValue>({
    id: "unique_identifier",
    filterFn: (item: FItem, value: FValue, meta: MetaInterface) => boolean,
});
```

## sortByRule

```ts
const rule = sortByRule<FItem>({
    id: "unique_identifier",
    sortFn: (item: FItem) => string | number,
});
```

## groupByRule

```ts
const rule = groupByRule<FItem>({
    id: "unique_identifier",
    groupFn: (item: FItem) => string | number,
});
```

## finderRuleset

Ensures that an array of rules all have the correct shape.

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
