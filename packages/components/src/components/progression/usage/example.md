```tsx
import { createStore } from '@kurrent-ui/stores';

const { state } = createStore<{ location: string }>({
    location: '1-1',
});

export default () => (
    <c2-progression
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
