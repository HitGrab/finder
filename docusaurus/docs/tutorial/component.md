---
sidebar_position: 3
---

# Display Matches

Now that we have our ruleset, time to pass it to a Finder instance!

```ts
import { ruleset } from './rules.ts';

function ApartmentFinder() {
    const {data, isPending} = useListings();
    const userLocation = useUserLocation();

    // This context - which can be a class, object, or set of methods - will be available to all rules and render props.
    const context = useMemo(() => {
        return {
            x: userLocation.x,
            y: userLocation.y
        }
    }, [userLocation])

    return (
        <Finder items={data} isLoading={isPending} context={context} rules={ruleset}>

            // Finder.Content uses the render props pattern.
            // Only a single state will be active at any one time.
            <Finder.Content>
                {{

                    // Displayed while Finder's isLoading property is true.
                    loading: 'Loading...',

                    // Finder received an empty items array.
                    empty: 'No listings found.'

                    // No items were found that matched the current rules.
                    results: 'No results found.',

                    // This items array will have been searched, filtered, and sorted already.
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
