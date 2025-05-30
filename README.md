<a name="readme-top"></a>
<h1 align='center'>finder</h1>


<div align='center'><small><i>Headless datatable management for things that aren't tables.</i></small></div>


<h4>Features</h4>
<div align="center">

[![Search][Search]](#search)
[![Filter][Filter]](#filter)
[![sortBy][sortBy]](#sortBy)
[![groupBy][groupBy]](#groupBy)
[![StickyResults][StickyResults]](#stickyresults)
[![onChangeonInit][onChangeonInit]](#events)
[![Metadata][Metadata]](#metadata)
[![Pagination][Pagination]](#pagination)

</div>
<details>
<summary>Table of Contents</summary>
  <ul>
      <li><a href="#basic-usage">Basic Usage</a></li>
    <li><a href="#search">Search</a></li>
    <li><a href="#filters">Filter</a></li>
    <li><a href="#sortby">Sort</a></li>
    <li><a href="#groupby">Group</a></li>
          <li><a href="#events">Events</a></li>
      <li><a href="#metadata">Metadata</a></li>
      <li><a href="#onchange-and-oninit-events">Componenet Library</a></li>
       <li><a href="#onchange-and-oninit-events">Example Usage</a></li>
  </ul>
</details>


[Search]: https://img.shields.io/badge/Search-20232A?style=for-the-badge
[Filter]: https://img.shields.io/badge/Filter-ffffff?style=for-the-badge
[sortBy]: https://img.shields.io/badge/sortBy-333333?style=for-the-badge
[groupBy]: https://img.shields.io/badge/groupBy-222222?style=for-the-badge
[StickyResults]: https://img.shields.io/badge/Sticky_Results-555555?style=for-the-badge
[onChangeonInit]: https://img.shields.io/badge/onChange_and_onInit_Event_Handling-444444?style=for-the-badge
[Pagination]: https://img.shields.io/badge/Pagination_Support-888888?style=for-the-badge
[Metadata]: https://img.shields.io/badge/Metadata_Acceptance-888888?style=for-the-badge



## Basic Usage

Define a static rule array, and pass them to the Finder component. Finder will provides a context with any matches, and an API to activate or mutate rules.


Finder processes rules in the following order:
1. [Search](#search)  
2. [Filters](#filters)  
3. [SortBy](#sortby)  
4. [Paginate](#pagination)  
5. [GroupBy](#groupby)  

#### Basic example of usage:
```ts
function SearchControlComponent() {
    const finder = useFinderContext();
    return <input type="text" onInput={(e) => finder.search.setSearchTerm(e.currentTarget.value)} />
}

function Gallery() {
    const items = [...]
    const rules = [
        searchRule({
            searchFn: (item, searchTerm) => item.name.includes(searchTerm)
        })
    ];
    return(
        <Finder items={items} rules={rules}>
            <SearchControlComponent />
            <FinderItems>
                {(items) =>
                    <div>
                        {items.map((item) => <ItemDisplay item={item} />)}
                    </div>
            </FinderItems>
        </Finder>
    )
}
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Rules

All rules ( with the exception of SearchRules ) must have a unique id for their namespace. If you have two filters with the same id, Finder will error out.

### Search

Match text against your item properties.

Only a single search rule can be defined per Finder instance. If you need to do multiple kinds of text searches, consider a Filter!

```ts
searchRule({
    searchFn: (item: FItem, searchTerm: string, meta?: FinderMeta) => boolean;
    debounceDelay?: number;
})
```

Pro-tips:

- You can use `searchRule()` to ensure your rule has a valid shape.
- Use `finderStringCompare` to do a case-insensitive search that removes whitespace and line breaks.
- If you have an enormous volume of data to process, you can add a `debounceDelay`.

[SearchDocs](/src/classes/mixins/search/search.ts)

### Filters

Define a filter predicate that will return a boolean for each item. If multiple filters are active, all filters must match for an item to be returned.

```ts
filterRule({
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: FinderMeta) => boolean;
    options?: FinderOption<FValue>[] | ((items: FItem[], meta?: FinderMeta) => FinderOption<FValue>[]);
    multiple?: boolean;
    required?: boolean;
    isBoolean?: boolean;
    debounceDelay?: number;
})
```

| Prop          | Description                                                                                                                                                          | Default | Required |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id            | Every filter rule must have a unique string id.                                                                                                                      |         | ✓        |
| filterFn      | A predicate that returns a boolean. Note that it receives a Meta parameter, which can be any instance-wide arbitrary data.                                           |         | ✓        |
| options       | Either an array of form options `[{label: 'Thing', value: 'thing'}]`, or a function to generate those options `(items, meta) => [{label: 'Thing', value: 'thing'}]`. |         |
| multiple      | If this filter has a single value or an array of values.                                                                                                             | false   |
| required      | Whether this filter must always have a value. If the rule provides options, the first option will be selected by default.                                            | false   |
| isBoolean     | If this filter has a true/false value. Useful for checkboxes!                                                                                                        | false   |
| debounceDelay | If you want to debounce value changes, enter a time in milliseconds.                                                                                                 |

Pro-tips:

- If a rule generates options with a function, Finder will hydrate the rule with a stable options array before emitting it to context.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## SortBy

This option sorts the items passed in and accepts either a simple value or a function to run on each item to determine the order of return.

```ts
sortByRule({
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultSortDirection?: "asc" | "desc";
})
```

| Prop                 | Description                                                                                                                | Default | Required |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id                   | Every sortBy rule must have a unique string id.                                                                            |         | ✓        |
| sortFn               | A predicate that returns a boolean. Note that it receives a Meta parameter, which can be any instance-wide arbitrary data. |         | ✓        |
| defaultSortDirection | 'asc' or 'desc'.                                                                                                           | 'asc'   |          |

Pro-tips:

- Only a single sortBy rule can be active at one time.
- If any sortBy rules are provided and no specific rule is set, the first sortBy rule in the stack will be considered active.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## GroupBy
Takes the returned items and groups them by the passed in paramaters.

```ts
groupByRule({
    id: string;
    groupFn: (item) => string | number;
    sortGroupIdFn?: (group) => string | number;
    groupIdSortDirection?: "asc" | "desc";
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
})
```



| Prop          | Description                                                                                                                   | Default | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id            | Every groupBy rule must have a unique string id.                                                                              |         | ✓        |
| groupFn       | A predicate operating on the item object that returns a string or number. Items with the same value will be grouped together. |         | ✓        |
| sortGroupIdFn | While any sortBy rules will operate on the items first, sortGroupIdFn allows you to sort the groups themselves.               |         |
| sticky        | Specify group ids that should be stickied to the top or bottom of the results.                                                |

Pro-tips:

- Only a single groupBy rule can be active at one time.
- If the Finder instance has `requireGroup` enabled and no groupBy rule is active, the first rule in the stack will be considered active.
- If you want a group of premium items to always appear first in the results, you can set `sticky: {header: 'premium_id' }`. If an array is provided, the order will be preserved ( i.e: `sticky: { header: ['premium_id', 'subpremium_id']})`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Events

### onInit

Triggered a single time after Finder receives a rule value.

### onChange

`(diff: FinderDiff, ref: FinderInstance) => void`
<br/>
Returns the 'diff', the most recently changed option that caused the re-trigger of the Finder function as well as a new new FinderInstance. The FinderInstance will retain all previous options, and previously selected options can be accessed through this new instance. 

This is triggered whenever a rule value or core property changes. Diffs may include:

```ts
    filters?: Record<string, any>;
    searchTerm?: string;
    sortBy?: string;
    sortDirection?: string;
    groupBy?: string;
    selectedItems?: FItem[];
    meta?: FinderMeta;
    page?: number;
    numItemsPerPage?: number;
    maxSelectedItems?: number;
    groupIdSortDirection?: string;
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Pagination

*Please note that pagination is not the final option considered in the functionality of the filtering / sorting process, therefore groupBy options could return unexpected results.*
<br/>
<br/>
If the `numItemsPerPage` property is set, Finder will paginate items and groups. 
<br/>
<br/>

```ts
function DeclarativePaginationComponent() {
    const items = [...]
    const rules = [...]

    const page = 1;
    const numItemsPerPage = 10;

    return (
        <Finder items={items} rules={rules} page={page} numItemsPerPage={numItemsPerPage}>
            ...contents
        </Finder>
    );
}

// the values can also be changed after Finder is initialized.
function ImperativePaginationControl() {
    const finder = useFinderContext();

    return (
        <>
            // pager bar
            {finder.pagination.isPaginated && range(1, finder.pagination.lastPage).map((index) => {
                <button type="button" oncClick={() => finder.pagination.    setPage(index)}>
                    {index}
                </button>
            })}

            Results per page:
            <select onChange((e) => finder.pagination.setNumItemsPerPage(Number(e.target.value))) >
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
            </select>
        </>
    );
}
```
</details>

<details>
<summary>Interface:</summary>

```ts
finder.pagination = {
    page: number;
    offset: number;
    numItemsPerPage?: number;
    numTotalItems: number;
    lastPage?: number;
    isPaginated: boolean;
    setPage: (page: number) => void;
    setNumItemsPerPage: (numItemsPerPage: number) => void;
};
```
</details>


## Components and Interfaces

### Core Componenets

<details open>
<summary><i>&lt;Finder /&gt;</i> The root query container</summary>
Props:

```ts
    items: FItem[];
    rules?: FinderRule<FItem>[];
    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: "asc" | "desc";
    initialGroupBy?: string;
    initialFilters?: Record<string, any>;
    initialMeta?: Map<any, any>;
    initialSelectedItems?: FItem[];
    maxSelectedItems?: number;
    isLoading?: boolean;
    disabled?: boolean;
    page?: number;
    numItemsPerPage?: number;
    requireGroup?: boolean;
    onInit?: () => void;
    onChange?: (diff: FinderDiff, ref: FinderInstance<FItem>) => void
```
</details>

<details>
<summary><i>&lt;FinderContent /&gt;</i> A convenience component to handle Finder states.</summary>
    
 It accepts an array of renderProps and will determine the most appropriate state to display. Only a single state can be active at a time.
```ts
<FinderContent>
    {{
        // Displayed while Finder's isLoading property is true.
        loading: ReactNode,

        // Finder received an empty items array.
        empty: ReactNode,

        // No items were found that matched the current rules.
        noMatches: ReactNode

        // Items were found that matched the rules.
        items: (items: FItem[], meta: FinderMeta, pagination: FinderPagination) => ReactNode,

        // An active GroupBy rule grouped items together.
        groups: (groups: FinderResultGroup<FItem>, meta: FinderMeta, pagination: FinderPagination) => ReactNode,

    }}
</FinderContent>
```
Pro-tips:

- If pagination is enabled, the items and groups components will receive only the current page's slice.
</details>

<details>
<summary><i>&lt;FinderLoading /&gt;</i></summary>
    
Only visible when `isLoading` is true.

```ts
<FinderLoading>
    Requesting data: [██████__________]
</FinderLoading>
```
</details>

<details>
<summary><i>&lt;FinderEmpty /&gt;</i></summary>

Only visible when `isLoading` is false, and the `items` array is empty.

```ts
<FinderEmpty>
    Nothing here!
</FinderEmpty>
```
</details>

<details>
<summary><i>&lt;FinderNoMatches /&gt;</i></summary>

Only visible when no items were found that matched the current rules.

```ts
<FinderNoMatches>
    No items were found for that search.
</FinderNoMatches>
```
</details>

<details>
<summary><i>&lt;FinderItems /&gt;</i></summary>

Only visible when items were found that matched the rules.

```ts
<FinderItems>
    {(items: FItem[], meta: FinderMeta, pagination: FinderPagination) => ReactNode}
</FinderItems>
```
</details>

<details>
<summary><i>&lt;FinderGroups /&gt;</i></summary>

Only visible when an active GroupBy rule grouped items together.

```ts
<FinderItems>
    {(groups: FinderResultGroup<FItem>[], meta: FinderMeta, pagination: FinderPagination) => ReactNode}
</FinderItems>
```
</details>


### Matches

Finder match results are snapshotted, and are recalculated when an internal onChange event is triggered.

As a reminder, Finder processes rules in the following order:

1. Search
2. Filters
3. SortBy
4. Paginate
5. GroupBy

This means that a group might be split across multiple pages as pagination is not the last option considered. 

<details>
<summary><i>&lt;MatchesComponent /&gt;</i></summary>
    
```ts
function MatchesComponent() {
    const finder = useFinderContext();

    return (
        <>

            // if no groupBy rule is set, the `finder.matches.items` property will be an array.
            {finder.matches.items?.map((item) => <Photo item={item} />)}

            // if a groupBy rule IS set, the `finder.matches.groups` property will be an array of result groups.
            {finder.matches.groups?.map((group) => (
                <>
                    {group.id}
                    {group.items.map((item) => {
                        return <Photo item={item} />
                    })}
                </>)
            }

            // total items that Finder iterated through.
            {finder.matches.numTotalItems}
        </>
    );
}
```
</details>

<details>
<summary>Interface:</summary>

```ts
finder.matches = {
    items?: FItem[];
    groups?: FinderResultGroup<FItem>[];
    numTotalItems?: number;
}
```
</details>


<details>
<summary><i>&lt;SearchComponent /&gt;</i></summary>

```ts
function SearchComponent() {
   const finder = useFinderContext();
   const handleInput = (e) => finder.search.setSearchTerm(e.currentTarget.value);
   return (
        <>
            {finder.search.hasSearchTerm && `Searching for: "${finder.search.searchTerm}"`}
            <input type="text" onInput={handleInput} />
            <button type="button" onClick={() => finder.search.reset()}>
                Clear
            </button>
        </>
    );
}
```
</details>

<details>
<summary>Interface</summary>

```ts
finder.search = {
    searchTerm: string;
    activeRule?: SearchRule<FItem>;
    hasSearchTerm: boolean;
    setSearchTerm: (value: string) => void;
    reset: () => void;
};
```

If no searchRule was provided, `activeRule` will be undefined.
</details>

<details>
<summary><i>&lt;FilterComponent /&gt;</i></summary>


```ts
function FilterComponent({rule} : {rule: HydratedFilterRule}}) {
   const finder = useFinderContext();

   const luckyOption = rule.options.find(({value}) => value === 'lucky');

   // You can test the results of a filter with a specific value without applying it.
   const numMatches = finder.filters.test(rule, 'purple').length;

   // You can also test the results of *all* options for a filter with defined options. This returns a Map keyed by the Option object.
   const numOptionMatches = finder.filters.testOptions(rule);

   return (
        <>

            // retrieve the filter value
            {finder.filters.has(rule) && `The current value is ${finder.filters.get(rule)}`}

            // Check if a specific filter option is active
            {finder.filters.has(rule, luckyOption) && 'Super lucky!'}

            // filters with isBoolean can be toggled
            <input type="checkbox" onChange={() => finder.filters.toggle(rule)}>

            <select>
                // a blank string is considered to be setting a filter value to undefined.
                {rule.required === false && <option value=''>None</option>}

                // Rules
                {rule.options.map((option) => {
                    return <option value={option.value}>{option.label}</option>
                })}
            </select>

            // rules that accept multiple values can toggle individual options
            {rule.options.map((option) => {
                return (
                    <label>
                        <input type="checkbox" value={option.value} onChange(() => finder.filters.toggleOption(rule, option)>
                        {option.label}
                    </label>
                );
            })}

            // filters will accept any value.
            <input type="text" onInput={(e) => finder.filters.set(rule, e.currentTarget.value))} />

            // reset a specific filter
            <button type="button" onClick={() => finder.filters.delete(rule)}>
                Clear
            </button>

            <button type="button" onClick={() => finder.filters.reset()}>
                Reset all filters
            </button>
        </>
    );
}
```
</details>

<details>
<summary>Interface</summary>

```ts
finder.filters = {
    value: Record<string, any>; /* Formatted and type-cast values including default values, etc.  */
    filters: Record<string, any>; /* Direct state, in case you need access */
    rules: HydratedFilterRule<FItem>[];
    activeRules: HydratedFilterRule<FItem>[];
    activeRuleIds: string[];
    isActive: (identifier: FilterRule | HydratedFilterRule | string, value?: any) => boolean;
    set: (identifier: FilterRule | HydratedFilterRule | string, value?: any) => void;
    get: (identifier: FilterRule | HydratedFilterRule | string) => any;
    delete: (identifier: FilterRule | HydratedFilterRule | string) => void;
    toggle: (identifier: FilterRule | HydratedFilterRule | string) => void;
    toggleOption: (identifier: FilterRule | HydratedFilterRule | string, optionValue: FinderOption | any) => void;
    test: (identifier: FilterRule | HydratedFilterRule | string, filterValue: any, meta?: FinderMeta) => FItem[];
    testOptions: (identifier: FilterRule | HydratedFilterRule | string, meta?: FinderMeta) => Map<FinderOption | boolean, FItem[] | undefined>;
};
```
</details>


<details>
<summary><i>&lt;SortByComponent /&gt;</i></summary>
    
```ts
function SortByComponent() {
   const finder = useFinderContext();

   return (
        <>
            <select value={finder.sortBy.activeRuleId} onChange={(e) => finder.sortBy.set(e.currentTarget.value)}>
                {finder.sortBy.rules.map((rule) => {
                    return <option value={rule.id}>{rule.label}</option>
                })}
            </select>

            // Toggle sort direction between  asc / desc
            <button type="button" onClick={() => finder.sortBy.toggleSortDirection()}>
                Toggle
            </button>

            // Cycle sort direction through default / asc / desc
            <button type="button" onClick={() => finder.sortBy.cycleSortDirection()}>
                Cycle
            </button>

            // reset
            <button type="button" onClick={() => finder.filters.delete(rule)}>
                Clear
            </button>

        </>
    );
}
```
</details>

<details>
<summary>Interface</summary>

```ts
finder.sortBy = {
    activeRule?: HydratedSortByRule<FItem>;
    activeRuleId?: string;
    rules: HydratedSortByRule<FItem>[];
    sortDirection?: string;
    set: (identifier?: string | SortByRule | HydratedSortByRule, sortDirection?: string) => void;
    setSortDirection: (sortDirection?: string) => void;
    cycleSortDirection: () => void;
    toggleSortDirection: () => void;
};
```
</details>

<details>
<summary><i>&lt;GroupByComponent /&gt;</i></summary>
    
```ts
function GroupByComponent() {
   const finder = useFinderContext();

   return (
        <>
            <select value={finder.groupBy.activeRuleId} onChange={(e) => finder.groupBy.set(e.currentTarget.value)}>

                // a blank string is considered to be setting the groupBy value to undefined.
                {finder.groupBy.requireGroup === false && <option value=''>None</option>}


                {finder.groupBy.rules.map((rule) => {
                    return <option value={rule.id}>{rule.label}</option>
                })}
            </select>

            // Set group sort direction
            <button type="button" onClick={() => finder.sortBy.setGroupIdSortDirection('asc')}>
                Asc
            </button>
            <button type="button" onClick={() => finder.sortBy.setGroupIdSortDirection('desc')}>
                Desc
            </button>

            // reset
            <button type="button" onClick={() => finder.groupBy.reset()}>
                Clear
            </button>

        </>
    );
}
```

</details>

<details>
<summary>Interface</summary>


```ts
finder.groupBy = {
    activeRule?: GroupByRule<FItem>;
    activeRuleId?: string;
    rules: GroupByRule<FItem>[];
    requireGroup: boolean;
    groupIdSortDirection?: string;
    set: (identifier?: GroupByRule | string, value?: string) => void;
    toggle: (identifier: GroupByRule | string) => void;
    setGroupIdSortDirection: (direction?: string) => void;
    reset: () => void;
};
```

</details>

<details>
<summary><i>&lt;MySelectedItemsComponent /&gt;</i>></summary>

```ts
function MySelectedItemsComponent() {

    const finder = useFinderContext();

    return <>
        Selected items:
        {finder.selectedItems.items.map((item) => {
            return <SelectedItem item={item} />
        })}

        {finder.matches.items.map((item) => {
            return (
                <>
                    // select an item
                    <button type="button" onClick={() => finder.selectedItems.select(item)}>Add</button>

                    // remove a selected item
                    <button type="button" onClick={() => finder.selectedItems.delete(item)}>Remove</button>

                    // toggle a selected item
                    <label>
                        <input type="checkbox" checked={finder.selectedItems.isSelected(item)} onChange(() => finder.selectedItems.toggle(item)) />
                    </label>
                </>
            );
        })}

        // remove all selected items
        <button type="button" onClick={() => finder.selectedItems.reset()}>Clear All</button>
    </>
}
```

</details>

<details>
<summary>Interface</summary>

```ts
finder.selectedItems = {
    items?: FItem[];
    select: (item: FItem) => void;
    delete: (item: FItem) => void;
    toggle: (item: FItem) => void;
    isSelected: (item: FItem) => boolean;
    reset: () => void;
};
```
</details>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Meta

The Meta layer allows you to provide additional context to your rules.

```ts
function MetaComponent() {
    const items = [...];

    const rules = [
        filterRule({
            id: 'user_specific_filter'
            filterFn: (items, value, meta) => {
                if (meta.get('user') === CoolUser) {
                    return true;
                }
                return false;
            })
    ];

    // Meta is a map for maximum flexibility.
    const initialMeta = new Map();
    initialMeta.set('User', CoolUser);

    return (
        <Finder items={items} rules={rules} initialMeta={initialMeta}>
            // contents
        </Finder>
    )
}
```

Interface:

```ts
finder.meta = {
    value?: FinderMeta;
    set: (metaIdentifier: any, metaValue: any) => void;
    get: (metaIdentifier: any) => any;
    has: (metaIdentifier: any) => boolean;
    delete: (metaIdentifier: any) => void;
    reset: () => void;
};
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Hooks

### useFinder(items, options)

Create a new Finder instance.

### useFinderContext()

Consume a parent Finder context.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Utils



Ensures that a search rule has the correct shape.

<details><summary><h4>searchRule()</h4></summary>

```ts
const rule = searchRule({
    searchFn: (item, searchTerm) => boolean
});
```
    
</details>

<details><summary><h4>filterRule()</h4></summary>

Ensures that a filter rule has the correct shape.

```ts
const rule = filterRule({
    id: 'unique_identifier',
    filterFn: (item, value, meta) => boolean
});
```

</details>

<details><summary><h4>sortByRule()</h4></summary>

Ensures that a sortBy rule has the correct shape.

```ts
const rule = sortByRule({
    id: 'unique_identifier',
    sortFn: (item) => string | number
});
```

</details>

<details><summary><h4>groupByRule()</h4></summary>

Ensures that a groupBy rule has the correct shape.

```ts
const rule = groupByRule({
    id: 'unique_identifier',
    groupFn: (item) => string | number
});
```

</details>

<details><summary><h4>finderRules()</h4></summary>
    
Ensures that an array of rules all have the correct shape.

```ts
const rule = finderRules([
    {
        id: 'unique_identifier',
        sortFn: (item) => string | number
    },
    {
        id: 'unique_identifier',
        groupFn: (item) => string | number
    }
])
```

</details>

<details><summary><h4>finderStringCompare()</h4></summary>

```ts
finderStringCompare(haystack: string, needle: string, aliases?: string[])

// with mangled search term with line breaks and too much white space
finderStringCompare('guava', 'g u a   \n v \r) // true

// with aliases
finderStringCompare('guava', 'gu', ['guajava', 'guayaba']) // true

```

Performs a case-insensitive search that removes whitespace and line breaks. If an `aliases` array is provided, the needle will be compared against all alias entries as well.
</details>
