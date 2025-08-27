# FinderContent

FinderContent accepts a set of renderProps, and will determine the most appropriate state to display. Only a single state can be active at a time.

```ts
<FinderContent>
    {{
        // Displayed while Finder's isLoading property is true.
        loading: ReactNode | ({ pagination: PaginationMixin, context: any}) => ReactNode,

        // Finder received an empty items array.
        empty: ReactNode | ({ pagination: PaginationMixin, context: any}) => ReactNode,

        // No items were found that matched the current rules.
        noMatches: ReactNode | ({ pagination: PaginationMixin, context: any}) => ReactNode,

        // Items were found that matched the rules.
        items: ({
            items: FItem[],
            pagination: PaginationMixin,
            context: any,
        }) => ReactNode,

        // An active GroupBy rule grouped items together.
        groups: ({
            groups: FinderResultGroup<FItem>,
            pagination: PaginationMixin,
            context: any,
        }) => ReactNode,

    }}

</FinderContent>
```

:::warning
It's strongly recommended you either memoize your render prop functions, or make them stable component references. An arrow function is volatile, and may cause React to re-render the component every time.
:::

:::tip
If pagination is enabled, the items and groups components will receive only the current page's slice.
:::
