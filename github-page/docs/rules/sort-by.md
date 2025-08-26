---
title: SortBy
sidebar_position: 4
---

# Sort

Only a single sortBy rule can be active at one time.
If any sortBy rules are provided and no specific rule is set, the first sortBy rule in the stack will be considered active.

The method uses lodash's orderBy under the hood.

```ts
sortByRule({
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultSortDirection?: SortDirection;
    label?: string;
    hidden?: boolean;
})
```

| Prop                 | Description                                                                                                                       | Default | Required |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id                   | Every sortBy rule must have a unique string id.                                                                                   |         | ✓        |
| sortFn               | A callback that returns a string or number. Note that it receives the Meta mixin, which can contain instance-wide arbitrary data. |         | ✓        |
| defaultSortDirection | 'asc' or 'desc'.                                                                                                                  | 'asc'   |          |
| label                | Optional label for your client to display.                                                                                        |         |          |
| hidden               | Optional display value for your client to display.                                                                                | false   |          |
