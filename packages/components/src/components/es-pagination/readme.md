# es-pagination



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { PageChangeEventType } from '@eventstore/components';
import { createStore } from '@eventstore/stores';

interface PageStore {
    current: number;
    pageCount: number;
}

const { state } = createStore<PageStore>({
    current: 1,
    pageCount: 20,
});

const handlePageChange = (e: CustomEvent<PageChangeEventType>) => {
    switch (e.detail) {
        case 'first':
            state.current = 1;
            break;
        case 'previous':
            state.current = state.current - 1;
            break;
        case 'next':
            state.current = state.current + 1;
            break;
        case 'last':
            state.current = state.pageCount;
            break;
    }
};

export default () => (
    <es-pagination
        pageCount={state.pageCount}
        onUpdate={handlePageChange}
        current={state.current}
    />
);
```



## Properties

| Property               | Attribute    | Description      | Type                  | Default     |
| ---------------------- | ------------ | ---------------- | --------------------- | ----------- |
| `current` _(required)_ | `current`    | Current Page.    | `number`              | `undefined` |
| `pageCount`            | `page-count` | Number of pages. | `number \| undefined` | `undefined` |


## Events

| Event    | Description                                   | Type                                                                                                                             |
| -------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `update` | Triggered when a pagination button is clicked | `CustomEvent<PageChangeEventType.First \| PageChangeEventType.Last \| PageChangeEventType.Next \| PageChangeEventType.Previous>` |


## Dependencies

### Depends on

- [es-button](../buttons/es-button)
- [es-icon](../es-icon)

### Graph
```mermaid
graph TD;
  es-pagination --> es-button
  es-pagination --> es-icon
  style es-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


