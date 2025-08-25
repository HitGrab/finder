---
title: Search
sidebar_position: 1
---

# Search

## Search by picking haystacks from your items

A Finder instance has a single string `searchTerm` property that can be compared against a list of haystacks extracted from the items array.

Use a `haystackFn` to select the string or strings from each item that should be compared against your searchTerm.

```ts
const rule = searchRule<FItem>({
    haystackFn: (item: FItem, meta: MetaInterface) => string | string[];
    debounceMilliseconds?: number;
})
```

Finder uses case-insensitive sequential character matches.

- Searching for "pru" in "hydraulic pressure" matches "hydraulic **pr**ess**u**re"
- Searching for "dyr" in "hydraulic pressure" does not match.
- Searching for "r a s s e" in "hydraulic pressure" matches "hyd**ra**ulic pre**ss**ur**e**".

## Advanced predicate search

For more specific comparison algorithms, you can create a searchFn predicate. This does not transform either the searchTerm or the item haystacks.

```ts
const rule = searchRule<FItem>({
    searchFn: (item: FItem, searchTerm:string, meta: MetaInterface) => boolean
    debounceMilliseconds?: number;
})
```

:::tip
Only a single search rule can be defined per Finder instance. If you need to do multiple kinds of text searches, consider using a Filter!
:::
