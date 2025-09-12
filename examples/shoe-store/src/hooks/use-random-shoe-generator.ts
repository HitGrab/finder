/// <reference types="vite/client" />

import { Shoe } from "@/types";
import { brands, colorNames, shoes, sports } from "./shoe-constants";
import { random, range } from "lodash";
import { useEffect, useState } from "react";

const gallery = Object.values(import.meta.glob("/assets/shoes/*.{png,jpg,jpeg,PNG,JPEG}", { eager: true, as: "url" }));

export function useAsyncGetRandomlyGeneratedShoes() {
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState<Shoe[] | undefined>(undefined);
    useEffect(() => {
        mockAsyncQuery().then((data) => {
            setData(data);
            setIsPending(false);
        });
    }, []);
    return { isPending, data };
}

function mockAsyncQuery(): Promise<Shoe[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(gallery.map(randomItem));
        }, 1500);
    });
}

const colorRange = range(0, 10).map(() => {
    const randomColor = colorNames.splice(random(0, colorNames.length - 1), 1);
    if (randomColor.at(0)) {
        return randomColor[0];
    }
    return "red";
});

function randomItem(image: string): Shoe {
    const name = [sports[random(0, sports.length - 1)], shoes[random(0, shoes.length - 1)]].join(" ");
    const minSize = random(7, 10);
    const maxSize = random(10, 13);
    const inStock = random(0, 10) < 8;
    const numColorOptions = random(1, 5);
    const colors = new Set(range(0, numColorOptions).map(() => colorRange[random(0, colorRange.length - 1)]));
    const price = random(50, 300) + random(50, 99) / 100;
    const rating = random(1, 5);
    const sku = `SKU-${random(200, 400)}-${random(100, 400)}`;
    return {
        name,
        image,
        brand: brands[random(0, brands.length - 1)],
        sizes: range(minSize, maxSize),
        in_stock: inStock,
        colors: Array.from(colors),
        price,
        rating,
        sku,
    };
}
