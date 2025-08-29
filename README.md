<a name="readme-top"></a>

<h1 align='center'>finder</h1>

<div align='center'><small><i>Headless datatable management for things that aren't tables.</i></small></div>

Finder provides a headless interface for manipulating datasets with easily configured rules.

<h4>Features</h4>
<div align="center">

[![Search][Search]](#search)
[![Filter][Filter]](#filters)
[![sortBy][sortBy]](#sortby)
[![groupBy][groupBy]](#groupby)
[![Pagination][Pagination]](#pagination)
[![onChangeonInit][onChangeonInit]](#life-cycle-events)
[![Metadata][Metadata]](#meta)

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
    <li><a href="#pagination">Pagination</a></li>
    <li><a href="#components-and-interfaces">Components and Interfaces</a></li>
    <li><a href="#meta">Meta Mixin</a></li>
    <li><a href="#layout">Layout Mixin</a></li>
    <li><a href="#hooks">Custom Hooks</a></li>
    <li><a href="#utils">Utils</a></li>
  </ul>
</details>

[Search]: https://img.shields.io/badge/Search-20232A?style=for-the-badge
[Filter]: https://img.shields.io/badge/Filter-ffffff?style=for-the-badge
[sortBy]: https://img.shields.io/badge/sort-333333?style=for-the-badge
[groupBy]: https://img.shields.io/badge/group-222222?style=for-the-badge
[StickyResults]: https://img.shields.io/badge/Sticky_Results-555555?style=for-the-badge
[onChangeonInit]: https://img.shields.io/badge/Events-444444?style=for-the-badge
[Pagination]: https://img.shields.io/badge/Paginate-888888?style=for-the-badge
[Metadata]: https://img.shields.io/badge/Metadata-888888?style=for-the-badge

## Basic Usage

Finder accepts an array of items, and processes them according to static rules. The matches and current rule state are passed to React context for easy consumption. A robust imperative API is provided to allow developers to build their control components in the theming library of their choice.

### Tutorial examples:

1. [Kicking Rad Shoe Store](https://stackblitz.com/edit/vitejs-vite-vsu7v2pg?file=src%2Fapp.tsx)
   Demonstrates filtering, sorting, and displays active rules as toggleable chips.
2. [Ancient Armory](https://stackblitz.com/edit/vitejs-vite-x4ng7k3m?file=src%2Fapp.tsx) Demonstrates searching, filtering, grouping, and the event life cycle.

### To all things a pattern

Finder processes rules in the following order:

1. [Search](#search)
2. [Filters](#filters)
3. [SortBy](#sortby)
4. [Paginate](#pagination)
5. [GroupBy](#groupby)

#### Basic Search Example

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

All rules ( with the exception of SearchRules ) must have a unique id for their namespace ( filters, groupBy, etc. ). Finder will throw an error if a rule is missing an id, or two filter rules have the same id.

### Search

Match text against your item properties.

Only a single search rule can be defined per Finder instance. If you need to do multiple kinds of text searches, consider a Filter!

```ts
searchRule({
    searchFn: (item: FItem, searchTerm: string, meta?: FinderMeta) => boolean;
    debounceMilliseconds?: number;
    label?: string;
    hidden?: boolean;
})
```

Pro-tips:

- You can use `searchRule()` to ensure your rule has a valid shape.
- Use `finderStringCompare` to do a case-insensitive search that removes whitespace and line breaks.
- If you have a large volume of data to process, you can add a `debounceMilliseconds`.

<!--
Buttons for linking to implimentation in the example repo and the docs, we can add these later when we're finalized with the structure!
[![source][search-source]](/src/classes/mixins/search.ts)
[![implementation][search-implementation]](https://github.com/HitGrab/finder/blob/7af28570f85b946e173072ebf4e3dcaf706ec02b/examples/react/src/app.tsx#L26)

[search-source]: https://img.shields.io/badge/Source_Code-555555?style=for-the-badge
[search-implementation]: https://img.shields.io/badge/example_implementation-555555?style=for-the-badge
-->

### Filters

Define a filter predicate that will return a boolean for each item. If multiple filters are active, _all_ filters must match for an item to be returned.

```ts
filterRule({
    id: string;
    filterFn: (item: FItem, value: FValue, meta?: FinderMeta) => boolean;
    options?: FilterOption<FValue>[] | ((items: FItem[], meta?: FinderMeta) => FilterOption<FValue>[]);
    multiple?: boolean;
    required?: boolean;
    boolean?: boolean;
    defaultValue?: FValue;
    label?: string;
    hidden?: boolean;
    debounceMilliseconds?: number;
})
```

| Prop                 | Description                                                                                                                                                                        | Default | Required |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id                   | Every filter rule must have a unique string id.                                                                                                                                    |         | ✓        |
| filterFn             | A predicate that returns a boolean. Note that it receives the Meta mixin, which can contain instance-wide arbitrary data.                                                          |         | ✓        |
| options              | Either an array of form options `[{label: 'Thing', value: 'thing'}]`, or an option generator function that returns options. `(items, meta) => [{label: 'Thing', value: 'thing'}]`. |         |          |
| multiple             | If this filter has a single value or an array of values.                                                                                                                           | false   |          |
| required             | Whether this filter must always have a value. If the rule provides options, the first option will be selected by default.                                                          | false   |          |
| boolean              | If this filter has a true/false value. Useful for checkboxes!                                                                                                                      | false   |          |
| defaultValue         | If the filter has a preset value.                                                                                                                                                  |         |          |
| label                | Optional label for your client to display.                                                                                                                                         |         |          |
| hidden               | Optional display value for your client to display.                                                                                                                                 | false   |          |
| debounceMilliseconds | If you want to debounce value changes, enter a time in milliseconds.                                                                                                               |         |          |

Pro-tips:

- If a rule uses an option generator function, Finder will hydrate the rule with a stable options array before emitting it to context.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### SortBy

This option sorts the items passed in and accepts either a simple value or a function to run on each item to determine the order of return.

```ts
sortByRule({
    id: string;
    sortFn: FinderPropertySelector<FItem> | FinderPropertySelector<FItem>[];
    defaultSortDirection?: SortDirection;
    label?: string;
    hidden?: boolean;
})
```

| Prop                 | Description                                                                                                               | Default | Required |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id                   | Every sortBy rule must have a unique string id.                                                                           |         | ✓        |
| sortFn               | A predicate that returns a boolean. Note that it receives the Meta mixin, which can contain instance-wide arbitrary data. |         | ✓        |
| defaultSortDirection | 'asc' or 'desc'.                                                                                                          | 'asc'   |          |
| label                | Optional label for your client to display.                                                                                |         |          |
| hidden               | Optional display value for your client to display.                                                                        | false   |          |

Pro-tips:

- Only a single sortBy rule can be active at one time.
- If any sortBy rules are provided and no specific rule is set, the first sortBy rule in the stack will be considered active.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### GroupBy

Takes the returned items and groups them by the passed in paramaters.

```ts
groupByRule({
    id: string;
    groupFn: (item) => string | number;
    sortGroupIdFn?: (group) => string | number;
    groupIdSortDirection?: SortDirection;
    sticky?: {
        header?: string | string[];
        footer?: string | string[];
    };
    label?: string;
    hidden?: boolean;
})
```

| Prop          | Description                                                                                                                   | Default | Required |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| id            | Every groupBy rule must have a unique string id.                                                                              |         | ✓        |
| groupFn       | A predicate operating on the item object that returns a string or number. Items with the same value will be grouped together. |         | ✓        |
| sortGroupIdFn | While any sortBy rules will operate on the items first, sortGroupIdFn allows you to sort the groups themselves.               |         |          |
| sticky        | Specify group ids that should be stickied to the top or bottom of the results.                                                |         |          |
| label         | Optional label for your client to display.                                                                                    |         |          |
| hidden        | Optional display value for your client to display.                                                                            | false   |          |

Pro-tips:

- Only a single groupBy rule can be active at one time.
- If the Finder instance has `requireGroup` enabled and no groupBy rule is active, the first rule in the stack will be considered active.
- If you want a group of premium items to always appear first in the results, you can set `sticky: {header: 'premium_id' }`. If an array is provided, the order will be preserved ( i.e: `sticky: { header: ['premium_id', 'subpremium_id']})`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Meta Mixin

The Meta mixin allows you to provide additional context that doesn't belong to either items or rules. For example, a filter might be affected by a user's purchase history or browser preferences.

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

    const initialMeta = {'User': CoolUser}

    return (
        <Finder items={items} rules={rules} initialMeta={initialMeta}>
            // contents
        </Finder>
    )
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Layout Mixin

The Layout mixin can be used to inform rendering logic inside your React components.

```ts
function MetaComponent() {
    const items = [...];
    const rules = [...];
    const layoutVariants: LayoutVariant[] = [
        {
            id: 'gallery'
        }
        {
            id: 'table'
        }
    ]

    return (
        <Finder items={items} rules={rules} layoutVariants={layoutVariants} initialLayout='table'>
            <FinderItems>
                {
                    ({items, layout}) => {
                        return layout.is('table') ? <TableComponent items={items} /> : <GalleryComponent items={items} />
                    }
                }
            </FinderItems>
        </Finder>
    )
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Pagination

_Please note that pagination is not the final option considered in the functionality of the filtering / sorting process, therefore groupBy options could return unexpected results._

If the `numItemsPerPage` property is set, Finder will paginate items and groups.

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
                <button type="button" oncClick={() => finder.pagination.setPage(index)}>
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

## Life Cycle Events

Finder exposes an event emitter.

Declarative events:

```ts
<Finder items={[...items]} rules={[...]} onChange={(e) => myChangeListener(e)} />
```

Imperative events:

```ts
const finder = useFinderContext();
finder.events.on(eventName, listener);
```

### onInit

Triggered a single time when Finder is first initialized.

```ts
// FinderInitEvent
{
    source: "core";
    event: "init";
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

### onFirstUserInteraction

Triggered once when the user interacts with any rule.

```ts
// FinderFirstUserInteractionEvent
{
    source: "core";
    event: "firstUserInteraction";
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

### onReady

Triggered once after an items array is set and `isLoading` is false.

```ts
// FinderReadyEvent
{
    source: "core";
    event: "ready";
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

### onChange

Triggered whenever a rule's state changes.

```ts
// FinderChangeEvent
{
    source: "core" | "filters" | "groupBy" | "meta" | "pagination" | "plugin" | "search" | "selectedItems" | "sortBy" | "layout";
    event: "change";
    current: any;
    initial: any;
    snapshot: FinderSnapshot,
    timestamp: number;
}
```

Pro-tips:

- For change events, you can subscribe to the broad 'change' event, or a narrower event like `change.search` or `change.search.setSearchTerm`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Components

### Core Components

<details open>
<summary><i>&lt;Finder /&gt;</i> The root query container</summary>
Props:

```ts
    items: FItem[];
    rules?: FinderRule<FItem>[];
    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: SortDirection;
    initialGroupBy?: string;
    initialFilters?: Record<string, any>;
    initialMeta?: Record<string, any>;
    initialSelectedItems?: FItem[];
    maxSelectedItems?: number;
    isLoading?: boolean;
    disabled?: boolean;
    page?: number;
    numItemsPerPage?: number;
    requireGroup?: boolean;
    layoutVariants?: LayoutVariant[];
    initialLayout?: string;
    plugins?: FinderPlugin[];
    onInit?: (event: FinderInitEvent) => void;
    onReady?: (event: FinderReadyEvent) => void
    onFirstUserInteraction?: (event: FinderFirstUserInteractionEvent) => void;
    onChange?: (diff: FinderDiff, ref: FinderInstance<FItem>) => void
    state: 'loading' | 'empty' | 'groups' | 'items' | 'noMatches';
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
        items: ({items: FItem[], meta: MetaMixin, pagination: FinderPagination, selectedItems: FinderSelectedItems, layout: LayoutMixin}) => ReactNode,

        // An active GroupBy rule grouped items together.
        groups: ({groups: FinderResultGroup<FItem>, meta: MetaMixin, pagination: FinderPagination, selectedItems: FinderSelectedItems, layout: LayoutMixin}) => ReactNode,

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
    {({items: FItem[], meta: MetaMixin, pagination: FinderPagination, selectedItems: FinderSelectedItems, layout: LayoutMixin }) => ReactNode}
</FinderItems>
```

</details>

<details>
<summary><i>&lt;FinderGroups /&gt;</i></summary>

Only visible when an active GroupBy rule grouped items together.

```ts
<FinderItems>
    {({groups: FinderResultGroup<FItem>[],  meta: MetaMixin, pagination: FinderPagination, selectedItems: FinderSelectedItems, layout: LayoutMixin}) => ReactNode}
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

````
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

            // boolean filters can be toggled
            <input type="checkbox" onChange={() => finder.filters.toggle(rule)} />

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

````

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
<summary><i>&lt;MySelectedItemsComponent /&gt;</i></summary>

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

## Hooks

### useFinder(items, options)

Create a new Finder instance.

### useFinderContext()

Consume a parent Finder context.

### useFinderRef()

A convenience hook for controlling Finder from the same scope it's created in.

```ts
function MyComponent() {

    const ref = useFinderRef();
    ref.current.events.on(eventName, eventListener);
    return <Finder controllerRef={ref}>...</Finder>

}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Imperative Interfaces

All interfaces can be accessed from the `useFinderContext()` hook.

### Matches

```ts
finder.matches = {
    items?: FItem[];
    groups?: FinderResultGroup<FItem>[];
    numMatchedItems: number;
    numTotalItems: number;
    hasGroupByRule: boolean;
}
```

### Search

```ts
finder.search = {
    searchTerm: string;
    activeRule?: SearchRule<FItem>;
    hasSearchTerm: boolean;
    setSearchTerm: (value: string) => void;
    reset: () => void;
};
```

### Filters

```ts
finder.filters = {
    filters: Record<string, any>; /* Formatted and type-cast values including default values, etc.  */
    raw: Record<string, any>; /* Raw mixin state without default values or formatting */
    activeRules: HydratedFilterRule<FItem>[];
    rules: HydratedFilterRule<FItem>[];
    isActive: (identifier: string | FilterRule | HydratedFilterRule, value?: any) => boolean;
    set: (identifier: string | FilterRule | HydratedFilterRule, value?: any) => void;
    get: (identifier: string | FilterRule | HydratedFilterRule) => any;
    has: (identifier: string | FilterRule | HydratedFilterRule) => boolean;
    delete: (identifier: string | FilterRule | HydratedFilterRule) => void;
    toggle: (identifier: string | FilterRule | HydratedFilterRule) => void;
    toggleOption: (identifier: string | FilterRule | HydratedFilterRule, optionValue: FinderOption | any) => void;
    getRule: (identifier:string) => HydratedFilterRule | undefined;
    test: (rule: FilterTestOptions) => FItem[];
    testRule: (identifier: string | FilterRule | HydratedFilterRule, filterValue: any, meta?: FinderMeta) => FItem[];
    testOptions: (identifier: string | FilterRule | HydratedFilterRule, meta?: FinderMeta) => Map<FinderOption | boolean, FItem[] | undefined>;
};
```

### SortBy

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

### GroupBy

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

### Meta

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

### Layout

```ts
finder.layout = {
    variants?: LayoutVariant[];
    activeLayout?: LayoutVariant;
    raw?: LayoutVariant;
    is: (layoutIdentifier: string | LayoutVariant) => boolean;
    set: (layoutIdentifier: string | LayoutVariant) => void;
    reset: () => void;
};
```

### Pagination

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

### Selected Items

```ts
finder.selectedItems = {
    items?: FItem[];
    select: (item: FItem) => void;
    delete: (item: FItem) => void;
    toggle: (item: FItem) => void;
    selectOnly: (item: FItem) => void;
    toggleOnly: (item: FItem) => void;
    isSelected: (item: FItem) => boolean;
    reset: () => void;
};
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Type Guards

Ensures that rules have the correct shape.

### searchRule

```ts
const rule = searchRule<FItem>({
    searchFn: (item, searchTerm) => boolean,
});
```

### filterRule

```ts
const rule = filterRule<FItem, FValue>({
    id: "unique_identifier",
    filterFn: (item, value, meta) => boolean,
});
```

### sortByRule()

```ts
const rule = sortByRule<FItem>({
    id: "unique_identifier",
    sortFn: (item) => string | number,
});
```

### groupByRule

```ts
const rule = groupByRule<FItem>({
    id: "unique_identifier",
    groupFn: (item) => string | number,
});
```

### finderRuleset

Ensures that an array of rules all have the correct shape.

```ts
const rule = finderRules<FItem>([
    {
        id: "unique_identifier",
        sortFn: (item) => string | number,
    },
    {
        id: "unique_identifier",
        groupFn: (item) => string | number,
    },
]);
```

## String Comparison Utils

### finderStringCompare

```ts
finderStringCompare(haystack: string, needle: string, aliases?: string[])
```

Performs a case-insensitive search that removes whitespace and line breaks. If an `aliases` array is provided, the needle will be compared against all alias entries as well.

```ts
// with mangled search term with line breaks and too much white space
finderStringCompare("guava", "g u a   \n v \r"); // true

// with aliases
finderStringCompare("guava", "gu", ["guajava", "guayaba"]); // true
```

### finderCharacterCompare

```ts
finderCharacterCompare(haystack: string, needle: string, aliases?: string[])
```

Performs a case-insensitive comparison of needle characters against the haystack. The characters can appear in any order.

```ts
finderCharacterCompare("e d c b a", "AB    C\nD\r    E"); // true
```

### finderCharacterCompare

```ts
finderCharacterCompare(haystack: string, needle: string, aliases?: string[])
```

Performs a case-insensitive comparison of needle characters against the haystack. The characters can appear in any order.

```ts
finderSequentialCharacterCompare("aabciop[cde", "AB    C\nD\r    E"); // true

finderSequentialCharacterCompare("e d c b a", "AB    C\nD\r    E"); // false
```

Performs a case-insensitive comparison of needle characters against the haystack. The characters must appear in the same order as the needle.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Plugins

```ts
const plugin = FinderPluginInterface<FItem> {
    id: string;
    register: (finder: FinderCore<FItem>, touch: FinderTouchCallback) => void;
}
```

For power users, Finder accepts plugins that can attach event listeners and trigger internal actions.

```ts
// example
const plugin = FinderPluginInterface<FItem> {
    id: 'my_cool_plugin';
    register: (finder: FinderCore<FItem>, touch: FinderTouchCallback) => {
        finder.events.on('change.filters.set', (event) => {
            // modify something
            ...

            // trigger a state update in Finder
            touch();
        })
    };
}

return <Finder items={[...]} plugins={[plugin]}>...</Finder>
```

A convenience `FinderPlugin` class is exported for users who prefer an object-oriented approach.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
