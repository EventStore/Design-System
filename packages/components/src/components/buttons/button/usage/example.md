```tsx
import type { ButtonVariant } from '@kurrent-ui/components';
import { randomIcon } from 'utils/helpers';

const variants: ButtonVariant[] = [
    'default',
    'filled',
    'outline',
    'delete',
    'cancel',
    'minimal',
    'link',
];

export default () =>
    variants.map((variant) => (
        <>
            <c2-button variant={variant} onClick={console.log}>
                <c2-icon icon={randomIcon()} slot={'before'} />
                {`${variant} variant`}
            </c2-button>
            <c2-button variant={variant} onClick={console.log}>
                <c2-icon icon={randomIcon()} size={22} />
            </c2-button>
            <c2-button variant={variant} onClick={console.log} disabled>
                <c2-icon icon={randomIcon()} slot={'before'} />
                {`${variant} (disabled)`}
            </c2-button>
        </>
    ));
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
