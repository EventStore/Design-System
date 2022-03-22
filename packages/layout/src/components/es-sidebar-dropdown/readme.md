# es-sidebar-dropdown



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { Link } from '@eventstore/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-sidebar-section title={'Dropdown'}>
            <es-sidebar-dropdown
                defaultIcon={randomIcon()}
                defaultTitle={'Hello there'}
            >
                <es-sidebar-section
                    collapsable
                    defaultCollapsed
                    title={'Night Time'}
                >
                    <es-sidebar-link matchExact url={'/'} icon={randomIcon()}>
                        {'Hello!'}
                    </es-sidebar-link>
                    <es-sidebar-link url={'/somewhere'} icon={randomIcon()}>
                        {'Go somewhere'}
                    </es-sidebar-link>
                </es-sidebar-section>
                <es-sidebar-section collapsable title={'Day Time'}>
                    <es-sidebar-link url={'/good-morning'} icon={randomIcon()}>
                        {'Good morning!'}
                    </es-sidebar-link>
                    <es-sidebar-link url={'/work'} icon={randomIcon()}>
                        {'Go to work'}
                    </es-sidebar-link>
                </es-sidebar-section>
                <es-sidebar-section
                    collapsable
                    defaultCollapsed
                    title={'Another Time'}
                >
                    {Array.from({ length: 200 }, (_, i) => (
                        <es-sidebar-link
                            url={`/another-${i}`}
                            icon={randomIcon()}
                        >
                            {`Link ${i}`}
                        </es-sidebar-link>
                    ))}
                </es-sidebar-section>
            </es-sidebar-dropdown>
        </es-sidebar-section>
        <es-sidebar-section sectionTitle={'My Section'}>
            <es-sidebar-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </es-sidebar-link>
            <es-sidebar-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </es-sidebar-link>
        </es-sidebar-section>
        <es-sidebar-section sectionTitle={'My Other Section'}>
            <es-sidebar-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </es-sidebar-link>
            <es-sidebar-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </es-sidebar-link>
        </es-sidebar-section>
    </es-sidebar>
);
```



## Properties

| Property                    | Attribute       | Description                                                 | Type                                                    | Default     |
| --------------------------- | --------------- | ----------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| `defaultIcon` _(required)_  | `default-icon`  | The icon to display if no nested es-sidebar-link is active  | `[namespace: string \| symbol, name: string] \| string` | `undefined` |
| `defaultTitle` _(required)_ | `default-title` | The title to display if no nested es-sidebar-link is active | `string`                                                | `undefined` |


## Dependencies

### Used by

 - dev-root

### Depends on

- es-button
- es-icon
- es-popover

### Graph
```mermaid
graph TD;
  es-sidebar-dropdown --> es-button
  es-sidebar-dropdown --> es-icon
  es-sidebar-dropdown --> es-popover
  es-popover --> es-popper
  es-popover --> es-popper-inner
  dev-root --> es-sidebar-dropdown
  style es-sidebar-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


