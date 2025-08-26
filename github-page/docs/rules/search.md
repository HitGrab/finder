---
title: Search
sidebar_position: 1
---

# Search

## Search by picking haystacks from your items

A Finder instance has a single `searchTerm` string that will be compared against haystacks extracted from the items array.

Use a `haystackFn` to select the string/strings from each item that will be compared against the searchTerm needle.

```ts
const rule = searchRule<FItem>({
    id?: string
    haystackFn: (item: FItem, meta: MetaInterface) => string | string[];
    debounceMilliseconds?: number;
})
```

:::tip
Only a single search rule can be defined per Finder instance. If you need to do multiple kinds of text searches, consider using a Filter!
:::

## Search algorithm

Finder uses case-insensitive sequential character matches.

- Searching for "pru" in "hydraulic pressure" matches "hydraulic **pr**ess**u**re"
- Searching for "dyr" in "hydraulic pressure" does not match.
- Searching for "r a s s e" in "hydraulic pressure" matches "hyd**ra**ulic pre**ss**ur**e**".

## Sorted results

Finder sorts results to find the closest matches. A search score is summed based on:

### Ratio of matched characters to haystack length. ( Scored 0-100 )

With the needle `ap`, `app` has a score of 66, while `apple` is 40.

### Comparative length of sequential character matches. ( Scored 0-100 )

With the needle `orange`, `orc angel` has a score of 80, while `delicious oranges` is 100.

Both scores are equally weighted.

:::warning
Ranked search will be overridden if a `sortBy` rule is set. If you want to use ranked search, you'll need to enable `ignoreSortByRulesWhileSearchRuleIsActive` in your configuration objet.
:::

## Custom search

For more specific comparison algorithms, you can create a searchFn predicate. This does not transform the searchTerm or the item haystacks, and does not perform any sorting.

```ts
const rule = searchRule<FItem>({
    searchFn: (item: FItem, searchTerm:string, meta: MetaInterface) => boolean
    debounceMilliseconds?: number;
})
```
