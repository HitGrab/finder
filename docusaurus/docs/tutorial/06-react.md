# Display in React

To use Finder in React, you'll need to use the `<Finder />` component.

- `<Finder />` is the root React component that acts as context provider and bridge to the headless FinderCore.
- `<Finder.Content />` is a subcomponent that accepts renderProp callbacks that will receive Matches from Finder context.
- `<Finder.SearchTermHaystack />` is a helper subcomponent to highlight text matches against the currently active searchTerm.

```ts
import { APARTMENT_LISTING_RULESET } from './rules.ts';

function ApartmentFinder() {
    const {data, isPending} = useListings();

    return (
        <Finder
            rules={APARTMENT_LISTING_RULESET}
            items={data}
            isLoading={isPending}
        >
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

This component will render out the Matches array, but doesn't have any styling or controls.

:::warning
It's strongly recommended you either memoize your render prop functions, or make them stable component references. An arrow function is volatile, and may cause React to re-render the component every time.
:::
