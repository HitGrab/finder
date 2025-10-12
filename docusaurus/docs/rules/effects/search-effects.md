# Search Effects

searchEffects are triggered when the user searches for certain terms.

:::info Use cases

- Suggesting a filter if the user searches for a matching keyword.
- Preload data based on their search.

:::

**Type Signature**

```ts
searchEffect(
    haystack: string | string[]
    | ((items: FItem[], context: FContext) => string | string[]),
    callback: (instance:FinderCore) => void),
```

:::tip Exact string matching
SearchEffects use the same matching algorithm as searchRules. If you want to match an exact string, you can wrap it in quotation marks.
:::

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
