```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    text: string;
}

const form = createValidatedForm<Example>({
    text: '',
});

export default () => (
    <f2-form>
        <f2-textarea-input
            placeholder={'Write some text'}
            {...form.connect('text')}
        />
    </f2-form>
);
```
