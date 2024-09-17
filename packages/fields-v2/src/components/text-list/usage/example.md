```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    names: string[];
}

const form = createValidatedForm<Example>({
    names: {
        initialValue: ['John', ''],
    },
});

export default () => (
    <es-input-list
        label={'Names'}
        placeholder={'Add a name to your list'}
        {...form.connect('names')}
    />
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
