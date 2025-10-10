---
sidebar_position: 0
---

# Search

SearchRules tell Finder how to interact with the searchable haystacks in your object. In this case, we want to search by either the street name, or the building name.

```ts
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

Only a single search rule can be defined per Finder instance. If you need to do multiple kinds of text searches, consider using a Filter!

:::info Further reading

- [SearchRule](/rules/search-rule) definition
- [Search API](/api/search-api)

:::
