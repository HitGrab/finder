import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { faker } from "@faker-js/faker";
import { filterRule, Finder, FinderContentProps, finderRuleset, useFinder } from "@hitgrab/finder";
import { random } from "lodash";

interface Avian {
    name: string;
    territory: string;
    image_index: number;
}

const HABITATS = [
    "Ontario",
    "Quebec",
    "Nova Scotia",
    "New Brunswick",
    "Manitoba",
    "British Columbia",
    "Prince Edward Island",
    "Saskatchewan",
    "Alberta",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
];

function createBird(): Avian {
    return {
        name: faker.animal.bird(),
        territory: HABITATS[random(0, HABITATS.length - 1)],
        image_index: random(0, 36),
    };
}
const items = faker.helpers.multiple(createBird, { count: 100 });

const ruleset = finderRuleset<Avian, string>([
    filterRule({
        id: "habitat",
        filterFn: (item, value) => value == item.territory,
        options: ({ items }) => {
            const allTerritory = new Set(items.map((i) => i.territory));
            return Array.from(allTerritory)
                .sort()
                .map((t) => {
                    return {
                        value: t,
                    };
                });
        },
    }),
]);

function FilterExample() {
    return (
        <Finder items={items} rules={ruleset}>
            <div className="card assetCard">
                <div className="card__header">
                    <h3>Filter Fowl</h3>
                </div>
                <div className="assetCard__controls">
                    <DropdownFilter ruleId="habitat" />
                </div>
                <div className="scrollable">
                    <div className="scrollable__content">
                        <Finder.Content>{{ items: FilterItems, noMatches: "No matches found" }}</Finder.Content>
                    </div>
                </div>
                <div className="card__footer">
                    <div className="listContainer__credits">Assets from https://onocentaur.itch.io/birds</div>
                </div>
            </div>
        </Finder>
    );
}

function FilterItems({ items }: FinderContentProps<Avian>["items"]) {
    const { withBaseUrl } = useBaseUrlUtils();
    return (
        <div className="assetTable">
            {items.map((item) => {
                return (
                    <div className="row" key={[item.territory, item.name, item.image_index].join("")}>
                        <div>
                            <div
                                className=" asset__image--bird"
                                style={
                                    { backgroundImage: `url(${withBaseUrl("/img/birds/birds.png")})`, "--image-index": item.image_index } as React.CSSProperties
                                }
                            />
                            <b>
                                <Finder.SearchTermHaystack>{item.name}</Finder.SearchTermHaystack>
                            </b>
                            <br />
                            Habitat: {item.territory}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

interface DropdownFilterProps {
    ruleId: string;
}
function DropdownFilter({ ruleId }: DropdownFilterProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    const hasValue = finder.filters.has(ruleId);
    const ruleValue = finder.filters.get(rule);
    const options = rule.options ?? [];
    const composedOptions = rule.required ? options : [{ value: undefined, label: "All" }, ...options];
    const selectedOptionIndex = composedOptions.findIndex(({ value }) => value === ruleValue);
    const optionMatches = finder.filters.testRuleOptions(rule);

    return (
        <select
            className={`button button-block ${hasValue ? "" : "empty"}`}
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

export { FilterExample };
