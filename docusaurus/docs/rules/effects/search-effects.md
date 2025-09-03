# Search Effects

searchEffects are triggered when the user searches for certain terms. You may want to suggest a filter, or preload data based on their search terms.

**Type Signature**

```ts
ruleEffect(
    haystack: string | string[]
    | ((items: FItem[], context: FContext) => string | string[]),
    callback: (instance:FinderCore) => void),
    exact: boolean
```

**Example Usage**

```ts
const rules = finderRuleset<Fruit>([
    searchRule({
        searchFn: (item) => item.name,
    }),
]);

// whenever the user searches for these searchterms, the callback will be triggered.
const effects = [
    searchEffect(["best", "tastiest", "juiciest"], (instance) => {
        showGuavaToast();
    }),
];

const finder = new FinderCore(fruits, { rules, effects });
```

:::tip
Changes triggered inside an effect callback are processed silently, and do not trigger Events.  
:::
