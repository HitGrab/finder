import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { faker } from "@faker-js/faker";
import { Finder, FinderContentProps, finderRuleset, sortByRule, useFinder } from "@hitgrab/finder";
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
            <div className="card assetCard">
                <div className="card__header">
                    <h3>Ye Olde Banana Stand</h3>
                </div>
                <div className="card__image scrollable">
                    <div className="scrollable__content">
                        <Finder.Content>{{ items: FilterItems, noMatches: "No matches found" }}</Finder.Content>
                    </div>
                </div>
                <div className="card__footer">
                    <SortByControl />
                    <div className="listContainer__credits">Assets from https://ninjikin.itch.io/fruit</div>
                </div>
            </div>
        </Finder>
    );
}

function FilterItems({ items }: FinderContentProps<Fruit>["items"]) {
    const { withBaseUrl } = useBaseUrlUtils();
    return (
        <div className="assetTable">
            {items.map((item) => {
                return (
                    <div className="row" key={item.sku}>
                        <div>
                            <div
                                className="asset__image--fruit"
                                style={
                                    {
                                        backgroundImage: `url(${withBaseUrl("/img/fruit/fruit.png")})`,
                                        "--image-index": item.image_index,
                                    } as React.CSSProperties
                                }
                            />
                            <b>
                                <Finder.SearchTermHaystack>{capitalize(item.name)}</Finder.SearchTermHaystack>
                            </b>
                            <br />
                            Expires:{" "}
                            {item.expiry_date.toLocaleDateString("en-us", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                        <div className="text--right">{new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(item.price)}</div>
                    </div>
                );
            })}
        </div>
    );
}

function SortByControl() {
    const finder = useFinder();
    return (
        <div className="button-group button-group--block">
            {finder.sortBy.rules.map((rule) => {
                const isChecked = finder.sortBy.activeRule === rule;
                return (
                    <button
                        type="button"
                        className={`button button--primary ${isChecked ? "" : "button--outline"}`}
                        key={rule.id}
                        onClick={() => finder.sortBy.set(rule)}
                    >
                        {rule.label}
                    </button>
                );
            })}
        </div>
    );
}

export { SortByExample };
