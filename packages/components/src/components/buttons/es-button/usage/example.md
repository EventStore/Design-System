```tsx
import { randomIcon } from 'helpers';

export default () =>
    ['default', 'filled', 'outline', 'delete', 'cancel', 'minimal', 'link'].map(
        (variant) => (
            <>
                <es-button variant={variant} onClick={console.log}>
                    <es-icon icon={randomIcon()} slot={'before'} />
                    {`${variant} variant`}
                </es-button>
                <es-button variant={variant} onClick={console.log}>
                    <es-icon icon={randomIcon()} size={22} />
                </es-button>
                <es-button variant={variant} onClick={console.log} disabled>
                    <es-icon icon={randomIcon()} slot={'before'} />
                    {`${variant} (disabled)`}
                </es-button>
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
