# Events

Events can be attached either declaratively in React, or imperatively in vanilla JS.

## onInit

Triggered a single time when Finder is first initialized.

```ts
// FinderInitEvent
{
    source: "core";
    event: "init";
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

## onFirstUserInteraction

Triggered once when the user interacts with any rule.

```ts
// FinderFirstUserInteractionEvent
{
    source: "core";
    event: "firstUserInteraction";
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

## onReady

Triggered once after an items array is set and `isLoading` is false.

```ts
// FinderReadyEvent
{
    source: "core";
    event: "ready";
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

## onChange

Triggered whenever a rule's state changes.

```ts
// FinderChangeEvent
{
    source: "core" | "filters" | "groupBy" | "pagination" | "search" | "sortBy" | "layout";
    event: "change";
    current: any;
    initial: any;
    snapshot: FinderSnapshot,
    timestamp: number;
}
```
