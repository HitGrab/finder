---
title: Meta
sidebar_position: 1
---

# Meta

The Meta mixin allows you to inject additional context that doesn't belong to the items array or a static rule. For example, a filter might be dependent on a user's purchase history, or their browser preferences.

```ts
function MyComponent() {
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
