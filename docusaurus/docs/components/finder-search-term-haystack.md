# Finder.SearchTermHaystack

This handy component allows you to highlight the segments in your haystack that matched your searchTerm. This wraps a StringMatch component and populates it with your Finder instance's current searchTerm.

```ts
// Searching for "pru"
<Finder.SearchTermHaystack Match='span' >
    Hydraulic Pressure
</Finder.SearchTermHaystack>
// returns 'hydraulic <span data-is-match="true">pr</span>ess<span>u</span>re'
```
