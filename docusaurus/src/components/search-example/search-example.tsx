import { Finder, FinderContentItemProps, searchRule, useFinder } from "@hitgrab/finder";
import { generateItems } from "./search-example-data";
import { useCallback, useState } from "react";

interface Shoe {
    name: string;
    brand: string;
    sku: string;
}

const ruleset = [
    searchRule<Shoe>({
        searchFn: (item) => `${item.name} ${item.brand}`,
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
        <div className="listContainer__stickyHeader">
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
