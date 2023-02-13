# docs-sidebar-section

<!-- Auto Generated Below -->


## Overview

A section with an optional title for containing layout-links

## Usage

### Example

```tsx
import { Link } from '@eventstore-ui/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-layout-section>
            <es-layout-link url={'/'}>
                {'My section has no title'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'I am a section'}>
            <es-layout-link url={'/somewhere-else'}>
                {'My section has a title'}
            </es-layout-link>
        </es-layout-section>
    </es-sidebar>
);
```



## Properties

| Property           | Attribute           | Description                                   | Type                  | Default     |
| ------------------ | ------------------- | --------------------------------------------- | --------------------- | ----------- |
| `collapsable`      | `collapsable`       | If the section is collapsable                 | `boolean`             | `false`     |
| `defaultCollapsed` | `default-collapsed` | If the section should be collapsed by default | `boolean`             | `false`     |
| `sectionTitle`     | `title`             | Optionally renders a title                    | `string \| undefined` | `undefined` |


## Shadow Parts

| Part          | Description                      |
| ------------- | -------------------------------- |
| `"header"`    | The header containing the title. |
| `"nav"`       | The nav element.                 |
| `"nav_inner"` | The element inside the nav.      |
| `"title"`     | The title h1 element.            |


## Dependencies

### Depends on

- es-icon

### Graph
```mermaid
graph TD;
  es-layout-section --> es-icon
  style es-layout-section fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


