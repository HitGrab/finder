---
sidebar_position: 1
---

# SearchRule

**Select strings from your items to search against**

A Finder instance has a single `searchTerm` string that will be compared against haystacks extracted from the items array.

Use a `searchFn` to extract the string/strings from each item that will be compared against the searchTerm needle.

```ts
const rule = searchRule<FItem>({
    id?: string
    searchFn: (item: FItem, context: any) => string | string[];
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

**Ratio of matched characters to haystack length. ( Scored 0-100 )**

With the needle `ap`, `app` has a score of 66, while `apple` is 40.

**Comparative length of sequential character matches. ( Scored 0-100 )**

With the needle `orange`, `orc angel` has a score of 80, while `delicious oranges` is 100.

Both scores are equally weighted.

:::warning
Ranked search will be overridden if a `sortBy` rule is set. If you want to use ranked search, you'll need to enable `ignoreSortByRulesWhileSearchRuleIsActive` in your configuration object.
:::

## Custom search algorithms

If this search algorithm or sorting doesn't meet your needs, you may want to create a filter or a custom sortBy rule.
