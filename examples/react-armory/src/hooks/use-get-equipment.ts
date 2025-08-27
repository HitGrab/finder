/// <reference types="vite/client" />

const GALLERY = Object.values(import.meta.glob("/assets/*.{png,jpg,jpeg,PNG,JPEG}", { eager: true, as: "url" }));
const NUM_ITEMS = 60;

import { random, range, startCase } from "lodash";
import { useEffect, useState } from "react";

export function useGetEquipment() {
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
            resolve(range(0, NUM_ITEMS).map(randomItem));
        }, 1000);
    });
}

function randomItem(index: number): Equipment {
    const name = [adjectives[random(0, adjectives.length - 1)], nouns[random(0, nouns.length - 1)]].join(" ");
    const rarityIndex = random(1, 35);
    let rarity = "common";
    if (rarityIndex < 5) {
        rarity = "rare";
    } else if (rarityIndex < 10) {
        rarity = "uncommon";
    }

    const image = GALLERY[random(0, GALLERY.length - 1)];

    return {
        name: startCase(name),
        image,
        atk: random(1, 30),
        def: random(1, 30),
        quantity: random(0, 5) % 5 === 0 ? 1 : 0,
        key: [name, index].join(),
        rarity,
    };
}

const adjectives = ["Hellforged", "Bronze", "Silver", "Gold", "Mithril", "Cherry", "Cotton", "Emerald", "Cardboard", "Salamander", "Dark", "Light"];
const nouns = ["Uniform", "Suit", "Gown", "Plate", "Scales", "Mail", "Cloth", "Tribune", "Leisure Suit", "Scrubs", "Outfit", "Bathrobe"];
