# es-copy



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
export default () => (
    <es-copy>{'Click to copy this text to your clipboard.'}</es-copy>
);
```

```css
:host {
    display: flex;
    align-items: center;
    justify-content: center;
}
```



## Methods

### `copy() => Promise<void>`

Manually triggers the copy of the inner text.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [es-icon](../es-icon)

### Graph
```mermaid
graph TD;
  es-copy --> es-icon
  style es-copy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


