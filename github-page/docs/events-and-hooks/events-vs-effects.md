---
sidebar_position: 1
---

# Events vs Effects

Effects are side-effects that couple rules together. They listen for changes targetting a subset of rules, and trigger a callback whenever those rules are affected.

```ts
ruleHook(rules: string | FinderRule | (string | FinderRule)[], (instance:FinderCore) => void),
```

**Event use cases:**

- I want to trigger a callback when Finder initializes.
- I want to load async data when the user first interacts with Finder.
- I want to enable or disable certain rules when async data has loaded.

**Effect use cases:**

- I want to change sort order when the user toggles a filter.
- Two filters are mutually exclusive, and one should be disabled when the other is active.
