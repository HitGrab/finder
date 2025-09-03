# Events

The Events api can be accessed from `finder.events`.

**Type Signature**

```ts
finder.events {

    // bind an event
    on: (event: FinderEventName, callback: (payload: any) => void),

    // unbind an event
    off: (event: FinderEventName, callback: (payload: any) => void),

    // trigger the passed callback while suppressing the event emitter.
    silently: (callback: (payload: any) => void): void;

    isSilent: () => boolean,
}
```

## Event list

**onInit**

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

**onFirstUserInteraction**

Triggered once when the user interacts with any rule. Useful if you want to delay loading data until the user interacts with the form.

```ts
// FinderFirstUserInteractionEvent
{
    source: "core";
    event: "firstUserInteraction";
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

**onReady**

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

**onChange**

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
