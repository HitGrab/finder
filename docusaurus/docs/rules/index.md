---
sidebar_position: 2
---

# Rules

"Rules" are static definitions that tell Finder how to interact with the unique shape of your Items objects. Finder will use that information to determine what internal state to track.

Each set of rules has a corresponding api to access and mutate their state.

| Rule                                  | API                                   | Purpose                                                                                          |
| ------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [SearchRule](../rules/search-rule)    | [finder.search](../api/search-api)    | Determine which properties in your Item should be searchable.                                    |
| [FilterRule](../rules/filter-rule)    | [finder.filter](../api/filters-api)   | Determine what filter predicates are required, and how they should be tested against your Items. |
| [SortByRule](../rules/sort-by-rule)   | [finder.sortBy](../api/sort-by-api)   | determine what order your Items should be displayed in.                                          |
| [GroupByRule](../rules/group-by-rule) | [finder.groupBy](../api/group-by-api) | determine how to categorize your Items                                                           |

## Rule Processing Order

1. Search
2. Filter
3. SortBy
4. Pagination
5. GroupBy

:::tip
It may help to store rules as separate content files for easy re-use.
i.e: `/Inventory/rules/filter-by-classification.ts`
:::
