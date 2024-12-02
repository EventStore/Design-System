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
            <c2-button-link
                external
                variant={variant}
                url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            >
                {`${variant} variant`}
                <c2-icon icon={randomIcon()} slot={'after'} />
            </c2-button-link>
            <c2-button-link
                external
                variant={variant}
                url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            >
                <c2-icon icon={randomIcon()} size={22} />
            </c2-button-link>
            <c2-button-link
                disabled
                external
                variant={variant}
                url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            >
                {`${variant} (disabled)`}
                <c2-icon icon={randomIcon()} slot={'after'} />
            </c2-button-link>
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
