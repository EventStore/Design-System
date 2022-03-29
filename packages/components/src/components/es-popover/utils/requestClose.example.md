```tsx
import { requestClose } from '@eventstore/components';
import { createStore } from '@eventstore/stores';

const { state } = createStore({
    open: false,
});

export default () => (
    <div class={'wrapper'}>
        <es-button
            onClick={() => {
                state.open = true;
            }}
        >
            {'open'}
        </es-button>
        <es-popover
            arrow
            offset={12}
            open={state.open}
            onRequestClose={() => {
                state.open = false;
            }}
        >
            <es-button onClick={(e) => requestClose(e.currentTarget)}>
                {'Close'}
            </es-button>
        </es-popover>
    </div>
);
```

```css
:host {
    display: flex;
    align-items: center;
    justify-content: center;
}

.inner {
    padding: 10px;
    border-radius: 12px;
}
```
