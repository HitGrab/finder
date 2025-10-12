import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { faker } from "@faker-js/faker";
import { Finder, FinderContentGroupProps, finderRuleset, groupByRule, sortByRule, useFinder } from "@hitgrab/finder";
import { random } from "lodash";

function createVehicle(): Vehicle {
    return {
        id: faker.string.uuid(),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: random(2010, 2030),
        melts_in_rain: false,
        image_index: random(0, 10),
        hue_shift: random(0, 360),
    };
}
const items = faker.helpers.multiple(createVehicle, { count: 100 });

interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    melts_in_rain: boolean;
    image_index: number;
    hue_shift: number;
}

const ruleset = finderRuleset<Vehicle>([
    groupByRule({
        id: "group_by_make",
        groupFn: (car) => car.make,
        label: "Manufacturer",
        sortGroupFn: (group) => group.id,

        // want to sticky certain groups to the top or bottom of the list?
        // Use the sticky prop to weight them.
        sticky: {
            header: ["Honda", "Ford"],
            footer: "Tesla",
        },
    }),
    sortByRule({
        id: "year",
        sortFn: (item) => item.year,
    }),
]);

function GroupByExample() {
    return (
        <Finder items={items} rules={ruleset} requireGroup={true}>
            <div className="listContainer">
                <div className="listContainer__content">
                    <Finder.Content>{{ groups: GroupedItems }}</Finder.Content>
                </div>
            </div>
            <div className="listContainer__credits">Assets from https://jackburton84.itch.io/80s-pixel-cars-pack-retro-vehicle-sprites</div>
        </Finder>
    );
}

function GroupedItems({ groups }: FinderContentGroupProps<Vehicle>) {
    const { withBaseUrl } = useBaseUrlUtils();
    return groups.map((group) => {
        return (
            <div className="listContainer__itemGroup" key={group.id}>
                <div className="listContainer__itemGroupLabel">
                    {group.id} ({group.items.length})
                </div>
                <div className="listContainer__itemGroupContent">
                    {group.items.map((item) => {
                        return (
                            <div className="listContainer__itemWithImage" key={item.id}>
                                <div>
                                    <div
                                        className="listContainer__image listContainer__image--car"
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
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    });
}

export { GroupByExample };
