```tsx
import { requestClose } from '@kurrent-ui/components';
import { createStore } from '@kurrent-ui/stores';

const { state } = createStore({
    open: false,
});

export default () => (
    <div class={'wrapper'}>
        <c2-button
            onClick={() => {
                state.open = true;
            }}
        >
            {'open'}
        </c2-button>
        <c2-popover
            arrow
            offset={12}
            open={state.open}
            onRequestClose={() => {
                state.open = false;
            }}
        >
            <c2-button onClick={(e) => requestClose(e.currentTarget)}>
                {'Close'}
            </c2-button>
        </c2-popover>
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
