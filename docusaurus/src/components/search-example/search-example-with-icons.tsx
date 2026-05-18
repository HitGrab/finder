import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { Finder, FinderContentProps, searchRule } from "@hitgrab/finder";
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
            <div className="card assetCard">
                <SearchExampleInput />
                <div className="scrollable">
                    <div className="scrollable__content">
                        <Finder.Content>{{ items: SearchExampleItemsWithIcons, noMatches: "No matches found" }}</Finder.Content>
                    </div>
                </div>
            </div>
            <div className="listContainer__credits">Assets from https://freddiepng.itch.io/3-air-jordans-free</div>
        </Finder>
    );
}

function SearchExampleItemsWithIcons({ items }: FinderContentProps<Shoe>["items"]) {
    const { withBaseUrl } = useBaseUrlUtils();
    return (
        <div className="assetTable">
            {items.map((item) => {
                return (
                    <div className="row" key={item.sku}>
                        <div>
                            <Finder.SearchTermHaystack>{item.name}</Finder.SearchTermHaystack>
                            <div
                                className=" asset__image--shoe"
                                style={{ backgroundImage: `url(${withBaseUrl(item.image)})`, filter: `hue-rotate(${item.hue_shift}deg)` }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
