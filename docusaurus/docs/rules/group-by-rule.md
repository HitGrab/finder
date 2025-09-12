---
sidebar_position: 4
---

# GroupByRule

**Type Signature**

```ts
groupByRule({
    id: string;
    groupFn: (item) => string | number;
    sortGroupIdFn?: (group) => string | number;
    groupIdSortDirection?: SortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
    label?: string;
    hidden?: boolean;
})
```

| Prop          | Description                                                                                                     | Default | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id            | Every groupBy rule must have a unique string id.                                                                |         | ✓        |
| groupFn       | A callback that returns a string or number. Items with the same value will be grouped together.                 |         | ✓        |
| sortGroupIdFn | While any sortBy rules will operate on the items first, sortGroupIdFn allows you to sort the groups themselves. |         |          |
| sticky        | Specify group ids that should be stickied to the top or bottom of the results.                                  |         |          |
| label         | Optional label for your client to display.                                                                      |         |          |
| hidden        | Optional display value for your client to display.                                                              | false   |          |

:::tip

- Only a single groupBy rule can be active at one time.
- If the Finder instance has `requireGroup` enabled and no groupBy rule is active, the first rule in the stack will be considered active.
- If you want a group of premium items to always appear first in the results, you can set `sticky: {header: 'premium_id' }`. If an array is provided, the order will be preserved. ( i.e: `sticky: { header: ['premium_id', 'subpremium_id']})`.
  :::
