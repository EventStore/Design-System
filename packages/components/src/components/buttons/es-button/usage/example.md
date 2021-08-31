```tsx
import { randomIcon } from 'helpers';

export default () =>
    ['filled', 'outline', 'minimal', 'link'].map((variant) =>
        ['primary', 'secondary', 'white', 'text'].map((color) => (
            <es-button variant={variant} color={color} onClick={console.log}>
                <es-icon icon={randomIcon()} slot={'before'} />
                {`${variant} ${color}`}
            </es-button>
        )),
    );
```

```css
:host {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    align-items: center;
    justify-items: center;
}
```
