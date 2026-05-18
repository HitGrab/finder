import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { faker } from "@faker-js/faker";
import { Finder, FinderContentProps, finderRuleset, groupByRule, sortByRule, useFinder } from "@hitgrab/finder";
import { capitalize, random } from "lodash";

function createVehicle(): Vehicle {
    const make = faker.vehicle.manufacturer();
    return {
        id: faker.string.uuid(),
        make,
        model: faker.vehicle.model(),
        color: capitalize(faker.color.human()),
        year: random(2010, 2030),
        melts_in_rain: make === "Tesla",
        image_index: random(0, 10),
        hue_shift: random(0, 360),
    };
}
const items = faker.helpers.multiple(createVehicle, { count: 100 });

interface Vehicle {
    id: string;
    make: string;
    model: string;
    color: string;
    year: number;
    melts_in_rain: boolean;
    image_index: number;
    hue_shift: number;
}

const ruleset = finderRuleset<Vehicle>([
    groupByRule({
        id: "group_by_make",
        label: "Manufacturer",
        groupFn: (car) => car.make,
        sortGroupFn: (group) => group.id,

        // want to sticky certain groups to the top or bottom of the list?
        // Use the sticky prop to weight them.
        sticky: {
            header: ["Honda", "Ford"],
            footer: "Tesla",
        },
    }),
    groupByRule({
        id: "group_by_year",
        label: "Year",
        groupFn: (car) => car.year,
        defaultGroupSortDirection: "desc",
    }),
    groupByRule({
        id: "group_by_color",
        label: "Color",
        groupFn: (car) => car.color,
    }),
    sortByRule({
        id: "year",
        sortFn: (item) => item.year,
    }),
]);

function GroupByExample() {
    return (
        <Finder items={items} rules={ruleset} requireGroup={true}>
            <div className="card assetCard">
                <div className="card__header">
                    <h3>Groupable Cars</h3>
                </div>
                <div className="scrollable">
                    <div className="scrollable__content">
                        <Finder.Content>{{ groups: GroupedItems }}</Finder.Content>
                    </div>
                </div>
                <div className="card__footer">
                    <GroupByControl />
                    <div className="listContainer__credits">Assets from https://jackburton84.itch.io/80s-pixel-cars-pack-retro-vehicle-sprites</div>
                </div>
            </div>
        </Finder>
    );
}

function GroupedItems({ groups }: FinderContentProps<Vehicle>["groups"]) {
    const { withBaseUrl } = useBaseUrlUtils();
    return (
        <div className="assetTable">
            {groups.map((group) => {
                return (
                    <div className="row" key={group.id}>
                        <div>
                            <h4>
                                {group.id} ({group.items.length})
                            </h4>
                            <div className="assetTable">
                                {group.items.map((item) => {
                                    return (
                                        <div className="row" key={item.id}>
                                            <div>
                                                <div
                                                    className="asset__image--car"
                                                    style={
                                                        {
                                                            backgroundImage: `url(${withBaseUrl("/img/cars/cars.png")})`,
                                                            filter: `hue-rotate(${item.hue_shift}deg)`,
                                                            "--image-index": item.image_index,
                                                        } as React.CSSProperties
                                                    }
                                                />
                                                <div>
                                                    <b>
                                                        {item.year} {item.model}
                                                    </b>
                                                    <br /> {item.color}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function GroupByControl() {
    const finder = useFinder();
    return (
        <div className="button-group button-group--block">
            {finder.groupBy.rules.map((rule) => {
                const isChecked = finder.groupBy.activeRule?.id === rule.id;
                return (
                    <button
                        type="button"
                        className={`button button--primary ${isChecked ? "" : "button--outline"}`}
                        key={rule.id}
                        onClick={() => finder.groupBy.set(rule)}
                    >
                        {rule.label}
                    </button>
                );
            })}
        </div>
    );
}

export { GroupByExample };
