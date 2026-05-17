# Quick Start

## Building an Apartment Rental app

**User Story:** Joe McUser wants to find an affordable apartment from your listings.

This short tutorial will introduce you to the power of Rules, and how quickly you can implement complex data manipulations.

We'll build some rules, render them into a component, and build a few controls along the way.

For this example, we'll assume Apartment Listings have a shape of:

```ts
// rules.ts
interface ApartmentListing {
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
```
