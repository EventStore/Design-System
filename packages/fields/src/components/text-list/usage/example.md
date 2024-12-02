```tsx
import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    names: string[];
}

const form = createValidatedForm<Example>({
    names: {
        initialValue: ['John', ''],
    },
});

export default () => (
    <f2-form>
        <f2-text-list-field
            label={'Names'}
            documentation={'Free text list creation'}
            placeholder={'Add a name to your list'}
            {...form.connect('names')}
        />
    </f2-form>
);
```
