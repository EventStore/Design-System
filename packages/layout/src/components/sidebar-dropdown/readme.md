# l2-sidebar-dropdown

<!-- Auto Generated Below -->


## Overview

A dropdown for the sidebar. Will automatically take the title and icon of the first active nested `l2-layout-link` or `l2-layout-button`.

## Usage

### Example

```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-sidebar>
        <l2-layout-section title={'Dropdown'}>
            <l2-sidebar-dropdown
                defaultIcon={randomIcon()}
                defaultTitle={'Hello there'}
            >
                <l2-layout-section
                    collapsable
                    defaultCollapsed
                    title={'Night Time'}
                >
                    <l2-layout-link matchExact url={'/'} icon={randomIcon()}>
                        {'Hello!'}
                    </l2-layout-link>
                    <l2-layout-link url={'/somewhere'} icon={randomIcon()}>
                        {'Go somewhere'}
                    </l2-layout-link>
                </l2-layout-section>
                <l2-layout-section collapsable title={'Day Time'}>
                    <l2-layout-link url={'/good-morning'} icon={randomIcon()}>
                        {'Good morning!'}
                    </l2-layout-link>
                    <l2-layout-link url={'/work'} icon={randomIcon()}>
                        {'Go to work'}
                    </l2-layout-link>
                </l2-layout-section>
                <l2-layout-section
                    collapsable
                    defaultCollapsed
                    title={'Another Time'}
                >
                    {Array.from({ length: 200 }, (_, i) => (
                        <l2-layout-link
                            url={`/another-${i}`}
                            icon={randomIcon()}
                        >
                            {`Link ${i}`}
                        </l2-layout-link>
                    ))}
                </l2-layout-section>
            </l2-sidebar-dropdown>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'My Section'}>
            <l2-layout-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </l2-layout-link>
            <l2-layout-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </l2-layout-link>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'My Other Section'}>
            <l2-layout-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </l2-layout-link>
            <l2-layout-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </l2-layout-link>
        </l2-layout-section>
    </l2-sidebar>
);
```



## Properties

| Property                    | Attribute       | Description                                                                    | Type                                                    | Default     |
| --------------------------- | --------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- | ----------- |
| `defaultIcon` _(required)_  | `default-icon`  | The icon to display if no nested l2-layout-link or l2-layout-button is active  | `[namespace: string \| symbol, name: string] \| string` | `undefined` |
| `defaultTitle` _(required)_ | `default-title` | The title to display if no nested l2-layout-link or l2-layout-button is active | `string`                                                | `undefined` |


## Dependencies

### Depends on

- es-button
- es-icon
- es-popover

### Graph
```mermaid
graph TD;
  l2-sidebar-dropdown --> es-button
  l2-sidebar-dropdown --> es-icon
  l2-sidebar-dropdown --> es-popover
  es-popover --> es-popper
  es-popover --> es-popper-inner
  es-popover --> es-popper-x
  es-popover --> es-popper-y
  style l2-sidebar-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


