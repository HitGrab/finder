import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { Finder, FinderContentProps, searchRule, useFinder } from "@hitgrab/finder";
import { Shoe } from "./search-example-types";
import { generateItems } from "./search-example-data";
import { useCallback, useState } from "react";

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
                <div className="card__header">
                    <h3>Find that perfect shoe</h3>
                </div>
                <div className="scrollable">
                    <div className="scrollable__content">
                        <Finder.Content>{{ items: SearchExampleItemsWithIcons, noMatches: "No matches found" }}</Finder.Content>
                    </div>
                </div>
                <div className="card__footer">
                    <SearchExampleInput />
                    <div className="listContainer__credits">Assets from https://freddiepng.itch.io/3-air-jordans-free</div>
                </div>
            </div>
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

function SearchExampleInput() {
    const finder = useFinder();
    const [query, setQuery] = useState<string>("");
    const handleQueryChange = useCallback(
        (value: string) => {
            setQuery(value);
            finder.search.setSearchTerm(value);
        },
        [finder.search],
    );
    const handleReset = useCallback(() => {
        setQuery("");
        finder.search.reset();
    }, [finder.search]);

    return (
        <div className="asset__search">
            <div className="listContainer__search">
                <input placeholder="Search" type="text" value={query} onInput={(e) => handleQueryChange(e.currentTarget.value)} />
                {finder.search.hasSearchTerm && (
                    <button type="button" className="listContainer__search__resetButton" onClick={handleReset}>
                        x
                    </button>
                )}
            </div>
            {finder.matches.numMatchedItems} / {finder.matches.numTotalItems} items
        </div>
    );
}
