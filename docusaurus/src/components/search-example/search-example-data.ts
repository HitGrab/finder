import { random, range } from "lodash";

const sports = [
    "Sportsball",
    "Baseball",
    "Basketball",
    "Soccer",
    "Rugby",
    "Tennis",
    "Curling",
    "Cricket",
    "Pingpong",
    "Football",
    "Dodgeball",
    "Volleyball",
    "Golf",
    "Ballet",
];
const shoes = [
    "Slippers",
    "Boots",
    "Sneakers",
    "Galoshes",
    "Cleats",
    "Elevator Shoes",
    "Shoes",
    "Heels",
    "Platform shoes",
    "Sandals",
    "Steel-toe Boots",
    "Waders",
];
const brands = ["Rackpart", "Timbrescape", "Daschund", "Dr. Martini", "Strike", "True Balance", "Grizzly", "South Portrait"];

export function generateItems(numItems = 10) {
    return range(0, numItems).map((value) => {
        return {
            name: [sports[random(0, sports.length - 1)], shoes[random(0, shoes.length - 1)]].join(" "),
            brand: brands[random(0, brands.length - 1)],
            sku: `SKU-100${value}`,
        };
    });
}
