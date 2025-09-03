---
slug: "/"
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Finder

**Use static rules to effortlessly sort, filter, search, and group data.**

Don't transform your object into a foreign tabular schema. Write static rules to bridge your existing objects into Finder, and let it worry about state for you.

**Rules**

- Inform Finder how to parse your object
- Encapsulate byte-size logic

<Tabs>
  <TabItem value="shoes" label="Search shoes" default>
    ```ts
    interface Shoe {
        product {
            name: string;
        }
        image_set: string[];
        brand: string;
    }

    // use searchRules to tell Finder which string - or strings! - to compare against your searchterm.
    const rule = searchRule<Shoe>({
        searchFn: (item) => item.product.name
    })

    return <Finder items={shoes} rules={[rule]} />
    ```

</TabItem>
<TabItem value="birds" label="Filter birds">
    ```ts
    interface Avian {
        name: string;
        order: string;
        superorder: string;
        territory: string;
        is_greater_sage_grouse: boolean;
    }

    // filterRules are static predicates. Let Finder worry about the state!
    const rule = filterRule<Avian>({
        filterFn: (birb, value) => birb.territory.includes(value)
        multiple: true
    })

    return <Finder items={birds} rules={[rule]} />
    ```

</TabItem>
<TabItem value="fruits" label="Sort fruits">
    ```ts
    interface Fruit {
        name: string;
        price: number;
        sku: string;
        expiry_date: string;
    }

    // sortByRules define how to order an item list
    const expiryDateRule = sortByRule<Fruit>({
        sortFn: (fruit) => fruit.expiry_date,
        label: "Expiry Date",
        defaultSortOrder: 'desc'
    })
    const priceRule = sortByRule<Fruit>({
        sortFn: (fruit) => fruit.price,
        lbel: "Price lowest to highest"
    })

    return <Finder items={fruits} rules={[priceRule]} />
    ```

</TabItem>
<TabItem value="cars" label="Group cars">
    ```ts
    interface Vehicle {
        name: string;
        make: string;
        model: string;
        melts_in_rain: boolean;
    }

    // groupByRules group items by a common value.
    // Searches, filters, and pagination are still applied.
    const rule = groupByRule<Vehicle>({
        groupFn: (car) => car.make,
        label: "Manufacturer",

        // want to sticky certain groups to the top or bottom of the list?
        // Use the sticky prop to weight them.
        sticky: {
            header: ['Honda', 'Ford']
            footer: 'Bad Cars'
        }
    })

    return <Finder items={vehicles} rules={[rule]} />
    ```

</TabItem>
</Tabs>

## Why use Finder?

**Flexible enough to accomodate any item data shape**

Strings, objects, classes - whatever dataset you're manipulating, you can use a Rule to connect Finder to it. You don't need to transform your object to match an external rubric.

**Reusable**

Static Rules can be shared between Finder instances for reusable searches, filters or grouping. Write a Rule once, use it everywhere you're working with that object.

**Effortless searching**

Extract a string ( or strings ) from your item to search against. Rank searches by closest match to return relevant results faster.

**Highlight submatches within a search string**

The `<Finder.SearchTerm />` component will highlight the segments of your Item's search term.

**Headless**

Finder provides an API for managing controls and displaying results. It doesn't have any opinions on how that should be rendered.

:::info ...why?

Do you _really_ need a whole library for basic data manipulation? Well, maybe!

Filtering and sorting data is the easiest thing in the world, and a disproportionate percentage of webdev tasks. It can _also_ be a disproportionate amount of frustrations as client needs change at the last minute, filters get nested and coupled, and object shape changes.

Without good discipline and planning, data manipulation can become a tech debt quagmire. Finder is intended to make data manipulation easy, fast, and re-usable.
:::
