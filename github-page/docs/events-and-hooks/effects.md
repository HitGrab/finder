# Hooks

Hooks are onChange callbacks triggered when certain rules are changed.

**Type Signature**

```ts
ruleEffect(rules: string | FinderRule | (string | FinderRule)[], (instance:FinderCore) => void),
```

**Example Usage**

```ts
// static rules definitions
const rules = finderRuleset<Fruit>([
    filterRule({
        id: "is_an_orange",
        filterFn: (item) => item.type === "orange",
        isBoolean: true,
    }),
    filterRule({
        id: "is_an_apple",
        filterFn: (item) => item.type === "apple",
        isBoolean: true,
        defaultValue: true,
    }),
    filterRule({
        id: "is_fresh",
        filterFn: (item) => item.is_fresh,
        isBoolean: true,
    }),
]);

// whenever these rules are changed, the callback will be triggered.
const hooks = [
    ruleEffect(["is_an_orange", "is_an_apple"], (instance) => {
        if (instance.filters.get("is_an_orange") === true) {
            instance.filters.toggle("apple");
        }
    }),
];

const finder = new FinderCore(objectItems, { rules, hooks });
```

:::tip
Changes triggered inside an effect callback are processed silently, and do not trigger Events.  
:::
