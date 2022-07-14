# es-progression



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { FunctionalComponent } from '@stencil/core';
import { createStore } from '@eventstore-ui/stores';

const { state } = createStore<{ location: string }>({
    location: '1-1',
});

export default () => (
    <es-progression
        checkpoints={[
            {
                id: '1-1',
                title: 'Overworld',
            },
            {
                id: '1-2',
                title: 'Underground',
            },
            {
                id: '1-3',
                title: 'Athletic',
            },
            {
                id: '1-4',
                title: 'Castle',
            },
        ]}
        location={state.location}
        onProgressionRequest={(e) => {
            state.location = e.detail;
        }}
    />
);
```

```css
:host {
    display: flex;
    align-items: center;
    justify-content: center;
}
```



## Properties

| Property                   | Attribute  | Description                       | Type           | Default     |
| -------------------------- | ---------- | --------------------------------- | -------------- | ----------- |
| `checkpoints` _(required)_ | --         | A list of checkpoints to display. | `Checkpoint[]` | `undefined` |
| `location` _(required)_    | `location` | The current active location.      | `string`       | `undefined` |


## Events

| Event                | Description                           | Type                  |
| -------------------- | ------------------------------------- | --------------------- |
| `progressionRequest` | Emitted when a checkpoint is clicked. | `CustomEvent<string>` |


----------------------------------------------


