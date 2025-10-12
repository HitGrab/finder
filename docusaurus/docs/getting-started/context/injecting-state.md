import { IssueTracker } from '/src/components/issue-tracker/issue-tracker';

# Dependent Finder.Content components

**User story:**
Max McHacker needs to select reported issues to forward to the dev team.

We need to track selected issue ids in state, and provide a form to submit the selection.

<IssueTracker />

### Define the context shape

First, we need to inform Finder what our context will look like.

```ts
interface IssueTrackerContext {
    isSelected: (id: string) => boolean;
    toggle: (id: string) => void;
}
```

### Memoize context reference

Like any React object prop, you'll want to memoize the context to reduce re-renders.

```ts
function IssueTracker() {
    const items = useGetIssues();
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    // highlight-start
    const context: IssueTrackerContext = useMemo(() => {
        return {
            isSelected(id: string) {
                return selectedItemIds.includes(id);
            },
            toggle(id: string) {
                if (selectedItemIds.includes(id)) {
                    setSelectedItemIds(selectedItemIds.filter((i) => i !== id));
                    return;
                }
                setSelectedItemIds([...selectedItemIds, id]);
            },
        };
    }, [selectedItems]);
    // highlight-end

    return (
        <Finder items={items} rules={rules} context={context}>
            <Finder.Content>{{ items: IssueTrackerItems }}</Finder.Content>
        </Finder>
    );
}
```

### Consume the context in the Item renderprop

The second generic of the `FinderContentItemProps` type is the Context. From here, you can use those contextual methods and props to your hearts content.

```ts
function IssueTrackerItems({ items, context }: FinderContentItemProps<Issue, IssueTrackerContext>) {
    return items.map((item) => {
        const isSelected = context.isSelected(item.id);
        return (
            <button type="button" data-is-selected={isSelected} onClick={() => context.toggle(item.id)} key={item.id}>
                <input type="checkbox" checked={isSelected} readOnly={true} />
                Severity {item.severity}: {item.subject} - {item.user_name}
            </button>
        );
    });
}
```
