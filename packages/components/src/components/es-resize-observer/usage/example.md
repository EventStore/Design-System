```tsx
import { createStore } from '@eventstore/stores';

const { state } = createStore<{ height: number; width: number }>({
    height: 0,
    width: 0,
});

export default () => (
    <es-resize-observer
        onSizeChanged={(e) => {
            const { height, width } = e.detail;
            state.height = height;
            state.width = width;
        }}
    >
        <span>{`${state.height} x ${state.width}`}</span>
    </es-resize-observer>
);
```

```css
es-resize-observer {
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
