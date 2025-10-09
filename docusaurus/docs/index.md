---
slug: "/"
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { SearchExample } from '/src/components/search-example/search-example';

# Finder

### Why use Finder?

**Use static rules to effortlessly sort, filter, search, and group data.**

Objects, classes, strings; whatever dataset you're manipulating, you can use a Rule to connect Finder to manipulate it. You don't need to transform your object to match an external rubric.

**Reusable**

Rules are object literals that can be shared to create reusable searches, filters or grouping. Write a Rule once, use it everywhere you're working with that object - catalog, customer orders, monthly dashboards and so forth!

<div class="container padding-left--none padding-right--none">
  <div class="row row--no-gutters">
    <div class="col col--7">
      <div class="col-demo">
      **Effortless string matching**

Extract a string ( or strings ) from your item to search against. Rank searches by closest match to return relevant results faster. The `<Finder.SearchTermHaystack />` component will highlight the matching segments of your Item's search term.

</div>
    </div>
    <div class="col col--5">
      <div class="col-demo"><SearchExample /></div>
    </div>
  </div>
  </div>

**Headless**

Finder provides an API for managing rules and displaying matches. It doesn't have any opinions on how that should be rendered.

**Rule Examples**

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
            footer: 'Less cool cars'
        }
    })

    return <Finder items={vehicles} rules={[rule]} />
    ```

</TabItem>
</Tabs>

:::info Do you _really_ need a whole library for basic data manipulation?

Well, maybe!

Filtering and sorting data is the easiest thing in the world, and a disproportionate percentage of webdev tasks. It can _also_ be a disproportionate amount of frustrations as client needs change at the last minute, filters get nested and coupled, and object shape changes.

Without good discipline and planning, data manipulation can become a tech debt quagmire. Finder is intended to make data manipulation easy, fast, and re-usable.
:::
