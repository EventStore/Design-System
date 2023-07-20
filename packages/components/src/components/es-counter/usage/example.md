```tsx
import { createStore } from '@eventstore-ui/stores';
import { random } from 'utils/helpers';

const { state } = createStore(Array.from({ length: 144 }, () => random(800)));

setInterval(() => {
    const key = random(144);
    state[key] += 1;
}, 10);

const variant = ['filled', 'outline', 'minimal'] as const;
const variants = Array.from({ length: 144 }, () => variant[random(2)]);

export default () =>
    variants.map((v, i) => <es-counter key={i} count={state[i]} variant={v} />);
```

```css
:host {
    display: grid;
    grid-template-columns: repeat(12, minmax(12px, 1fr));
    gap: 10px;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
}
```
