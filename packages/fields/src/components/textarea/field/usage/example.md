```tsx
import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    text: string;
}

const form = createValidatedForm<Example>({
    text: '',
});

export default () => (
    <f2-form>
        <f2-textarea-field
            label={'Text'}
            documentation={'Write some text in here.'}
            placeholder={'Write some text'}
            {...form.connect('text')}
        />
    </f2-form>
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
