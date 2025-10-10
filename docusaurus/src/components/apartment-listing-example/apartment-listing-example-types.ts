export interface ApartmentListing {
    id: number;
    name: string;
    price: number;
    address: {
        street_address: string;
        secondary_address: string;
    };
    num_bedrooms: number;
    is_available_immediately: boolean;
}
