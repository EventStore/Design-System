```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    name: string | null;
}

const form = createValidatedForm<Example>({
    name: null,
});

const options = [
    { name: 'Jim', value: 'jim' },
    { name: 'John', value: 'john' },
    { name: 'Nathanial', value: 'nathanial' },
];

export default () => (
    <f2-form>
        <f2-select-input
            placeholder={'Choose a name from the list'}
            options={options}
            {...form.connect('name')}
        />
        <f2-select-input
            disabled
            placeholder={'Choose a name from the list'}
            options={options}
            {...form.connect('name')}
        />
    </f2-form>
);
```
