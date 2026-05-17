import Link from '@docusaurus/Link';

# Add a Search Rule

SearchRules tell Finder how to interact with the searchable haystacks in your object. It can return a single string or an array of strings, and Finder will search them all.

In this case, we want to search by either the street name, or the building name.

```ts
// rules.ts
const rule = searchRule<ApartmentListing>({
    searchFn: (listing) => {
        if (listing.name) {
            return [
                listing.name, // Cool Manor
                listing.address.line_one, // 111 Cool St
            ];
        }
        return listing.address.line_one;
    },
});
```

:::tip
If searching your dataset is expensive, searchRules have an optional `debounceMilliseconds` property.
:::

Only a single search rule can be defined per Finder instance. If you need to do multiple kinds of text searches, consider using a Filter!

:::info Further reading

- <Link to="/reference/rules/search-rule">SearchRule</Link>
- <Link to="/reference/api/search-api">Search API</Link>

:::
