# c2-resize-observer

<!-- Auto Generated Below -->


## Overview

Wraps a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to allow tracking `DOMRect` dimensions

## Usage

### Example

```tsx
import { createStore } from '@kurrent-ui/stores';

const { state } = createStore<{ height: number; width: number }>({
    height: 0,
    width: 0,
});

export default () => (
    <c2-resize-observer
        onSizeChanged={(e) => {
            const { height, width } = e.detail;
            state.height = height;
            state.width = width;
        }}
    >
        <span>{`${state.height} x ${state.width}`}</span>
    </c2-resize-observer>
);
```

```css
c2-resize-observer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 2px solid brown;
    font-size: 48px;
    color: brown;
}
```



## Events

| Event         | Description                                     | Type                           |
| ------------- | ----------------------------------------------- | ------------------------------ |
| `sizeChanged` | Triggered when the size of the element changes. | `CustomEvent<DOMRectReadOnly>` |


----------------------------------------------


