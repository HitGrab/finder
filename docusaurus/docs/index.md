---
slug: "/"
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { SearchExample } from '/src/components/search-example/search-example';
import { SearchExampleWithIcons } from '/src/components/search-example/search-example-with-icons';
import { FilterExample } from '/src/components/filter-example/filter-example';
import { SortByExample } from '/src/components/sort-by-example/sort-by-example';
import { GroupByExample } from '/src/components/group-by-example/group-by-example';

# Finder

<span style={{float:'left'}}>![Example banner](/img/finder.jpg)</span>

## Use static rules to effortlessly sort, filter, search, and group data of any shape.

Objects, classes, strings; whatever dataset you're manipulating, you can use a Rule to connect Finder to manipulate it. You don't need to transform your object to match an external rubric.

**Reusable**

Rules are object literals that can create reusable searches, filters, sorting, or grouping. Write a Rule once, use it everywhere you're working with that object - catalog, customer orders, monthly dashboards and so on!

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

**Coupled Rules**

If you have rules that need to interact with each other, you can add ruleEffects to listen for rule changes. If certain filters are mutually incompatible, or you need to reset the sortBy rules when the active groupBy rule changes, ruleEffects will get it done.

**Headless**

Finder provides an API for managing rules and displaying matches. It doesn't have any opinions on how matches or controls should be rendered.

**Rule Examples**

<Tabs>
  <TabItem value="shoes" label="Search shoes" default>
  <div class="container padding-left--none padding-right--none">
  <div class="row">
    <div class="col col--8">
```ts
interface Shoe {
    product {
        name: string;
    }
    image: string;
}

const rule = searchRule<Shoe>({
searchFn: (item) => item.product.name
})

return <Finder items={shoes} rules={[rule]} />

````
    </div>
    <div class="col col--4">
    <SearchExampleWithIcons />
    </div>
    </div>

</div>

</TabItem>
<TabItem value="birds" label="Filter birds">
<div class="container padding-left--none padding-right--none">
    <div class="row">
        <div class="col col--8">
            ```ts
            interface Avian {
                name: string;
                territory: string;
            }

            const rule = filterRule<Avian>({
                id: 'territory_filter',
                filterFn: (birb, value) => birb.territory === value;
            })

            return <Finder items={birds} rules={[rule]} />
            ```
        </div>
        <div class="col col--4">
            <FilterExample />
        </div>
    </div>

</div>

</TabItem>
<TabItem value="fruits" label="Sort fruits">
<div class="container padding-left--none padding-right--none">
    <div class="row">
        <div class="col col--8">
    ```ts
    interface Fruit {
        name: string;
        price: number;
        expiry_date: Date;
    }

    const ruleset = [
        sortByRule<Fruit>({
            id: 'expiry_date',
            sortFn: (fruit) => fruit.expiry_date.getTime(),
            label: "Expires soon",
            defaultSortDirection: 'desc'
        }),
        sortByRule<Fruit>({
            id: 'price',
            sortFn: (fruit) => fruit.price,
            label: "Price lowest to highest"
        }
    ]);

    return <Finder items={fruits} rules={ruleset} />
    ```
    </div>
        <div class="col col--4">
            <SortByExample />
        </div>
    </div>
</div>

</TabItem>
<TabItem value="cars" label="Group cars">
<div class="container padding-left--none padding-right--none">
    <div class="row">
        <div class="col col--8">
    ```ts
    interface Vehicle {
        name: string;
        make: string;
        model: string;
        melts_in_rain: boolean;
    }

    const rule = groupByRule<Vehicle>({
        id: 'group_by_make',
        groupFn: (car) => car.make,
        label: "Make",

        // want to sticky certain groups to the top or bottom of the list?
        // Use the sticky prop to weight them.
        sticky: {
            header: ['Honda'],
            footer: 'Tesla'
        }
    })

    return <Finder items={vehicles} rules={[rule]} requireGroup={true} />
    ```
</div>
        <div class="col col--4">
            <GroupByExample />
        </div>
    </div>
</div>
</TabItem>
</Tabs>

:::info Do you _really_ need a whole library for basic data manipulation?

Filtering and sorting data is the easiest thing in the world, and a disproportionate percentage of webdev tasks. It can _also_ be a disproportionate amount of frustrations as client needs change at the last minute, filters get nested and coupled, and object shape changes.

Without good discipline and planning, data manipulation can become a spaghetti mountain of boilerplate. Finder is intended to make data manipulation easy, type-safe, and reusable.
:::
````
