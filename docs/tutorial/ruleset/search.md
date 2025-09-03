---
sidebar_position: 0
---

# Search

Let's start with the simplest Rule: a search.

We want the user to be able to search by either the street name, or the building name.

```ts
const rule = searchRule<ApartmentListing>({
    // our SearchFn returns the searchable strings found in the object.
    searchFn: (listing) => {
        // Note that searchFn can either return a single string, or an array of strings.
        if (listing.name) {
            return [
                listing.address.lineOne, // 111 Cool St
                listing.name, // Cool Manor
            ];
        }
        return listing.address.lineOne;
    },
});
```

:::tip
Only a single search rule can be defined per Finder instance. If you need to do multiple kinds of text searches, consider using a Filter!
:::
