---
sidebar_position: 3
---

# Effects & Events

Finder offers two ways to attach side-effects to internal state changes.

## Events

Finder has four lifecycle events that can be subscribed to.

| Event                           | Purpose                                                              | Max Calls |
| ------------------------------- | -------------------------------------------------------------------- | --------- |
| FinderInitEvent                 | Triggered a single time when Finder is first initialized.            | 1         |
| FinderReadyEvent                | Triggered once after an items array is set and `isLoading` is false. | 1         |
| FinderFirstUserInteractionEvent | Triggered once when the user interacts with any rule.                | 1         |
| FinderChangeEvent               | Triggered whenever a rule's state changes.                           | Inf       |

**Use cases:**

- I want to trigger a callback when Finder initializes.
- I want to load async data when the user first interacts with Finder.
- I want to enable or disable certain rules once async data has loaded.

## Effects

Effects are side-effects that couple rules together. They listen for changes targetting a subset of rules, and trigger a callback whenever those rules are affected.

```ts
ruleHook(rules: string | FinderRule | (string | FinderRule)[], (instance:FinderCore) => void),
```

**Use cases:**

- I want to reset sort order when the user changes their filters.
- Two filters are mutually exclusive, and one should be disabled when the other is active.
- I want to offer suggestions when a searchTerm matches a keyword
