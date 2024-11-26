# l2-header

<!-- Auto Generated Below -->


## Overview

A site header for applications.

## Usage

### Example

```tsx
import { Link } from '@eventstore-ui/router';

export default () => (
    <l2-header>
        <Link url={'/'} slot={'left'}>
            <l2-logo />
        </Link>
        <l2-theme-dropdown slot={'right'} />
        <l2-nav
            navTree={[
                {
                    title: 'Link 1',
                    url: '/a',
                },
                {
                    title: 'Link 2',
                    url: '/b',
                },
                {
                    title: 'Link 3',
                    url: '/c',
                },
            ]}
            slot={'under'}
        />
    </l2-header>
);
```



## Slots

| Slot         | Description                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `"backdrop"` | Slot an svg to use as a backdrop                                                                                                             |
| `"center"`   | The center of the header. Place some navigational elements.                                                                                  |
| `"left"`     | The left of the header. By default shows an eventstore logo, linking to '/'.                                                                 |
| `"right"`    | The right of the header. Place some navigational elements.                                                                                   |
| `"under"`    | Underneath the header. Place an l2-nav or other. Automatically sets the `layout-header-under-height` css var with the height of the content. |


## Shadow Parts

| Part         | Description                 |
| ------------ | --------------------------- |
| `"backdrop"` | the backdrop container      |
| `"center"`   | The center of the header.   |
| `"header"`   | The wrapping header element |
| `"left"`     | The left of the header.     |
| `"right"`    | The right of the header.    |
| `"under"`    | Underneath the header.      |


## Dependencies

### Depends on

- [l2-logo](../logo)

### Graph
```mermaid
graph TD;
  l2-header --> l2-logo
  style l2-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


