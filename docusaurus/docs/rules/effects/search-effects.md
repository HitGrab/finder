# Search Effects

searchEffects are triggered when the user searches for certain terms.

:::info Use cases

- Suggesting a filter if the user searches for a matching keyword.
- Preload data based on their search.

:::

**Type Signature**

```ts
ruleEffect(
    haystack: string | string[]
    | ((items: FItem[], context: FContext) => string | string[]),
    callback: (instance:FinderCore) => void),
    exact: boolean
```

:::tip Exact matches ( true by default )
An exact sequential string match is required somewhere within the haystack.
For example, the searchTerm "apple" would match "basket of APPLES" but not "happy oranges, please."

If false, "apple" would match "hAPPy oranges, pLEase."
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
