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
            <c2-button variant={'minimal'} slot={'actions'}>
                <c2-icon icon={randomIcon()} size={20} />
            </c2-button>
            <c2-button variant={'minimal'} slot={'actions'}>
                <c2-icon icon={randomIcon()} size={20} />
            </c2-button>
            <c2-button variant={'minimal'} slot={'actions'}>
                <c2-icon icon={randomIcon()} size={20} />
            </c2-button>
        </l2-panel-header>
        <p>{'I am a panel'}</p>
    </l2-panel>
);
```



## Properties

| Property  | Attribute  | Description            | Type      | Default |
| --------- | ---------- | ---------------------- | --------- | ------- |
| `hasTabs` | `has-tabs` | If the panel has tabs. | `boolean` | `false` |


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


