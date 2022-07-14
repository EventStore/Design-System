```tsx
import { createStore } from '@eventstore-ui/stores';
import { random } from 'helpers';

const { state } = createStore(Array.from({ length: 144 }, () => random(800)));

setInterval(() => {
    const key = random(144);
    state[key] += 1;
}, 10);

const variant = ['filled', 'outline', 'minimal'];
const variants = Array.from({ length: 144 }, (_, i) => variant[random(3)]);

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
    --background-color: white;
}
```
