/// <reference types="vite/client" />

const gallery = Object.values(import.meta.glob("/assets/*.{png,jpg,jpeg,PNG,JPEG}", { eager: true, as: "url" }));

import { random, startCase } from "lodash";
import { useEffect, useState } from "react";

export function useGetItems() {
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState<Equipment[] | undefined>(undefined);
    useEffect(() => {
        mockAsyncQuery().then((data) => {
            setData(data);
            setIsPending(false);
        });
    }, []);
    return { isPending, data };
}

function mockAsyncQuery(): Promise<Equipment[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gallery.map(randomItem));
        }, 1000);
    });
}

function randomItem(image: string): Equipment {
    const name = image.substring(image.lastIndexOf("Roman") + 6, image.indexOf(".")).replaceAll("_", " ");
    const rarityIndex = random(1, 35);
    let rarity = "common";
    if (rarityIndex < 5) {
        rarity = "rare";
    } else if (rarityIndex < 10) {
        rarity = "uncommon";
    }

    return {
        name: startCase(name),
        image,
        atk: random(1, 30),
        def: random(1, 30),
        quantity: random(0, 5) % 5 === 0 ? 1 : 0,
        rarity,
    };
}
