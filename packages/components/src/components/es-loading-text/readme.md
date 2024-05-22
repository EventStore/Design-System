# es-loading-text



<!-- Auto Generated Below -->


## Overview

Displays a grey block to placehold loading text.

## Usage

### Example

```tsx
export default () => (
    <>
        <es-loading-text expectedLength={12} />
        <es-loading-text expectedLength={12} variance={14} />
        <es-loading-text expectedLength={12} variance={14} />
        <es-loading-text expectedLength={12} variance={14} />
    </>
);
```



## Properties

| Property                      | Attribute         | Description                                             | Type                  | Default     |
| ----------------------------- | ----------------- | ------------------------------------------------------- | --------------------- | ----------- |
| `expectedLength` _(required)_ | `expected-length` | The expected loaded text length.                        | `number`              | `undefined` |
| `variance`                    | `variance`        | Adds a random number of chars (up to the passed amount) | `number \| undefined` | `undefined` |


## Dependencies

### Used by

 - [es-table](../tables/es-table)

### Graph
```mermaid
graph TD;
  es-table --> es-loading-text
  style es-loading-text fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


