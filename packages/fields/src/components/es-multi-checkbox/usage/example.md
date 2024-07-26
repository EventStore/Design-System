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
            { name: 'Option 1', value: 'option1' },
            { name: 'Option 2', value: 'option2' },
            { name: 'Option 4', value: 'option4' },
            { name: 'Option 5', value: 'option5' },
            { name: 'Option 6', value: 'option6' },
            { name: 'Option 7', value: 'option7' },
            { name: 'Option 8', value: 'option8' },
            { name: 'Option 9', value: 'option9' },
            { name: 'Option 10', value: 'option10' },
            { name: 'Option 11', value: 'option11' },
            { name: 'Option 12', value: 'option12' },
            { name: 'Option 14', value: 'option14' },
            { name: 'Option 15', value: 'option15' },
            { name: 'Option 16', value: 'option16' },
            { name: 'Option 17', value: 'option17' },
            { name: 'Option 18', value: 'option18' },
            { name: 'Option 19', value: 'option19' },
        ]}
    />
);
```
