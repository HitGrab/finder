---
sidebar_position: 3
---

# SortByRule

Only a single sortBy rule can be active at one time.
If any sortBy rules are provided and no specific rule is set, the first sortBy rule in the stack will be considered active.

**Type Signature**

```ts
sortByRule<FItem, FContext>({
    id: string;
    sortFn: FinderPropertySelector<FItem, FContext> | FinderPropertySelector<FItem, FContext>[];
    defaultSortDirection?: SortDirection;
    label?: string;
    hidden?: boolean;
})
```

| Prop                 | Description                                                                                                                             | Default | Required |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id                   | Every sortBy rule must have a unique string id.                                                                                         |         | ✓        |
| sortFn               | A callback that returns a string or number. It also receives context, which can be any arbitrary value passed into the Finder instance. |         | ✓        |
| defaultSortDirection | 'asc' or 'desc'.                                                                                                                        | 'asc'   |          |
| label                | Optional label for your client to display.                                                                                              |         |          |
| hidden               | Optional display value for your client to display.                                                                                      | false   |          |
