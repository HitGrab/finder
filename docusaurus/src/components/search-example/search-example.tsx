import { Finder, FinderContentProps, searchRule } from "@hitgrab/finder";
import { generateItems } from "./search-example-data";
import { Shoe } from "./search-example-types";
import { SearchExampleInput } from "./search-example-controls";

const ruleset = [
    searchRule<Shoe>({
        searchFn: (item) => `${item.brand} ${item.name}`,
        debounceMilliseconds: 100,
    }),
];

const NUM_ITEMS = 300;
const items = generateItems(NUM_ITEMS);

export function SearchExample() {
    return (
        <Finder items={items} rules={ruleset}>
            <div className="card assetCard">
                <SearchExampleInput />
                <div className="scrollable">
                    <div className="scrollable__content">
                        <Finder.Content>{{ items: SearchExampleItems, noMatches: "No matches found" }}</Finder.Content>
                    </div>
                </div>
            </div>
        </Finder>
    );
}

function SearchExampleItems({ items }: FinderContentProps<Shoe>["items"]) {
    return (
        <div className="assetTable assetTable--compact">
            {items.map((item) => {
                const composedHaystack = `${item.brand} ${item.name}™`;
                return (
                    <div className="row" key={item.sku}>
                        <div>
                            <Finder.SearchTermHaystack>{composedHaystack}</Finder.SearchTermHaystack>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
