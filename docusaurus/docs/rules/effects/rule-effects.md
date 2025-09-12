# Rule Effects

ruleEffects are triggered when certain rules are changed. It allows you to couple rules to each other wihout adding complex onChange events.

:::info Use cases

- I want to reset sort order when the user changes their filters.
- Two filters are mutually exclusive, and one should be disabled when the other is active.

:::
**Type Signature**

```ts
ruleEffect(
    string | FinderRule | (string | FinderRule)[]
    | ((items: FItem[], context: FContext) =>
        string | FinderRule<FItem> | (string | FinderRule<FItem>)[]
    ),
    (instance:FinderCore) => void
),
```

**Example Usage**

```ts
const rules = finderRuleset<Fruit>([
    filterRule({
        id: "is_an_orange",
        filterFn: (item) => item.type === "orange",
        boolean: true,
    }),
    filterRule({
        id: "is_an_apple",
        filterFn: (item) => item.type === "apple",
        boolean: true,
        defaultValue: true,
    }),
    filterRule({
        id: "is_fresh",
        filterFn: (item) => item.is_fresh,
        boolean: true,
    }),
]);

// whenever these rules are changed, the callback will be triggered.
const effects = [
    ruleEffect(["is_an_orange", "is_an_apple"], (instance) => {
        if (instance.filters.has("is_an_orange")) {
            instance.filters.toggle("is_an_apple");
        }
    }),
];

const finder = new FinderCore(fruits, { rules, effects });
```

:::tip
Changes triggered inside an effect callback are processed silently, and do not trigger Events.  
:::
