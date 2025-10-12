import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { Finder, FinderContentItemProps, searchRule } from "@hitgrab/finder";
import { Shoe } from "./search-example-types";
import { SearchExampleInput } from "./search-example-controls";
import { generateItems } from "./search-example-data";

const NUM_ITEMS = 30;
const items = generateItems(NUM_ITEMS);

const ruleset = [
    searchRule<Shoe>({
        searchFn: (item) => item.name,
        debounceMilliseconds: 100,
    }),
];

export function SearchExampleWithIcons() {
    return (
        <Finder items={items} rules={ruleset}>
            <div className="listContainer">
                <SearchExampleInput />
                <div className="listContainer__content">
                    <Finder.Content>{{ items: SearchExampleItemsWithIcons, noMatches: "No matches found" }}</Finder.Content>
                </div>
            </div>
            <div className="listContainer__credits">Assets from https://freddiepng.itch.io/3-air-jordans-free</div>
        </Finder>
    );
}

function SearchExampleItemsWithIcons({ items }: FinderContentItemProps<Shoe>) {
    const { withBaseUrl } = useBaseUrlUtils();
    return items.map((item) => {
        return (
            <div className="listContainer__itemWithImage" key={item.sku}>
                <div
                    className="listContainer__image listContainer__image--shoe"
                    style={{ backgroundImage: `url(${withBaseUrl(item.image)})`, filter: `hue-rotate(${item.hue_shift}deg)` }}
                />
                <div>
                    <Finder.SearchTermHaystack>{item.name}</Finder.SearchTermHaystack>
                </div>
            </div>
        );
    });
}
