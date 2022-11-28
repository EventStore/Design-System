```tsx
import { randomIcon } from 'helpers';

export default () =>
    ['default', 'filled', 'outline', 'delete', 'cancel', 'minimal', 'link'].map(
        (variant) => (
            <>
                <es-button-link
                    external
                    variant={variant}
                    url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                >
                    {`${variant} variant`}
                    <es-icon icon={randomIcon()} slot={'after'} />
                </es-button-link>
                <es-button-link
                    external
                    variant={variant}
                    url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                >
                    <es-icon icon={randomIcon()} size={22} />
                </es-button-link>
                <es-button-link
                    disabled
                    external
                    variant={variant}
                    url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                >
                    {`${variant} (disabled)`}
                    <es-icon icon={randomIcon()} slot={'after'} />
                </es-button-link>
            </>
        ),
    );
```

```css
:host {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 20px;
    align-items: center;
    justify-items: center;
}
```
