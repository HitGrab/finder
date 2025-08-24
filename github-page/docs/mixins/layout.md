---
title: Layout
sidebar_position: 3
---

# Layout

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
