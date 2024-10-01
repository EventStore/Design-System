```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    enabled: boolean;
}

const form = createValidatedForm<Example>({
    enabled: false,
});

export default () => (
    <f2-checkbox {...form.connect('enabled')}>
        {'I agree to the terms and conditions?'}
    </f2-checkbox>
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
