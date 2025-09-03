# Finder.SearchTerm

This handy component allows you to highlight the segments in your haystack that matched your searchTerm.

```ts
// Searching for "pru"
<Finder.SearchTerm Component={Span}>
    Hydraulic Pressure
</Finder.SearchTerm>

// outputted as
"hydraulic <span>pr</span>ess<span>u</span>re"
```
