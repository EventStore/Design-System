```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    names: string[];
}

const workingData = createValidatedForm<Example>({
    names: {
        initialValue: ['john'],
    },
});

const options = [
    { name: 'John', value: 'john' },
    { name: 'Nathanial', value: 'nathanial' },
];

export default () => (
    <f2-select-list-field
        label={'Names'}
        documentation={'Add some names to your list'}
        placeholder={'Type here to filter the names'}
        options={options}
        {...workingData.connect('names')}
    />
);
```
