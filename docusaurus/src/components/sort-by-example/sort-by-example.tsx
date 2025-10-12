import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { faker } from "@faker-js/faker";
import { Finder, FinderContentItemProps, finderRuleset, sortByRule, useFinder } from "@hitgrab/finder";
import { capitalize, random } from "lodash";

function createFruit(): Fruit {
    return {
        name: faker.food.fruit(),
        price: random(0.5, 10),
        sku: faker.string.uuid(),
        expiry_date: faker.date.future({ years: 0.1 }),
        image_index: random(0, 149),
    };
}
const items = faker.helpers.multiple(createFruit, { count: 100 });

interface Fruit {
    name: string;
    price: number;
    sku: string;
    expiry_date: Date;
    image_index: number;
}

const ruleset = finderRuleset<Fruit>([
    sortByRule({
        id: "expiry_date",
        sortFn: (fruit) => fruit.expiry_date.getTime(),
        label: "Expires soon",
        defaultSortDirection: "asc",
    }),
    sortByRule({
        id: "price",
        sortFn: (fruit) => fruit.price,
        label: "Price lowest to highest",
    }),
]);

function SortByExample() {
    return (
        <Finder items={items} rules={ruleset}>
            <div className="listContainer">
                <div className="listContainer__stickyHeader">
                    <RadioSortBy />
                </div>
                <div className="listContainer__content">
                    <Finder.Content>{{ items: FilterItems, noMatches: "No matches found" }}</Finder.Content>
                </div>
            </div>
            <div className="listContainer__credits">Assets from https://ninjikin.itch.io/fruit</div>
        </Finder>
    );
}

function FilterItems({ items }: FinderContentItemProps<Fruit>) {
    const { withBaseUrl } = useBaseUrlUtils();
    return items.map((item) => {
        return (
            <div className="listContainer__itemWithImage listContainer__image--fruit" key={item.sku}>
                <div>
                    <div
                        className="listContainer__image"
                        style={{ backgroundImage: `url(${withBaseUrl("/img/fruit/fruit.png")})`, "--image-index": item.image_index } as React.CSSProperties}
                    />
                    <div>
                        <b>
                            <Finder.SearchTermHaystack>{capitalize(item.name)}</Finder.SearchTermHaystack>
                        </b>
                        <br />
                        Best before:{" "}
                        {item.expiry_date.toLocaleDateString("en-us", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                        })}
                    </div>
                </div>

                <div>{new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(item.price)}</div>
            </div>
        );
    });
}

function RadioSortBy() {
    const finder = useFinder();

    return finder.sortBy.rules.map((rule) => {
        const isChecked = finder.sortBy.activeRule === rule;
        return (
            <label key={rule.id}>
                <input type="radio" checked={isChecked} onChange={() => finder.sortBy.set(rule)} />
                {rule.label}
            </label>
        );
    });
}

export { SortByExample };
