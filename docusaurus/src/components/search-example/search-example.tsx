import { Finder, FinderContentItemProps, searchRule } from "@hitgrab/finder";
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
            <div className="listContainer">
                <SearchExampleInput />
                <div className="listContainer__content">
                    <Finder.Content>{{ items: SearchExampleItems, noMatches: "No matches found" }}</Finder.Content>
                </div>
            </div>
        </Finder>
    );
}

function SearchExampleItems({ items }: FinderContentItemProps<Shoe>) {
    return items.map((item) => {
        const composedHaystack = `${item.brand} ${item.name}™`;
        return (
            <div className="listContainer__item" key={item.sku}>
                <Finder.SearchTermHaystack>{composedHaystack}</Finder.SearchTermHaystack>
            </div>
        );
    });
}
