import { faker } from "@faker-js/faker";
import { filterRule, FilterRuleDefinition, Finder, FinderContentProps, finderRuleset, useFinder } from "@hitgrab/finder";
import styles from "./search-images-file-browser.module.css";
import { useState, useCallback } from "react";
import clsx from "clsx";

const DAY_IN_MILLISECONDS = 60 * 1000 * 60 * 24;
interface FauxFile {
    name: string;
    ext: string;
    size: number;
    modified: Date;
    id: string;
}
function createFile(): FauxFile {
    const name = faker.system.commonFileName();
    return {
        name: name,
        ext: name.slice(name.lastIndexOf(".")),
        size: faker.number.int({ min: 0.1, max: 200 }),
        modified: faker.date.past({ years: 0.1 }),
        id: faker.string.uuid(),
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
        label: "File Type",
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
    filterRule({
        id: "date",
        label: "Modified",
        filterFn: (file, value: Date) => {
            console.log("testing", file.modified.toLocaleString(), value.toLocaleString());
            return file.modified >= value;
        },
        options: [
            {
                label: "Yesterday",
                value: new Date(new Date().getTime() - DAY_IN_MILLISECONDS),
            },
            {
                label: "Week",
                value: new Date(new Date().getTime() - DAY_IN_MILLISECONDS * 7),
            },
            {
                label: "Month",
                value: new Date(new Date().getTime() - DAY_IN_MILLISECONDS * 30),
            },
        ],
    }),
]);

function SearchImagesFileBrowser() {
    return (
        <Finder items={items} rules={rules}>
            <div className={styles.container}>
                <div className={styles.controls}>
                    <FancySearch />
                    {/* <DropdownFilter ruleId="date" />
                    <DropdownFilter ruleId="extension" /> */}
                </div>
                <div className={styles.tableContainer}>
                    <div className={styles.table}>
                        <div className={clsx([styles.row, styles.header])}>
                            <div>|</div>
                            <div className={styles.headerCell}>Name</div>
                            <div>|</div>
                            <div className={styles.headerCell}>Size</div>
                            <div>|</div>
                            <div className={styles.headerCell}>Modified</div>
                            <div>|</div>
                        </div>
                        <div className={clsx([styles.row, styles.header])}>
                            <div>|</div>
                            <div className={styles.empty}>-------------------------------------------------------------------------</div>
                            <div>|</div>
                        </div>
                        <div className={styles.body}>
                            <Finder.Content>{{ items: SearchImagesFileBrowserItems, noMatches: SearchImagesFileBrowserNoMatches }}</Finder.Content>
                        </div>
                    </div>
                </div>
            </div>
        </Finder>
    );
}

function SearchImagesFileBrowserItems({ items }: FinderContentProps<FauxFile>["items"]) {
    const finder = useFinder();

    return (
        <>
            {items.map((file) => (
                <div className={styles.row} key={file.id}>
                    <div>|</div>
                    <div>{file.name}</div>
                    <div>|</div>
                    <div>{new Intl.NumberFormat("en-us", { style: "unit", unit: "kilobyte" }).format(file.size)}</div>
                    <div>|</div>
                    <div>{file.modified.toLocaleDateString()}</div>
                    <div>|</div>
                </div>
            ))}
            {finder.matches.numTotalItems > finder.matches.numMatchedItems && (
                <div className={styles.row}>
                    <div>|</div>
                    <div className={styles.empty}>
                        {finder.matches.numTotalItems - finder.matches.numMatchedItems} files hidden{" "}
                        <button
                            type="button"
                            onClick={() => {
                                finder.search.reset();
                                finder.filters.reset();
                            }}
                        >
                            [reset]
                        </button>
                    </div>
                    <div>|</div>
                </div>
            )}
        </>
    );
}

function SearchImagesFileBrowserNoMatches() {
    const finder = useFinder();
    return (
        <div className={styles.row}>
            <div>|</div>
            <div className={styles.empty}>
                {finder.matches.numTotalItems} files hidden
                <button
                    type="button"
                    onClick={() => {
                        finder.search.reset();
                        finder.filters.reset();
                    }}
                >
                    [reset]
                </button>
            </div>
            <div>|</div>
        </div>
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

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchInput}>
                <input placeholder="Search" type="text" value={query} onInput={(e) => handleQueryChange(e.currentTarget.value)} />
                {finder.search.hasSearchTerm && (
                    <button type="button" className={styles.resetButton} onClick={handleReset}>
                        x
                    </button>
                )}
            </div>
            <div className={styles.searchSuggestions}>
                {finder.search.suggestedFilters.map((suggestion) => {
                    return (
                        <div className={styles.suggestion} key={suggestion.rule.id}>
                            {suggestion.rule.label}
                            <div className={styles.optionList}>
                                {suggestion.optionMatches?.map((option) => {
                                    return (
                                        <button
                                            type="button"
                                            onClick={() => finder.filters.toggle(suggestion.rule as FilterRuleDefinition, option.value)}
                                            key={option.value}
                                        >
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
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
    const composedOptions = rule.required ? options : [{ value: undefined, label: "Any" }, ...options];
    const selectedOptionIndex = composedOptions.findIndex(({ value }) => value === ruleValue);
    const optionMatches = finder.filters.testRuleOptions(rule);

    return (
        <div className={styles.dropdownContainer}>
            {rule.label}
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
            <button type="button" onClick={() => finder.filters.delete(rule)}>
                Reset
            </button>
        </div>
    );
}

export { SearchImagesFileBrowser };
