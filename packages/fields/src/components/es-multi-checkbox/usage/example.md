```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    options: Record<string, boolean>;
}

const form = createValidatedForm<Example>({
    options: {
        option1: false,
        option2: false,
        option3: false,
    },
});

export default () => (
    <es-multi-checkbox 
        {...form.connect('options')}
        options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 4', value: 'option4' },
            { label: 'Option 5', value: 'option5' },
            { label: 'Option 6', value: 'option6' },
            { label: 'Option 7', value: 'option7' },
            { label: 'Option 8', value: 'option8' },
            { label: 'Option 9', value: 'option9' },
            { label: 'Option 10', value: 'option10' },
            { label: 'Option 11', value: 'option11' },
            { label: 'Option 12', value: 'option12' },
            { label: 'Option 14', value: 'option14' },
            { label: 'Option 15', value: 'option15' },
            { label: 'Option 16', value: 'option16' },
            { label: 'Option 17', value: 'option17' },
            { label: 'Option 18', value: 'option18' },
            { label: 'Option 19', value: 'option19' },
        ]}
    />
);
```
