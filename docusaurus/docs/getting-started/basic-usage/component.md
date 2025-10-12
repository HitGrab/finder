---
sidebar_position: 3
---

# Display Matches

Now that we have our ruleset, time to pass it to a Finder instance!

```ts
import { ruleset } from './rules.ts';

function ApartmentFinder() {
    const {data, isPending} = useListings();

    return (
        <Finder items={data} isLoading={isPending} rules={ruleset}>

            // Only a single state will be active at any one time.
            <Finder.Content>
                {{

                    // Displayed while Finder's isLoading property is true.
                    loading: 'Loading...',

                    // Finder received an empty items array.
                    empty: 'No listings found.'

                    // No items were found that matched the current rules.
                    noMatches: 'No results found.',

                    // The items parameter will receive the matches that have been searched, filtered, and sorted.
                    items: ({items}) => {
                        return items.map((listing) => (
                            <Listing
                                listing={listing}
                                key={listing.id}
                            />
                        ))
                    },
                }}
            </Finder.Content>
        </Finder>
    );
}
```

This component will render out the processed items array, but doesn't have any styling or controls.

:::warning
It's strongly recommended you either memoize your render prop functions, or make them stable component references. An arrow function is volatile, and may cause React to re-render the component every time.
:::
