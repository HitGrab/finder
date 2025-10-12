---
sidebar_position: 1
description: How do I find you when I cannot solve this problem
---

# Basic Usage

# Installation

Run `npm i @hitgrab/finder` in your repo of choice.

## Building an Apartment Rental app

**User Story:** Joe McUser wants to find an affordable apartment from your listings.

This short tutorial will introduce you to the power of Rules, and how quickly you can implement complex data manipulations.

We'll build some rules, render them into a component, and build a few controls along the way.

**Finder needs two things:**

1. **Rules** to tell Finder how to access your item object, and encapsulate any required logic.
2. **Items** in a flat array of strings, objects, classes or other iterable data.

For this example, we'll assume Apartment Listings have a shape of:

```ts
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
