import { Listing } from "@/types";
import { random, range } from "lodash";

const STREET_NAMES = ["Baker", "Downtown", "Cloverfield", "Yellowbrick", "Abbey", "Royal", "Beale", "Bourbon", "Orchard", "Yonge", "Dundas", "Trafalgar"];
const ADDRESS_SUFFIX = ["street", "road", "avenue", "boulevard", "crescent", "circle", "lane", "path", "square", "rhombus", "triangle"];

export function useGetListings(): Listing[] {
    return range(0, 50).map((value) => {
        return {
            id: random(0, 9999),
            name: "Manor",
            address: [random(1, 100), STREET_NAMES[random(0, STREET_NAMES.length - 1)], ADDRESS_SUFFIX[random(0, ADDRESS_SUFFIX.length - 1)]].join(" "),
            position: {
                x: random(-800, 800),
                y: random(-800, 800),
            },
            numBedrooms: random(1, 3),
            isImmediatelyAvailable: !!random(0, 1),
            price: random(1000, 10000),
        };
    });
}
