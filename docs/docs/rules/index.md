---
sidebar_position: 1
---

# Rules

"Rules" are static definitions that tell Finder how to interact with the unique shape of your Items objects. Finder will use that information to determine what internal state to track.

Each set of rules has a corresponding mixin to access and mutate their state.

| Rule                                  | Mixin                                      | Purpose                                                                                          |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [SearchRule](../rules/search-rule)    | [finder.search](../mixins/search-mixin)    | Determine which properties in your Item should be searchable.                                    |
| [FilterRule](../rules/filter-rule)    | [finder.filter](../mixins/filters-mixin)   | Determine what filter predicates are required, and how they should be tested against your Items. |
| [SortByRule](../rules/sort-by-rule)   | [finder.sortBy](../mixins/sort-by-mixin)   | determine what order your Items should be displayed in.                                          |
| [GroupByRule](../rules/group-by-rule) | [finder.groupBy](../mixins/group-by-mixin) | determine how to categorize your Items                                                           |

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
