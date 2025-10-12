import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { faker } from "@faker-js/faker";
import { filterRule, Finder, FinderContentItemProps, finderRuleset, useFinder } from "@hitgrab/finder";
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
    "SasketchSaskatchewan",
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
        filterFn: (item, value) => {
            return value == item.territory;
        },
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
            <div className="listContainer">
                <div className="listContainer__stickyHeader">
                    <DropdownFilter ruleId="habitat" />
                </div>
                <div className="listContainer__content">
                    <Finder.Content>{{ items: FilterItems, noMatches: "No matches found" }}</Finder.Content>
                </div>
            </div>
            <div className="listContainer__credits">Assets from https://onocentaur.itch.io/birds</div>
        </Finder>
    );
}

function FilterItems({ items }: FinderContentItemProps<Avian>) {
    const { withBaseUrl } = useBaseUrlUtils();
    return items.map((item) => {
        return (
            <div className="listContainer__itemWithImage" key={[item.territory, item.name].join("")}>
                <div>
                    <div
                        className="listContainer__image listContainer__image--bird"
                        style={{ backgroundImage: `url(${withBaseUrl("/img/birds/birds.png")})`, "--image-index": item.image_index } as React.CSSProperties}
                    />
                </div>
                <div>
                    <b>
                        <Finder.SearchTermHaystack>{item.name}</Finder.SearchTermHaystack>
                    </b>
                    <br />
                    Habitat: {item.territory}
                </div>
            </div>
        );
    });
}

interface DropdownFilterProps {
    ruleId: string;
}
function DropdownFilter({ ruleId }: DropdownFilterProps) {
    const finder = useFinder();
    const rule = finder.filters.getRule(ruleId);
    const ruleValue = finder.filters.get(rule);
    const composedOptions = rule.required ? rule.options : [{ value: undefined, label: "All" }, ...rule.options];
    const selectedOptionIndex = composedOptions.findIndex(({ value }) => value === ruleValue);
    const optionMatches = finder.filters.testRuleOptions({ rule });
    return (
        <select
            value={selectedOptionIndex}
            onChange={(e) => {
                const selectedOption = composedOptions.at(e.currentTarget.selectedIndex);
                finder.filters.set(ruleId, selectedOption.value);
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
                    // eslint-disable-next-line react/no-array-index-key
                    <option value={index} key={index}>
                        {option.label || option.value} ({numMatches})
                    </option>
                );
            })}
        </select>
    );
}

export { FilterExample };
