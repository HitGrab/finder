---
sidebar_position: 2
---

# FilterRule

Define a filter predicate that will return a boolean for each item. If multiple filters are active, _all_ filters must match for an item to be returned.

**Type Signature**

```ts
filterRule<FItem, FValue, FContext>({
    id: string;
    filterFn: (item: FItem, value: FValue, context: FContext) => boolean;
    options?: FilterOption<FValue>[] | ((items: FItem[], context: FContext) => FilterOption<FValue>[]);
    multiple?: boolean;
    boolean?: boolean;
    required?: boolean;
    defaultValue?: FValue | FValue[];
    label?: string;
    hidden?: boolean;
    debounceMilliseconds?: number;
})

```

| Prop                 | Description                                                                                                                                                                           | Default | Required |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id                   | Every filter rule must have a unique string id.                                                                                                                                       |         | ✓        |
| filterFn             | A predicate that returns a boolean. It also receives context, which can be any arbitrary value passed into the Finder instance.                                                       |         | ✓        |
| options              | Either an array of form options `[{label: 'Thing', value: 'thing'}]`, or an option generator function that returns options. `(items, context) => [{label: 'Thing', value: 'thing'}]`. |         |          |
| multiple             | If this filter has a single value or an array of values.                                                                                                                              | false   |          |
| required             | Whether this filter must always have a value. If the rule provides options, the first option will be selected by default.                                                             | false   |          |
| boolean              | If this filter has a true/false value. Useful for checkboxes!                                                                                                                         | false   |          |
| defaultValue         | If the filter has a preset value.                                                                                                                                                     |         |          |
| label                | Optional label for your client to display.                                                                                                                                            |         |          |
| hidden               | Optional display value for your client to display.                                                                                                                                    | false   |          |
| debounceMilliseconds | If you want to debounce value changes, enter a time in milliseconds.                                                                                                                  |         |          |

:::tip
Don't know the exact option list in advance? Option generator functions are extremely useful!

```ts
filterRule({
    ...
    options: (items) => {
        const allCategories = items.map((item) => item.category);
        const uniqueCategories = new Set(allCategories);
        return uniqueCategories.map((category) => {
            return {
                label: capitalize(category),
                value: category
            }
        })
    }
}
```

If a rule uses an option generator function, Finder will hydrate the rule with a stable options array before emitting it to the client. Options will be recalculated whenever items or context are changed.
:::
