# Injecting Context

Often, you'll need Finder to be aware of external context.

There's two main use cases:

**1. Finder.Content components are dependent on context**

Your items might have multiple display formats ( i.e: grid or list ), or need to update when an item is selected.

**2. Rule predicates are dependent on context**

A searchRule or filterRule might need to be aware of user context, like checking a user's location or preferences.

Thankfully, both are easy to do! A `<Finder />` component can be passed an object reference via the `context` prop, which will be forwarded to all rule predicates and render props.

```ts
function MyComponent() {
    const items = useItems();
    const [state, setState] = useState();
    const context = useMemo(() => {
        return {
            state,
            setState,
            'my_props_here',
        }
    }, [state, setState])

    return (
        <Finder items={items} rules={rules} context={context}>
            <Finder.Content>
                {{
                    items: MyItemsComponent
                }}
            </Finder.Content>
        </Finder>
    );
}

```
