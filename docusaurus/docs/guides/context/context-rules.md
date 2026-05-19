import { PetFoodStore } from '/src/components/pet-food-store/pet-food-store';

# Dependent Rules

**User story:**
Lindsay McUser wants to buy in-game food to feed their virtual pets, but they only have a limited amount of coins.

<PetFoodStore />

### Define the context shape

First, we need to inform Finder what our context will look like.

```ts
interface PetFoodStoreContext {
    numCoins: number;
}
```

### Define our context-aware ruleset

We're going to group the items into two categories, based on if the user can afford them.

The second generic of groupByRule is the Context shape, and the `groupFn` predicate will be passed the context object at runtime.

```ts
const rule = groupByRule<Food, PetFoodStoreContext>({
        id: "can_afford",
        groupFn: (item, context) => {
            // highlight-start
            const canAfford = item.price < context.numCoins;
            // highlight-end
            return canAfford ? "Can purchase" : "Too expensive";
        },
        sticky: {
            header: "Can purchase",
        },
    }),
});
```

:::tip
Rules are re-hydrated whenever the items array or context reference is changed, so the groupFn will always receive the current context value.
:::

### Memoize context reference

Like any React object prop, you'll want to memoize the context to reduce re-renders.

```ts
function PetFoodStore() {
    const [numCoins, setNumCoins] = useState<number>(7);
    // highlight-start
    const context: PetFoodStoreContext = useMemo(() => {
        return {
            numCoins,
        };
    }, [numCoins]);
    // highlight-end
    return (
        <Finder items={items} rules={rules} context={context} requireGroup={true}>
                <Finder.Content>
                    {{
                        groups: PetFoodStoreGroups,
                    }}
                </Finder.Content>
            </div>
        </Finder>
    );
}
```

For this example we're using a groupByRule, but all rules are passed the context reference.
