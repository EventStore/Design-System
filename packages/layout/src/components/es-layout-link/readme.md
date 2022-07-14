# docs-sidebar-link

<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { Link } from '@eventstore-ui/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-layout-section sectionTitle={'Links'}>
            <es-layout-link url={'/no-icon-1'}>{'Example link'}</es-layout-link>
            <es-layout-link url={'/preview'}>{'I am active'}</es-layout-link>
            <es-layout-link url={'/no-icon-1'}>{'Example link'}</es-layout-link>
            <es-layout-link disabled url={'/no-icon-2'}>
                {'Disabled example  '}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'With Icon'}>
            <es-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'With Icon'}
            </es-layout-link>
            <es-layout-link disabled url={'/icon-2'} icon={randomIcon()}>
                {'Disabled'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'Another'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} icon={randomIcon()}>
                {'More Icon'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'Alert levels'}>
            <es-layout-link
                alertLevel={'error'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Error'}
            </es-layout-link>
            <es-layout-link
                alertLevel={'warning'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Warning'}
            </es-layout-link>
            <es-layout-link
                alertLevel={'okay'}
                url={'/icon-1'}
                icon={randomIcon()}
            >
                {'Okay'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} count={12}>
                {'Counter'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'Level Example'}>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={2}>
                {'Level 2'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={3}>
                {'Level 3'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={3}>
                {'Level 3'}
            </es-layout-link>
            <es-layout-link url={'/icon-1'} level={1}>
                {'Level 1'}
            </es-layout-link>
        </es-layout-section>
    </es-sidebar>
);
```



## Properties

| Property      | Attribute      | Description                                                  | Type                                                                 | Default     |
| ------------- | -------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- | ----------- |
| `alertLevel`  | `alert-level`  | Display a dot on the icon, to attract attention to the link. | `"error" \| "okay" \| "warning" \| undefined`                        | `undefined` |
| `count`       | `count`        | Display a counter in place of the icon.                      | `number \| undefined`                                                | `undefined` |
| `disabled`    | `disabled`     | If the link should be disabled.                              | `boolean`                                                            | `false`     |
| `icon`        | `icon`         | Display an icon on the left.                                 | `[namespace: string \| symbol, name: string] \| string \| undefined` | `undefined` |
| `level`       | `level`        | Apply an indent to the left of the link, for basic nesting.  | `number \| undefined`                                                | `undefined` |
| `matchExact`  | `match-exact`  | Use exact url matching for active.                           | `boolean \| undefined`                                               | `undefined` |
| `matchStrict` | `match-strict` | Use strict url matching for active.                          | `boolean \| undefined`                                               | `undefined` |
| `matchUrl`    | `match-url`    | When to display as active. Uses the `url` by default.        | `string \| undefined`                                                | `undefined` |
| `url`         | `url`          | Where to link to.                                            | `string \| undefined`                                                | `undefined` |


## Methods

### `isActive() => Promise<boolean>`

If the link is currently active

#### Returns

Type: `Promise<boolean>`




## Shadow Parts

| Part     | Description       |
| -------- | ----------------- |
| `"link"` | The link element. |


## Dependencies

### Used by

 - dev-root

### Depends on

- es-counter
- es-badge
- es-icon

### Graph
```mermaid
graph TD;
  es-layout-link --> es-counter
  es-layout-link --> es-badge
  es-layout-link --> es-icon
  es-badge --> es-counter
  dev-root --> es-layout-link
  style es-layout-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


