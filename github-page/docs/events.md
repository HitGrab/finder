# Events

Events can be attached either declaratively in React, or imperatively in vanilla JS.

### Declarative events

```ts
<Finder items={[...items]} rules={[...]} onChange={(e) => myChangeListener(e)} />
```

### Imperative events

```ts
finder.events.on(eventName, listener);
```

## Primary events

### onInit

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

### onFirstUserInteraction

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

### onReady

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

### onChange

Triggered whenever a rule's state changes.

```ts
// FinderChangeEvent
{
    source: "core" | "filters" | "groupBy" | "meta" | "pagination" | "plugin" | "search" | "selectedItems" | "sortBy" | "layout";
    event: "change";
    current: any;
    initial: any;
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

### CompleteEvent List

:::tip
You can subscribe to a broad primary event, or to a narrower secondary event like `change.search` or `change.search.setSearchTerm`.
:::

### Primary

- init
- firstUserInteraction
- ready
- change

### Secondary

- change.core
- change.core.setIsLoading
- change.core.setIsDisabled
- change.core.setItems
- change.layout
- change.layout.set
- change.layout.reset
- change.filters
- change.filters.set
- change.groupBy
- change.groupBy.set
- change.groupBy.setGroupIdSortDirection
- change.meta
- change.meta.set
- change.meta.delete
- change.meta.reset
- change.pagination
- change.pagination.setPage
- change.pagination.setNumItemsPerPage
- change.plugin
- change.plugin.${`string`}
- change.search
- change.search.setSearchTerm
- change.search.reset
- change.selectedItems
- change.selectedItems.setMaxSelectedItems
- change.selectedItems.set
- change.selectedItems.select
- change.selectedItems.toggle
- change.selectedItems.delete
- change.selectedItems.reset
- change.sortBy
- change.sortBy.set
- change.sortBy.setSortDirection
