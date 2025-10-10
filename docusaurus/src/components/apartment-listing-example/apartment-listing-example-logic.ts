import { faker } from "@faker-js/faker";
import { ApartmentListing } from "./apartment-listing-example-types";
import { random } from "lodash";

export function createListing() {
    return {
        id: faker.number.int(),
        name: `${faker.person.lastName()} Manor`,
        price: faker.number.int({ min: 200, max: 3500 }),
        address: {
            street_address: faker.location.streetAddress(),
            secondary_address: faker.location.secondaryAddress(),
        },
        num_bedrooms: faker.number.int({ min: 1, max: 5 }),
        is_available_immediately: random(0, 1) ? true : false,
    };
}

export function useApartmentListings(): ApartmentListing[] {
    return faker.helpers.multiple(createListing, { count: 30 });
}
