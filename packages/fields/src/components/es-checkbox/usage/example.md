```tsx
import { createValidatedForm } from '@eventstore/forms';

interface Example {
    enabled: boolean;
}

const form = createValidatedForm<Example>({
    enabled: false,
});

export default () => (
    <es-checkbox {...form.connect('enabled')}>
        {'I agree to the terms and conditions?'}
    </es-checkbox>
);
```

```css
:host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
```
