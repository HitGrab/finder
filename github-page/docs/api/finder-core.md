---
title: FinderCore
---

## `items: FItem[]`

The array being operated on.

## `matches`

### `matches.items: FItem[]`

Flat array of items that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated.
Will be null if requireGroup is set.

### `matches.groups: FinderResultGroup<FItem>`

Flat array of groups that passed the search rule, all filters, have been sorted by any sortBy rules, and paginated.
Will be null if requireGroup is NOT set.

### `matches.numMatchedItems: number`

### `matches.numTotalItems: number`

### `matches.hasGroupByRule: boolean`

## `filters`

## groupBy

## pagination

## getRule

## events

## setItems

## setIsLoading

## setIsDisabled

## setContext

## `isEmpty`

## `state`
