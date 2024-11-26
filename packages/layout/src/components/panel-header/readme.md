# l2-panel-header

<!-- Auto Generated Below -->


## Overview

A header for `l2-panel`.

## Usage

### Example

```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-panel>
        <l2-panel-header>
            {'hello there'}
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon icon={randomIcon()} size={20} />
            </es-button>
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon icon={randomIcon()} size={20} />
            </es-button>
            <es-button variant={'minimal'} slot={'actions'}>
                <es-icon icon={randomIcon()} size={20} />
            </es-button>
        </l2-panel-header>
        <p>{'I am a panel'}</p>
    </l2-panel>
);
```



## Slots

| Slot        | Description                            |
| ----------- | -------------------------------------- |
| `"actions"` | Place clickable actions for the panel. |


## Shadow Parts

| Part        | Description            |
| ----------- | ---------------------- |
| `"actions"` | The actions area.      |
| `"title"`   | The title of the panel |


----------------------------------------------


