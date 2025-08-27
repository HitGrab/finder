---
slug: "/"
sidebar_position: 0
---

# ...why?

Do we _really_ need a whole library for basic data manipulation? Maybe!

Filtering and sorting data is the easiest thing in the world, and a disproportionate percentage of webdev tasks. It can _also_ be a disproportionate amount of frustrations as client needs change at the last minute, filters get nested and coupled, and object shape changes.

Without good discipline and planning, data manipulation can become a tech debt quagmire. Finder is intended to make data manipulation easy, fast, and re-usable.

## Finder features

**Flexible enough to accomodate any item data shape**

Strings, objects, classes - whatever dataset you're manipulating, you can use a Rule to connect Finder to it. You don't need to transform your object to match an external rubric.

**Reusable**

Static Rules can be shared between Finder instances for reusable searches, filters or grouping. Write a Rule once, use it everywhere you're working with that object.

**Effortless searching**

Extract a string ( or strings ) from your item to search against. Rank searches by closest match to return relevant results faster.

**Highlight search matches**

The FinderSearchTerm component will highlight the segments of your Item's search term.

**Headless**

Finder provides an API for managing controls and displaying results. It doesn't have any opinions on how that should be rendered.
