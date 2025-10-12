import { Finder, FinderContentGroupProps, finderRuleset, groupByRule } from "@hitgrab/finder";
import React, { useState, useMemo, Fragment } from "react";
import styles from "./styles.module.css";
import { faker } from "@faker-js/faker";
import { kebabCase, random } from "lodash";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";

interface Food {
    id: string;
    price: number;
    image_index: number;
}

interface PetFoodStoreContext {
    numCoins: number;
}

function createFood(): Food {
    return {
        id: faker.string.uuid(),
        price: random(1, 10),
        image_index: random(0, 31),
    };
}
const rules = finderRuleset<Food, PetFoodStoreContext>([
    groupByRule({
        id: "can_afford",
        groupFn: (item, context) => {
            return item.price < context.numCoins ? "Can purchase" : "Too expensive";
        },
        sticky: {
            header: "Can purchase",
        },
    }),
]);

const items = faker.helpers.multiple(createFood, { count: 20 });

function PetFoodStore() {
    const [numCoins, setNumCoins] = useState<number>(7);
    const context: PetFoodStoreContext = useMemo(() => {
        return {
            numCoins,
        };
    }, [numCoins]);

    return (
        <div className={styles.container}>
            <Finder items={items} rules={rules} context={context} requireGroup={true}>
                <b>Hello Lindsay, you have ${numCoins}.</b>
                <div className={styles.control}>
                    $0
                    <input type="range" value={numCoins} min={0} max={20} onInput={(e) => setNumCoins(Number(e.currentTarget.value))} />
                    $20
                </div>
                <div className={styles.list}>
                    <Finder.Content>
                        {{
                            groups: PetFoodStoreGroups,
                        }}
                    </Finder.Content>
                </div>
                <div className="listContainer__credits">Assets from https://mohammed-23446.itch.io/32-16x16-food-sprites</div>
            </Finder>
        </div>
    );
}

function PetFoodStoreGroups({ groups }: FinderContentGroupProps<Food>) {
    const { withBaseUrl } = useBaseUrlUtils();
    return groups.map((group) => {
        return (
            <Fragment key={group.id}>
                {group.items.map((item) => {
                    return (
                        <div className={styles.item} data-group-id={kebabCase(group.id)} key={item.id}>
                            <div
                                className={styles.image}
                                style={
                                    {
                                        backgroundImage: `url(${withBaseUrl("/img/food/food.png")})`,
                                        "--image-index": item.image_index,
                                    } as React.CSSProperties
                                }
                            />
                            ${item.price}
                        </div>
                    );
                })}
            </Fragment>
        );
    });
}

export { PetFoodStore };
