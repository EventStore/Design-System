# docs-sidebar

<!-- Auto Generated Below -->


## Overview

A sidebar. Automatically sets `--layout-sidebar-width` based on it's own width.

## Usage

### Example

```tsx
import { Link } from '@eventstore-ui/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-layout-section sectionTitle={'My Section'}>
            <es-layout-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </es-layout-link>
            <es-layout-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'My Other Section'}>
            <es-layout-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </es-layout-link>
            <es-layout-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </es-layout-link>
        </es-layout-section>
    </es-sidebar>
);
```



## Slots

| Slot      | Description      |
| --------- | ---------------- |
| `"after"` | After the aside. |


## Shadow Parts

| Part      | Description         |
| --------- | ------------------- |
| `"aside"` | The internal aside. |


----------------------------------------------


