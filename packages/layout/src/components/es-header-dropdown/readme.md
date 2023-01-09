# es-sidebar-dropdown

<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { Link } from '@eventstore-ui/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-header>
        <es-header-dropdown
            slot={'right'}
            icon={randomIcon()}
            buttonText={'JJJ'}
        >
            <header class={'user_dropdown_header'}>
                <es-icon icon={randomIcon()} />
                <h1>{'John John Johnson'}</h1>
                <h2>{'jjj@johnson.com'}</h2>
            </header>
            <es-layout-link
                matchExact
                url={'/'}
                count={22}
                alertLevel={'error'}
            >
                {'Hello!'}
            </es-layout-link>
            <es-layout-link url={'/somewhere'} icon={randomIcon()}>
                {'Go somewhere'}
            </es-layout-link>
        </es-header-dropdown>
        <es-theme-dropdown slot={'right'} />
        <es-nav
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
    </es-header>
);
```

```css
.user_dropdown_header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: var(--color-layout-shade-20);
    color: var(--color-layout-contrast);
}

.user_dropdown_header es-icon {
    color: var(--color-layout-highlight);
}

.user_dropdown_header h1 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 17px;
    margin-bottom: 5px;
}

.user_dropdown_header h2 {
    font-size: 12px;
    font-weight: 500;
    margin: 0;
}
```



## Properties

| Property     | Attribute     | Description                                                    | Type                                                                 | Default     |
| ------------ | ------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- | ----------- |
| `alertLevel` | `alert-level` | Display a dot on the icon, to attract attention to the button. | `"error" \| "okay" \| "warning" \| undefined`                        | `undefined` |
| `buttonText` | `button-text` | text for use in the button.                                    | `string \| undefined`                                                | `undefined` |
| `caret`      | `caret`       | If a caret should be rendered.                                 | `boolean`                                                            | `true`      |
| `count`      | `count`       | Display a counter in place of the icon.                        | `number \| undefined`                                                | `undefined` |
| `disabled`   | `disabled`    | If the button should be disabled.                              | `boolean`                                                            | `false`     |
| `icon`       | `icon`        | Icon for use in the button.                                    | `[namespace: string \| symbol, name: string] \| string \| undefined` | `undefined` |
| `level`      | `level`       | Apply an indent to the left of the button, for basic nesting.  | `number \| undefined`                                                | `undefined` |
| `variant`    | `variant`     | Which styling variant to use.                                  | `"default" \| "highlight"`                                           | `'default'` |


## Dependencies

### Used by

 - [es-theme-dropdown](../es-theme-dropdown)

### Depends on

- es-button
- es-counter
- es-badge
- es-icon
- es-popover

### Graph
```mermaid
graph TD;
  es-header-dropdown --> es-button
  es-header-dropdown --> es-counter
  es-header-dropdown --> es-badge
  es-header-dropdown --> es-icon
  es-header-dropdown --> es-popover
  es-badge --> es-counter
  es-popover --> es-popper
  es-popover --> es-popper-inner
  es-theme-dropdown --> es-header-dropdown
  style es-header-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


