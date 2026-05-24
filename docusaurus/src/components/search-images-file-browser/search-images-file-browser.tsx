import { faker } from "@faker-js/faker";
import { Finder, FinderContentProps, finderRuleset, useFinder } from "@hitgrab/finder";
import styles from "./search-images-file-browser.module.css";
import { useState, useCallback } from "react";
interface FauxFile {
    name: string;
    ext: string;
    modified: Date;
}
function createFile(): FauxFile {
    const name = faker.system.commonFileName();
    return {
        name: name,
        ext: name.slice(name.lastIndexOf(".") + 1),
        modified: faker.date.recent(),
    };
}
const items = faker.helpers.multiple(createFile, { count: 100 });

const rules = finderRuleset<FauxFile>([
    {
        searchFn: (file) => file.name,
        suggestFilters: true,
    },
    {
        id: "extension",
        filterFn: (file, value: string) => file.name.endsWith(value),
        options: ({ items }) => {
            const extSet = new Set<string>();
            items.forEach((item) => {
                extSet.add(item.ext);
            });
            return Array.from(extSet).map((extension) => {
                return {
                    label: extension,
                    value: extension,
                };
            });
        },
    },
]);

function SearchImagesFileBrowser() {
    return (
        <Finder items={items} rules={rules}>
            <div className={styles.container}>
                <div className={styles.controls}>
                    <FancySearch />
                    <DropdownFilter ruleId="extension" />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ext</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Finder.Content>{{ items: SearchImagesFileBrowserItems, noMatches: SearchImagesFileBrowserNoMatches }}</Finder.Content>
                    </tbody>
                </table>
            </div>
        </Finder>
    );
}

function SearchImagesFileBrowserItems({ items }: FinderContentProps<FauxFile>["items"]) {
    const finder = useFinder();

    return (
        <>
            {items.map((file) => (
                <tr key={file.name}>
                    <td>
                        <Finder.SearchTermHaystack>{file.name}</Finder.SearchTermHaystack>
                    </td>
                    <td>{file.ext}</td>
                    <td>{file.modified.toLocaleString()}</td>
                </tr>
            ))}
            {finder.matches.numTotalItems > finder.matches.numMatchedItems && (
                <tr>
                    <td colSpan={3}>{finder.matches.numTotalItems - finder.matches.numMatchedItems} files hidden</td>
                </tr>
            )}
        </>
    );
}

function SearchImagesFileBrowserNoMatches() {
    const finder = useFinder();
    return (
        <tr>
            <td colSpan={3}>{finder.matches.numTotalItems} files hidden</td>
        </tr>
    );
}

export function FancySearch() {
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

    console.log(finder.search);

    return (
        <div className="card assetCard">
            <div className="card__body">
                <div className={styles.searchContainer}>
                    <input placeholder="Search" type="text" value={query} onInput={(e) => handleQueryChange(e.currentTarget.value)} />
                    {finder.search.hasSearchTerm && (
                        <button type="button" className="listContainer__search__resetButton" onClick={handleReset}>
                            x
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

interface DropdownFilterProps {
    ruleId: string;
}
function DropdownFilter({ ruleId }: DropdownFilterProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    const ruleValue = finder.filters.get(rule);
    const options = rule.options ?? [];
    const composedOptions = rule.required ? options : [{ value: undefined, label: "All" }, ...options];
    const selectedOptionIndex = composedOptions.findIndex(({ value }) => value === ruleValue);
    const optionMatches = finder.filters.testRuleOptions(rule);

    return (
        <select
            value={selectedOptionIndex}
            onChange={(e) => {
                const selectedOption = composedOptions.at(e.currentTarget.selectedIndex);
                finder.filters.set(ruleId, selectedOption?.value);
            }}
        >
            {composedOptions.map((option, index) => {
                let numMatches = 0;
                if (option.value === undefined) {
                    numMatches = finder.items.length;
                } else {
                    numMatches = optionMatches.has(option) ? optionMatches.get(option).length : 0;
                }
                return (
                    <option value={index} key={String(option.value)}>
                        {option.label ?? option.value} ({numMatches})
                    </option>
                );
            })}
        </select>
    );
}

export { SearchImagesFileBrowser };
