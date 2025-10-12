---
sidebar_position: 0
---

# Finder

The root component, Finder accepts an armada of configuration properties and provides an API context to consuming components.

**Type Signature**

```ts
interface FinderProps<FItem, FContext> {
    items: FItem[] | undefined | null;

    // static rule definitions
    rules: FinderRule<FItem>[];

    // optional side effects triggered when certain coupled rules change
    effects?: (RuleEffects | SearchEffects)[];

    // any state or methods that needs to be injected from your React app.
    // Context will be passed to all rules, as well as all FinderContent components.
    context?: FContext;

    // false by default.
    isLoading?: boolean;

    // false by default.
    disabled?: boolean;

    initialSearchTerm?: string;
    initialSortBy?: string;
    initialSortDirection?: SortDirection;
    initialGroupBy?: string;
    initialFilters?: Record<string, any>;

    // ranked search and custom search rules may conflict.
    ignoreSortByRulesWhileSearchRuleIsActive?: boolean;

    // Force items to use a group rule.
    // If no groupBy is set, the first valid group rule will be used.
    requireGroup?: boolean;

    // Pagination
    page?: number;
    numItemsPerPage?: number;

    // Triggered after Finder initializes for the first time.
    onInit?: FinderOnInitCallback;

    // Triggered when a valid items array is first received
    onReady?: FinderOnReadyCallback;

    // Triggered the first time a user interacts with the component.
    onFirstUserInteraction?: FinderOnFirstUserInteractCallback;

    // When Finder's internal states changes, a snapshot is emitted to listeners
    onChange?: FinderOnChangeCallback;
}
```

**Example Usage**

```ts

// Static rule definitions are best stored outside the component
const rules = finderRuleSet<Shoe>([
    searchRule({
        searchFn: (item) => item.name
    }),
    filterRule({
        id: 'filter_by_brand',
        filterFn: (item, value) => item.brand.name === value
    }),
    sortByRule({
        id: 'sort_by_prize',
        sortFn: (item) => item.price,
    }),
    sortByRule({
        id: 'sort_by_rating',
        sortFn: (item) => item.rating,
    })
    groupByRule({
        id: 'group_by_brand',
        groupFn: (item) => item.brand,
    })
]);

function Results() {

    const {data, isPending} = useGetShoes();

    const [selectedItems, setSelectedItems] = useState<Shoe[]>([]);

    // This context will be passed to all rules functions, as well as all FinderContent render props.
    const context = useMemo(() => {
        isSelected: (item: Shoe) => selectedItems.includes(item),
        selectedItems,
        setSelectedItems,
    }, [selectedItems, setSelectedItems])

    return (
        <Finder items={data} isLoading={isPending} context={context}>

            {/* Your custom controls interface */}
            <ShoeRuleControls />

            {/* Finder will determine which set of render props to call. */}
            <FinderContent>
                {{
                    loading: <Card>Loading...</Card>,
                    items: ShoeList,
                    groups: ShoesByBrandGroups,
                    empty: <Card>No shoes found in this category.</Card>
                    noMatches: <Card>No results found.</Card>
                }}
            </FinderContent>

        </Finder>
    })
}
```
