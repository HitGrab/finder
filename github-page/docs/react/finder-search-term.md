---
title: FinderSearchTerm
sidebar_position: 1
---

# FinderSearchTerm

This handy component allows you to highlight the segments in your haystack that matched your searchTerm.

```ts
// Searching for "pru"
<FinderSearchTerm Component={Span}>
    Hydraulic Pressure
</FinderSearchTerm>

// outputted as
"hydraulic <span>pr</span>ess<span>u</span>re"
```
