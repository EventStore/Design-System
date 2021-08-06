```tsx
import { randomIcon } from 'helpers';

export default () =>
    ['filled', 'outline', 'minimal', 'link'].map((variant) =>
        ['primary', 'secondary', 'white', 'text'].map((color) => (
            <es-button-link
                variant={variant}
                color={color}
                forceRefresh
                target={'_blank'}
                url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            >
                {`${variant} ${color}`}
                <es-icon icon={randomIcon()} slot={'after'} />
            </es-button-link>
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
