# StringMatch

This highlight string segment matches within a haystack.

```ts
<StringMatch needle="pru" haystack="Hydraulic Pressure" Match='b' />
// returns 'hydraulic <span data-is-match="true">pr</span>ess<span>u</span>re'
```

:::tip Why isn't it a subcomponent of Finder, like `<Finder.SearchTermHaystack />`?
StringMatch isn't coupled to a Finder instance, and can be used outside of a Finder context. This makes it particularly useful for testing a search string before applying it.
:::
