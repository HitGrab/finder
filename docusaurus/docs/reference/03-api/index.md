---
title: API
---

import Link from '@docusaurus/Link';

# Api

FinderCore wraps Finder's internal methods to simplify the API surface.

## Constructor

```ts
new FinderCore<FItem, FContext>(items: FItem[] | null | undefined, options: FinderConstructorOptions);
```

## Properties

| Name       | Type                                                       | Description                                                                                              |
| ---------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| search     | object                                                     | See <Link to="/reference/api/search-api">Search API</Link>                                               |
| filters    | object                                                     | See <Link to="/reference/api/filter-api">Filter API</Link>                                               |
| sortBy     | object                                                     | See <Link to="/reference/api/sort-by-api">SortBy API</Link>                                              |
| groupBy    | object                                                     | See <Link to="/reference/api/group-by-api">GroupBy API</Link>                                            |
| pagination | object                                                     | See <Link to="/reference/api/pagination-api">Pagination API</Link>                                       |
| matches    | object                                                     | See <Link to="/reference/api/matches-api">Matches API</Link>                                             |
| events     | object                                                     | See <Link to="/reference/api/events-api">Events API</Link>                                               |
| context    | FContext                                                   | A reference to an external context object.                                                               |
| disabled   | boolean                                                    | If set true, this instance will ignore any rule state changes.                                           |
| hasMatches | boolean                                                    | If the current combination of search and filters have found any matches.                                 |
| isReady    | boolean                                                    | Evaluates as true once `isLoading` is false, and the items object is a valid array.                      |
| isEmpty    | boolean                                                    | Evaluates as true once `isLoading` is false, and the items object is a valid array, but has length zero. |
| isLoading  | boolean                                                    | Set to true once a valid dataset has been received.                                                      |
| items      | FItem[]                                                    | The dataset being operated on.                                                                           |
| state      | 'loading' \| 'empty' \| 'groups' \| 'items' \| 'noMatches' | Only a single state can be active at a time.                                                             |
| updatedAt  | number                                                     | In milliseconds.                                                                                         |

## Methods

### getRule

```ts
getRule(id: RuleDefinition | string): RuleDefinition | undefined;
```

### setItems

```ts
setItems(items: FItem[] | null | undefined): void
```

### setIsLoading

```ts
setIsLoading(value?: boolean): void
```

### setIsDisabled

```ts
setIsDisabled(value?: boolean): void
```

### setRules

```ts
setRules(definitions: RuleDefinition<FItem>[]): void
```

### setContext

```ts
setContext(context: FContext):void
```

### test

```ts
test(mixins: SnapshotSerializedMixins, isAdditive = false): FItem[]
```

### toJSON

```ts
toJSON(): JSON
```
