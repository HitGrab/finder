export interface Listing {
    id: number;
    name: string;
    address: string;
    position: {
        x: number;
        y: number;
    };
    numBedrooms: number;
    isImmediatelyAvailable: boolean;
    price: number;
}
