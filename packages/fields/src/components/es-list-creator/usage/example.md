```tsx
import { createValidatedForm } from '@eventstore/forms';

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
    <es-list-creator
        label={'Names'}
        placeholder={'Add a name to your list'}
        options={options}
        {...workingData.connect('names')}
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
