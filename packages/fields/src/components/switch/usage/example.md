```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    good: boolean;
}

const form = createValidatedForm<Example>({
    good: false,
});

export default () => (
    <>
        <f2-switch {...form.connect('good')} />
    </>
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
